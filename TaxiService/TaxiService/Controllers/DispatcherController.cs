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
    public class DispatcherController : ApiController
    {
        public static int cnt = 0;

        [HttpPost]
        [Route("api/Dispatcher/AddDriver")]
        public HttpResponseMessage AddDriver([FromBody]JObject data)
        {
            if (!Data.driverServices.CheckIfDriverExists(data.GetValue("Username").ToString()))
            {
                Driver driverNew = new Driver();
                IEnumerable<Driver> drivers = Data.driverServices.RetriveAllDrivers();

                if (drivers == null)
                    driverNew.Id = 0;
                else
                    driverNew.Id = drivers.Count() + 1;

                driverNew.Username = data.GetValue("Username").ToString();
                driverNew.Password = data.GetValue("Password").ToString();
                driverNew.Name = data.GetValue("Name").ToString();
                driverNew.Surname = data.GetValue("Surname").ToString();
                driverNew.Jmbg = data.GetValue("Jmbg").ToString();
                driverNew.Phone = data.GetValue("Phone").ToString();
                driverNew.Gender = (Genders)Enum.Parse(typeof(Genders), data.GetValue("Gender").ToString());
                driverNew.Email = data.GetValue("Email").ToString();
                driverNew.Free = true;

                driverNew.DriverCar = new Car()
                {
                    CarID = cnt++,
                    Type = (CarTypes)Enum.Parse(typeof(CarTypes), data.GetValue("Type").ToString()),
                    Year = Int32.Parse(data.GetValue("Year").ToString()),
                    RegNumber = Int32.Parse(data.GetValue("RegNumber").ToString())
                };

                driverNew.Location = new Location()
                {
                    X = Double.Parse(data.GetValue("X").ToString()),
                    Y = Double.Parse(data.GetValue("Y").ToString()),
                    Address = data.GetValue("Address").ToString()
                };

                driverNew.Drives = new List<Drive>();
                Data.driverServices.NewDriver(driverNew);
                //Data.drivers.Add(driverNew);             
                return Request.CreateResponse(HttpStatusCode.Created, driverNew);
            }

            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/Dispatcher/CreateDrive")]
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
                X = Double.Parse(data.GetValue("X").ToString()),
                Y = Double.Parse(data.GetValue("Y").ToString()),
                Address = data.GetValue("Address").ToString()
            };

            newDrive.CarType = (CarTypes)Enum.Parse(typeof(CarTypes), data.GetValue("Type").ToString());
            newDrive.Destination = new Location();
            newDrive.ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(Data.loggedUser.Id);
            newDrive.Comments = new Comment();

            /*if (Data.freeDrivers.Count==0)    MORAM DODIJELITI VOZNJU SLOBODNOM VOZACUU
                newDrive.DrivedBy = new Driver();
            else
            {
                newDrive.DrivedBy = Data.freeDrivers.ElementAt(0);
                Data.busyDrivers.Add(Data.freeDrivers[0]);
                Data.freeDrivers.RemoveAt(0);
            }*/

            IEnumerable<Driver> drivers = Data.driverServices.RetriveAllDrivers();

            foreach(Driver driver in drivers)
            {
                if (driver.Free == true)
                {
                    newDrive.DrivedBy = driver;
                    driver.Free = false;
                    Data.driverServices.EditDriverProfile(driver);
                }
            }

            if (newDrive.DrivedBy == null)
                newDrive.DrivedBy = new Driver();

            newDrive.Price = 0;
            newDrive.OrderDate = DateTime.Now;
            newDrive.OrderedBy = new Customer();
            newDrive.State = Enums.Status.Formated;
            Data.driveServices.NewDrive(newDrive);
            return Request.CreateResponse(HttpStatusCode.Created, newDrive);

        }

        [HttpGet]
        [Route("api/Dispatcher/ProcessDrive")]
        public HttpResponseMessage ProcessDrive()
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();
            IEnumerable<Driver> drivers = Data.driverServices.RetriveAllDrivers();
           
            foreach (Drive d in drives)
            {
                if (d.State == Enums.Status.Created)
                {
                   foreach(Driver driver in drivers)
                    {
                        if (driver.Free == true)
                        {
                            d.DrivedBy = driver;
                            driver.Free = false;
                            d.State = Enums.Status.Processed;
                            Data.driverServices.EditDriverProfile(driver);
                            Data.driveServices.EditDriveProfile(d);
                            return Request.CreateResponse(HttpStatusCode.OK);
                        }
                    }
                }
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpGet]
        [Route("api/Dispatcher/GetAllDrives")]
        public List<Drive> GetAllDrives()
        {
            return Data.driveServices.RetriveAllDrives() as List<Drive>;
        }

        [HttpGet]
        [Route("api/Dispatcher/GetDrives")]
        public List<Drive> GetDrives()
        {
            List<Drive> dispatcherDrives = new List<Drive>();

            IEnumerable<Drive> allDrives = Data.driveServices.RetriveAllDrives();

            foreach (Drive d in allDrives)
            {
                if (d.ApprovedBy.Id == Data.loggedUser.Id)
                {
                    dispatcherDrives.Add(d);               
                }
            }
            return dispatcherDrives;
        }
    }
}
