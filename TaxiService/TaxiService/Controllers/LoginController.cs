﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Caching;
using System.Web.Http;
using TaxiService.Models;

namespace TaxiService.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("api/Login/Login")]
        public HttpResponseMessage Login([FromBody] LoginClass log)
        {
            if (Data.customerService.LogIn(log.Username, log.Password))
            {
                Customer customerLogin = Data.customerService.RetriveCustomerByUserName(log.Username);
                Data.loggedUser = customerLogin;
                return Request.CreateResponse(HttpStatusCode.Created, customerLogin);
            }
            else if (Data.dispatcherServices.LogIn(log.Username, log.Password))
            {
                Dispatcher dispatcherLogin = Data.dispatcherServices.RetriveDispatcherByUserName(log.Username);
                Data.loggedUser = dispatcherLogin;
                return Request.CreateResponse(HttpStatusCode.Created, dispatcherLogin);
            }
            else if (Data.driverServices.LogIn(log.Username, log.Password))
            {
                Driver driverLogin = Data.driverServices.RetriveDriverByUserName(log.Username);
                Data.loggedUser = driverLogin;
                return Request.CreateResponse(HttpStatusCode.Created, driverLogin);
            }
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpGet]
        [Route("api/Login/Get")]
        public User Get()
        {           
            return Data.loggedUser;
        }
    }
}
