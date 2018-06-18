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
    public class DispatcherController : ApiController
    {
        public static int cnt = 0;

        [HttpPost]
        [Route("api/Dispatcher/AddDriver")]
        public void AddDriver([FromBody]JObject data)
        {
            if (!Data.driverServices.CheckIfDriverExists(data.GetValue("username").ToString()))
            {
                Driver driverNew = new Driver();
                IEnumerable<Driver> drivers = Data.driverServices.RetriveAllDrivers();

                if (drivers == null)
                    driverNew.Id = 0;
                else
                    driverNew.Id = drivers.Count() + 1;

                driverNew.Username = data.GetValue("username").ToString();
                driverNew.Password = data.GetValue("password").ToString();
                driverNew.Name = data.GetValue("name").ToString();
                driverNew.Surname = data.GetValue("surname").ToString();
                driverNew.Jmbg = data.GetValue("jmbg").ToString();
                driverNew.Phone = data.GetValue("phone").ToString();
                driverNew.Gender = Enums.Genders.Female;
                driverNew.Email = data.GetValue("email").ToString();
                driverNew.DriverCar = new Car() { CarID = cnt++, Year = Int32.Parse(data.GetValue("year").ToString()),
                    RegNumber = Int32.Parse(data.GetValue("regNumber").ToString()) };
                driverNew.Location = new Location()
                {
                    X = Double.Parse(data.GetValue("x").ToString()),
                    Y = Double.Parse(data.GetValue("y").ToString()),
                    Address = data.GetValue("address").ToString()
                };
                driverNew.Drives = new List<Drive>();
                Data.driverServices.NewDriver(driverNew);
                Data.drivers.Add(driverNew);
                Data.freeDrivers.Add(driverNew);
            }         
        }

        [HttpPost]
        [Route("api/Dispatcher/CreateDrive")]
        public void CreateDrive([FromBody]JObject data)
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
            newDrive.ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(Data.loggedUser.Id);
            newDrive.Comments = new Comment();
            if (Data.freeDrivers == null)
                newDrive.DrivedBy = new Driver();
            else
            {
                newDrive.DrivedBy = Data.freeDrivers[0];         
                Data.busyDrivers.Add(Data.freeDrivers[0]);
                Data.freeDrivers.RemoveAt(0);
            }

            newDrive.Price = 0;
            newDrive.OrderDate = DateTime.Now;
            newDrive.OrderedBy = new Customer();
            newDrive.State = Enums.Status.Formated;
            Data.driveServices.NewDrive(newDrive);
        }

        [HttpGet]
        [Route("api/Dispatcher/ProcessDrive")]
        public void ProcessDrive()
        {
            IEnumerable<Drive> drives = Data.driveServices.RetriveAllDrives();

            foreach(Drive d in drives)
            {
                if(d.State == Enums.Status.Created)
                {
                    if (Data.freeDrivers != null)
                    {
                        d.DrivedBy = Data.driverServices.RetriveDriverById(Data.freeDrivers[0].Id);
                        d.State = Enums.Status.Processed;
                        d.ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(Data.loggedUser.Id);
                        Data.busyDrivers.Add(Data.freeDrivers[0]);
                        Data.freeDrivers.RemoveAt(0);
                        Data.driveServices.EditDriveProfile(d);
                    }
                }
            }
        }
    }
}
