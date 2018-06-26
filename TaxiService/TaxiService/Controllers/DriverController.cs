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
        public HttpResponseMessage EditLocation([FromBody]JObject location)
        {
            if(Data.driverServices.CheckIfDriverExists(Data.loggedUser.Username))
            {
                Driver driverEdit = Data.driverServices.RetriveDriverByUserName(Data.loggedUser.Username);
                driverEdit.Location.Address = location.GetValue("Address").ToString();
                driverEdit.Location.X = Double.Parse(location.GetValue("X").ToString());
                driverEdit.Location.Y = Double.Parse(location.GetValue("Y").ToString());
                Data.driverServices.EditDriverProfile(driverEdit);
                return Request.CreateResponse(HttpStatusCode.Created, driverEdit);
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/Driver/SuccessfulDrive")]
        public HttpResponseMessage SuccessfulDrive([FromBody]JObject data)
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

            if (driveFinis.State == Enums.Status.Successful || driveFinis.State==Enums.Status.Unsuccessful)
                return Request.CreateResponse(HttpStatusCode.InternalServerError);

            driveFinis.State = Enums.Status.Successful;
            driveFinis.Destination = new Location
            {
                X = Double.Parse(data.GetValue("X").ToString()),
                Y = Double.Parse(data.GetValue("Y").ToString()),
                Address = data.GetValue("Address").ToString()
            };

            if (driveFinis.OrderedBy == null)
                driveFinis.OrderedBy = new Customer();

            driveFinis.Price = Int32.Parse(data.GetValue("Price").ToString());
            Data.driveServices.EditDriveProfile(driveFinis);
            Driver d1 = driveFinis.DrivedBy;
            d1.Free = true;
            Data.driverServices.EditDriverProfile(d1);

            return Request.CreateResponse(HttpStatusCode.Created, driveFinis);
        }

        [HttpPost]
        [Route("api/Driver/UnsuccessfulDrive")]
        public HttpResponseMessage UnsuccessfulDrive([FromBody]JObject data)
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

            if (driveFinis.OrderedBy == null)
                driveFinis.OrderedBy = new Customer();

            if (driveFinis.State == Enums.Status.Unsuccessful || driveFinis.State==Enums.Status.Successful)
                return Request.CreateResponse(HttpStatusCode.InternalServerError);

            driveFinis.State = Enums.Status.Unsuccessful;

            Comment com = new Comment();
            IEnumerable<Comment> comments = Data.commentServices.RetriveAllComments();

            if (comments == null)
                com.Id = 0;
            else
                com.Id = comments.Count() + 1;

            com.Description = data.GetValue("Description").ToString();
            com.CreatedBy = Data.driverServices.RetriveDriverById(driveFinis.DrivedBy.Id);
            com.CommentedOn = driveFinis;

            driveFinis.Comments = com;

            Data.commentServices.NewComment(com);
            Data.driveServices.EditDriveProfile(driveFinis);
            Driver d1 = driveFinis.DrivedBy;
            d1.Free = true;
            Data.driverServices.EditDriverProfile(d1);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("api/Driver/GetDrives")]
        public List<Drive> GetDrives()
        {
            List<Drive> driverDrives = new List<Drive>();

            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach (Drive d in allDrives)
            {
                if (d.DrivedBy.Id == Data.loggedUser.Id)
                {
                    driverDrives.Add(d);
                }
            }
            foreach(Drive d1 in driverDrives)
            {
                if (d1.OrderedBy == null)
                    d1.OrderedBy = new Customer();
                if (d1.DrivedBy == null)
                    d1.DrivedBy = new Driver();
                if (d1.ApprovedBy == null)
                    d1.ApprovedBy = new Dispatcher();
                if (d1.Comments == null)
                    d1.Comments = new Comment();
            }
            return driverDrives;
        }

        [Route("api/Driver/GetDrivesCreated")]
        public List<Drive> GetDrivesCreated()
        {
            List<Drive> driverDrivesCreated = new List<Drive>();

            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach (Drive d in allDrives)
            {
                if (d.State == Enums.Status.Created)
                {
                    driverDrivesCreated.Add(d);
                }
            }

            foreach (Drive d1 in driverDrivesCreated)
            {
                if (d1.OrderedBy == null)
                    d1.OrderedBy = new Customer();
                if (d1.DrivedBy == null)
                    d1.DrivedBy = new Driver();
                if (d1.ApprovedBy == null)
                    d1.ApprovedBy = new Dispatcher();
                if (d1.Comments == null)
                    d1.Comments = new Comment();
            }
            return driverDrivesCreated;
        }

        [HttpGet]
        [Route("api/Driver/AcceptDrive")]
        public HttpResponseMessage AcceptDrive()
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach(Drive d in allDrives)
            {
                if (d.State == Enums.Status.Created)
                {
                    d.DrivedBy = Data.driverServices.RetriveDriverById(Data.loggedUser.Id);
                    d.State = Enums.Status.Accepted;
                    Data.driveServices.EditDriveProfile(d);
                    Driver driver = d.DrivedBy;
                    driver.Free = false;
                    Data.driverServices.EditDriverProfile(driver);
                    return Request.CreateResponse(HttpStatusCode.Created, d);
                }
            }

            
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }
    }
}
