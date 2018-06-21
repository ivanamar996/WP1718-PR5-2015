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
    public class UserController : ApiController
    {
        [HttpPost]
        [Route("api/User/Edit")]
        public HttpResponseMessage Edit([FromBody]User user)
        {
            if (Data.dispatcherServices.CheckIfDispatcherExists(Data.loggedUser.Username))
            {
                Dispatcher dispatcherEdit = Data.dispatcherServices.RetriveDispatcherByUserName(Data.loggedUser.Username);
                dispatcherEdit.Username = user.Username;
                dispatcherEdit.Password = user.Password;
                dispatcherEdit.Name = user.Name;
                dispatcherEdit.Jmbg = user.Jmbg;
                dispatcherEdit.Surname = user.Surname;
                Data.dispatcherServices.EditDispatcherProfile(dispatcherEdit);
                return Request.CreateResponse(HttpStatusCode.Created,dispatcherEdit);
            }
            else if (Data.customerService.CheckIfCustomerExists(Data.loggedUser.Username))
            {
                Customer customerEdit = Data.customerService.RetriveCustomerByUserName(Data.loggedUser.Username);
                customerEdit.Username = user.Username;
                customerEdit.Password = user.Password;
                customerEdit.Name = user.Name;
                customerEdit.Jmbg = user.Jmbg;
                customerEdit.Surname = user.Surname;
                Data.customerService.EditCustomerProfile(customerEdit);
                return Request.CreateResponse(HttpStatusCode.Created,customerEdit);
            }
            else if (Data.driverServices.CheckIfDriverExists(Data.loggedUser.Username))
            {
                Driver driverEdit = Data.driverServices.RetriveDriverByUserName(Data.loggedUser.Username);
                driverEdit.Username = user.Username;
                driverEdit.Password = user.Password;
                driverEdit.Name = user.Name;
                driverEdit.Jmbg = user.Jmbg;
                driverEdit.Surname = user.Surname;
                Data.driverServices.EditDriverProfile(driverEdit);
                return Request.CreateResponse(HttpStatusCode.Created,driverEdit);
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/User/FilterDrives")]
        public void FilterDrives([FromBody]JObject data)
        {
            //List<Drive> filterDrives = new List<Drive>();
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            Data.filterDrives.Clear();
            foreach (Drive d in allDrives)
            {
                if (d.State.ToString() == data.GetValue("status").ToString())
                {
                    Data.filterDrives.Add(d);
                }
            }
        }

        [HttpGet]
        [Route("api/User/GetFilterDrives")]
        public List<Drive> GetFilterDrives()
        {
            return Data.filterDrives;
        }

        [HttpGet]
        [Route("api/User/SortDriveByDate")]
        public List<Drive> SortDriveByDate()
        {
            List<Drive> sortedDrives = new List<Drive>();

            List<Drive> allDrives = Data.driveServices.RetriveAllDrives() as List<Drive>;

            sortedDrives = allDrives.OrderBy(d => d.OrderDate).ToList();

            return sortedDrives;
        }

        [HttpGet]
        [Route("api/User/SortDriveByGrade")]
        public List<Drive> SortDriveByGrade()
        {
            List<Drive> sortedDrives = new List<Drive>();

            List<Drive> allDrives = Data.driveServices.RetriveAllDrives() as List<Drive>;

            sortedDrives = allDrives.OrderBy(d => d.Comments.Grade).ToList();

            return sortedDrives;
        }
    }
}
