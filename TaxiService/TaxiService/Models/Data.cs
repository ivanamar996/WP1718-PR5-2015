using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaxiService.Services;

namespace TaxiService.Models
{
    public class Data
    {
        public static CustomerService customerService = new CustomerService();
        public static DispatcherServices dispatcherServices = new DispatcherServices();

        public static User loggedUser;

        public static IEnumerable<Dispatcher> dispatchers = dispatcherServices.RetriveAllDispatchers();
    }
}