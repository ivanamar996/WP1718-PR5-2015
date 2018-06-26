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
        public List<Drive> filterDrives = new List<Drive>();

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
                dispatcherEdit.Phone = user.Phone;
                dispatcherEdit.Email = user.Email;
                Data.dispatcherServices.EditDispatcherProfile(dispatcherEdit);
                return Request.CreateResponse(HttpStatusCode.Created, dispatcherEdit);
            }
            else if (Data.customerService.CheckIfCustomerExists(Data.loggedUser.Username))
            {
                Customer customerEdit = Data.customerService.RetriveCustomerByUserName(Data.loggedUser.Username);
                customerEdit.Username = user.Username;
                customerEdit.Password = user.Password;
                customerEdit.Name = user.Name;
                customerEdit.Jmbg = user.Jmbg;
                customerEdit.Phone = user.Phone;
                customerEdit.Surname = user.Surname;
                customerEdit.Email = user.Email;
                Data.customerService.EditCustomerProfile(customerEdit);
                return Request.CreateResponse(HttpStatusCode.Created, customerEdit);
            }
            else if (Data.driverServices.CheckIfDriverExists(Data.loggedUser.Username))
            {
                Driver driverEdit = Data.driverServices.RetriveDriverByUserName(Data.loggedUser.Username);
                driverEdit.Username = user.Username;
                driverEdit.Password = user.Password;
                driverEdit.Name = user.Name;
                driverEdit.Jmbg = user.Jmbg;
                driverEdit.Surname = user.Surname;
                driverEdit.Phone = user.Phone;
                driverEdit.Email = user.Email;
                Data.driverServices.EditDriverProfile(driverEdit);
                return Request.CreateResponse(HttpStatusCode.Created, driverEdit);
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/User/FilterDrives")]
        public HttpResponseMessage FilterDrives([FromBody]JObject data)
        {        
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach (Drive d in allDrives)
            {
                if (d.State.ToString() == data.GetValue("Data").ToString())
                {
                    filterDrives.Add(d);
                }
            }
            foreach (Drive d1 in filterDrives)
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
            return Request.CreateResponse(HttpStatusCode.OK, filterDrives);
        }

        [HttpGet]
        [Route("api/User/SortDriveByDate")]
        public List<Drive> SortDriveByDate()
        {
            List<Drive> sortedDrives = new List<Drive>();

            List<Drive> allDrives = Data.driveServices.RetriveAllDrives() as List<Drive>;

            sortedDrives = allDrives.OrderByDescending(d => d.OrderDate).ToList();

            foreach (Drive d1 in sortedDrives)
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

            return sortedDrives;
        }

        [HttpGet]
        [Route("api/User/SortDriveByGrade")]
        public List<Drive> SortDriveByGrade()
        {
            List<Drive> sortedDrives = new List<Drive>();

            List<Drive> allDrives = Data.driveServices.RetriveAllDrives() as List<Drive>;
            foreach (Drive d1 in allDrives)
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

            sortedDrives = allDrives.OrderByDescending(d => d.Comments.Grade).ToList();
            return sortedDrives;
        }

        [HttpPost]
        [Route("api/User/SearchDrivesByOrderDate")]
        public HttpResponseMessage SearchDrivesByOrderDate([FromBody]JObject data)
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            List<Drive> searchList = new List<Drive>();

            DateTime dateFrom = (DateTime)data["From"]; ;
            DateTime dateTo  = (DateTime)data["To"]; ;

            foreach (Drive d in allDrives)
            {
                if(d.OrderDate > dateFrom && d.OrderDate < dateTo)
                {
                    searchList.Add(d);
                }
            }

            foreach (Drive d1 in searchList)
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

            return Request.CreateResponse(HttpStatusCode.OK, searchList);
        }

        [HttpPost]
        [Route("api/User/SearchDrivesByGrade")]
        public HttpResponseMessage SearchDrivesByGrade([FromBody]JObject data)
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            List<Drive> searchList = new List<Drive>();

            foreach (Drive d1 in allDrives)
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

            int gradeFrom = Int32.Parse(data.GetValue("From").ToString());
            int gradeTo = Int32.Parse(data.GetValue("To").ToString());

            foreach (Drive d in allDrives)
            {
                if (d.Comments.Grade >= gradeFrom && d.Comments.Grade <= gradeTo)
                {
                    searchList.Add(d);
                }
            }



            return Request.CreateResponse(HttpStatusCode.OK, searchList);
        }

        [HttpPost]
        [Route("api/User/SearchDrivesByPrice")]
        public HttpResponseMessage SearchDrivesByPrice([FromBody]JObject data)
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            List<Drive> searchList = new List<Drive>();

            int gradeFrom = Int32.Parse(data.GetValue("From").ToString());
            int gradeTo = Int32.Parse(data.GetValue("To").ToString());

            foreach (Drive d1 in allDrives)
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

            foreach (Drive d in allDrives)
            {
                if (d.Price >= gradeFrom && d.Price <= gradeTo)
                {
                    searchList.Add(d);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, searchList);
        }

        [HttpPost]
        [Route("api/User/SearchDrivesByCustomer")]
        public HttpResponseMessage SearchDrivesByCustomer([FromBody]JObject data)
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            List<Drive> searchList = new List<Drive>();

            string name = data.GetValue("Name").ToString();
            string surname = data.GetValue("Surname").ToString();

            foreach (Drive d in allDrives)
            {
                if (d.OrderedBy != null)
                {
                    if (!name.Equals("") && !surname.Equals(""))
                    {
                        if (d.OrderedBy.Name.Equals(name) && d.OrderedBy.Surname.Equals(surname))
                            searchList.Add(d);
                    }
                    else if (name.Equals("") && !surname.Equals(""))
                    {
                        if (d.OrderedBy.Surname.Equals(surname))
                            searchList.Add(d);
                    }
                    else if (!name.Equals("") && surname.Equals(""))
                    {
                        if (d.OrderedBy.Name.Equals(name))
                            searchList.Add(d);
                    }
                }
            }
            foreach (Drive d1 in searchList)
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
            return Request.CreateResponse(HttpStatusCode.OK, searchList);
        }

        [HttpPost]
        [Route("api/User/SearchDrivesByDriver")]
        public HttpResponseMessage SearchDrivesByDriver([FromBody]JObject data)
        {
            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();
            List<Drive> searchList = new List<Drive>();

            string name = data.GetValue("Name").ToString();
            string surname = data.GetValue("Surname").ToString();

            foreach (Drive d in allDrives)
            {
                if (d.DrivedBy.Name != null || d.DrivedBy.Surname != null)
                {
                    if (!name.Equals("") && !surname.Equals(""))
                    {
                        if (d.DrivedBy.Name.Equals(name) && d.DrivedBy.Surname.Equals(surname))
                            searchList.Add(d);
                    }
                    else if (name.Equals("") && !surname.Equals(""))
                    {
                        if (d.DrivedBy.Surname.Equals(surname))
                            searchList.Add(d);
                    }
                    else if (!name.Equals("") && surname.Equals(""))
                    {
                        if (d.DrivedBy.Name.Equals(name))
                            searchList.Add(d);
                    }
                }
            }

            foreach (Drive d1 in searchList)
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
            return Request.CreateResponse(HttpStatusCode.OK, searchList);
        }
    }
}
