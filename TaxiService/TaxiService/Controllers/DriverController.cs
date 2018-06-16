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
    }
}
