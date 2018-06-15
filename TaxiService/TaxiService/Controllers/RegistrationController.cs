using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiService.Models;

namespace TaxiService.Controllers
{
    public class RegistrationController : ApiController
    {

        /* public HttpResponseMessage RegisterAccount([FromBody]Customer customer)
         {
             if (!Data.customerService.CheckIfCustomerExists(customer.Username))
             {
                 customer.Id = Guid.NewGuid();
                 customer.Role = Enums.Roles.Customer;
                 Data.customerService.NewCustomer(customer);

                 return Request.CreateResponse(HttpStatusCode.Created, Data.customerService.RetriveCustomerById(customer.Id));
             }
             else
             {
                 return Request.CreateResponse(HttpStatusCode.InternalServerError);
             }
         }*/
        [HttpPost]
        [Route("api/Register/RegisterAccount")]
        public void RegisterAccount([FromBody]Customer customer)
        {
            if (!Data.customerService.CheckIfCustomerExists(customer.Username))
            {
                customer.Id = Guid.NewGuid();
                customer.Role = Enums.Roles.Customer;
                Data.customerService.NewCustomer(customer);
            }
        }
    }
}
