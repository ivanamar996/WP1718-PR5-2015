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
            }         
        }
    }
}
