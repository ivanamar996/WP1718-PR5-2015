using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiService.Models;
using static TaxiService.Models.Enums;

namespace TaxiService.Controllers
{
    public class CustomerController : ApiController
    {
        [HttpPost]
        [Route("api/Customer/CreateDrive")]
        public HttpResponseMessage CreateDrive([FromBody]JObject data)
        {
            Drive newDrive = new Drive();
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives(); 

            if (drives == null)
                newDrive.Id = 0;
            else
                newDrive.Id = drives.Count() + 1;

            newDrive.Address = new Location()
            {
                X = Double.Parse(data.GetValue("x").ToString()),
                Y = Double.Parse(data.GetValue("y").ToString()),
                Address = data.GetValue("address").ToString()
            };
         
            newDrive.Destination = new Location();
            newDrive.ApprovedBy = new Dispatcher();
            newDrive.Comments = new Comment();
            newDrive.DrivedBy = new Driver();
            newDrive.Price = 0;
            newDrive.CarType = (CarTypes)Enum.Parse(typeof(CarTypes), data.GetValue("type").ToString());
            newDrive.OrderDate = DateTime.Now;
            newDrive.OrderedBy = Data.customerService.RetriveCustomerByUserName(Data.loggedUser.Username);
            newDrive.State = Enums.Status.Created;
            Data.driveServices.NewDrive(newDrive);
            return Request.CreateResponse(HttpStatusCode.Created, newDrive);
        }

        [HttpPost]
        [Route("api/Customer/ChangeDrive")]
        public HttpResponseMessage ChangeDrive([FromBody]JObject data)
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            foreach(Drive d in drives)
            {
                if (d.OrderedBy.Id == Data.loggedUser.Id)
                {
                    if (d.State == Enums.Status.Created)
                    {
                        d.Address.X = Double.Parse(data.GetValue("X").ToString());
                        d.Address.Y = Double.Parse(data.GetValue("Y").ToString());
                        d.Address.Address = data.GetValue("Address").ToString();
                        d.CarType = (CarTypes)Enum.Parse(typeof(CarTypes), data.GetValue("Type").ToString());
                        Data.driveServices.EditDriveProfile(d);
                        return Request.CreateResponse(HttpStatusCode.Created, d);
                    }
                }
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/Customer/CancelDrive")]
        public HttpResponseMessage CancelDrive([FromBody]JObject data)
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            foreach (Drive d in drives)
            {
                if (d.OrderedBy.Id == Data.loggedUser.Id)
                {
                    if (d.State == Enums.Status.Created)
                    {
                        d.State = Enums.Status.Canceled;
                        Data.driveServices.EditDriveProfile(d);
                        Comment com = new Comment();
                        IEnumerable<Comment> comments = Data.commentServices.RetriveAllComments();

                        if (comments == null)
                            com.Id = 0;
                        else
                            com.Id = comments.Count() + 1;

                        com.Description = data.GetValue("Description").ToString();
                        com.CreatedBy = Data.customerService.RetriveCustomerById(Data.loggedUser.Id);
                        com.CommentedOn = d;
                        Data.commentServices.NewComment(com);
                        return Request.CreateResponse(HttpStatusCode.Created, com);
                    }
                }
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        public List<Drive> GetDrives()
        {
            List<Drive> customerDrives = new List<Drive>();

            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach(Drive d in allDrives)
            {
                if (d.OrderedBy.Id == Data.loggedUser.Id)
                {
                    customerDrives.Add(d);
                }
            }
            return customerDrives;
        }
    }
}
