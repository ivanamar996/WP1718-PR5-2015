using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiService.Models;

namespace TaxiService.Controllers
{
    public class DriverController : ApiController
    {
        [HttpPost]
        [Route("api/Driver/EditLocation")]
        public void Edit([FromBody]Location location)
        {
            Driver driverEdit = Data.driverServices.RetriveDriverByUserName(Data.loggedUser.Username);
            driverEdit.Location = location;
            Data.driverServices.EditDriverProfile(driverEdit);
        }

        [HttpPost]
        [Route("api/Driver/SuccessfulDrive")]
        public void SuccessfulDrive([FromBody]JObject data)
        {            
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            Drive driveFinis = new Drive();

            foreach(Drive d in drives)
            {
                if(d.DrivedBy.Id == Data.loggedUser.Id)
                {
                    driveFinis = d;
                }
            }

            driveFinis.State = Enums.Status.Successful;
            driveFinis.Destination = new Location
            {
                X = Double.Parse(data.GetValue("x").ToString()),
                Y = Double.Parse(data.GetValue("y").ToString()),
                Address = data.GetValue("address").ToString()
            };
            driveFinis.Price = Int32.Parse(data.GetValue("price").ToString());
            Data.driveServices.EditDriveProfile(driveFinis);
            Data.freeDrivers.Add(driveFinis.DrivedBy);
            Data.busyDrivers.Remove(driveFinis.DrivedBy);
        }

        [HttpPost]
        [Route("api/Driver/UnsuccessfulDrive")]
        public void UnsuccessfulDrive([FromBody]JObject data)
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            Drive driveFinis = new Drive();

            foreach (Drive d in drives)
            {
                if (d.DrivedBy.Id == Data.loggedUser.Id)
                {
                    driveFinis = d;
                }
            }

            driveFinis.State = Enums.Status.Unsuccessful;

            Comment com = new Comment();
            IEnumerable<Comment> comments = Data.commentServices.RetriveAllComments();

            if (comments == null)
                com.Id = 0;
            else
                com.Id = comments.Count() + 1;

            com.Description = data.GetValue("description").ToString();
            com.CreatedBy = Data.driverServices.RetriveDriverById(driveFinis.DrivedBy.Id);
            com.CommentedOn = driveFinis;

            Data.commentServices.NewComment(com);
            Data.driveServices.EditDriveProfile(driveFinis);
            Data.freeDrivers.Add(driveFinis.DrivedBy);
            Data.busyDrivers.Remove(driveFinis.DrivedBy);
        }
    }
}
