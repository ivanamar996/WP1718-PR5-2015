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
                if(d.DrivedBy == Data.driverServices.RetriveDriverById(Data.loggedUser.Id))
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
        }

        [HttpPost]
        [Route("api/Driver/UnsuccessfulDrive")]
        public void UnsuccessfulDrive([FromBody]JObject data)
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            Drive driveFinis = new Drive();

            foreach (Drive d in drives)
            {
                if (d.DrivedBy == Data.driverServices.RetriveDriverById(Data.loggedUser.Id))
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
        }
    }
}
