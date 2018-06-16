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
            if (Data.dispatcherServices.CheckIfDispatcherExists(Data.loggedUser.Username))
            {
                Dispatcher dispatcherEdit = Data.dispatcherServices.RetriveDispatcherByUserName(Data.loggedUser.Username);
                dispatcherEdit.Username = user.Username;
                dispatcherEdit.Password = user.Password;
                dispatcherEdit.Name = user.Name;
                dispatcherEdit.Jmbg = user.Jmbg;
                dispatcherEdit.Surname = user.Surname;
                Data.dispatcherServices.EditDispatcherProfile(dispatcherEdit);
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
            }
        }
    }
}
