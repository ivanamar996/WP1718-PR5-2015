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
        public void Edit([FromBody]User user)
        {
            if (user.Role == Enums.Roles.Dispatcher)
            {
                Dispatcher dispatcherEdit = (Dispatcher)user;
                Data.dispatcherServices.EditDispatcherProfile(dispatcherEdit);
            }
        }
    }
}
