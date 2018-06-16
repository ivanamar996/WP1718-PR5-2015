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

        [HttpPost]
        [Route("api/Register/RegisterAccount")]
        public void RegisterAccount([FromBody]Customer customer)
        {
            if (!Data.customerService.CheckIfCustomerExists(customer.Username))
            {
                IEnumerable<Customer> customers = Data.customerService.RetriveAllCustomers();
                if (customers == null)
                {
                    customer.Id = 0;
                }
                else
                {
                    customer.Id = customers.Count() + 1;
                }             
                customer.Role = Enums.Roles.Customer;
                Data.customerService.NewCustomer(customer);
            }
        }
    }
}
