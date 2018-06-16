﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaxiService.Services;

namespace TaxiService.Models
{
    public class Data
    {
        public static CustomerServices customerService = new CustomerServices();
        public static DispatcherServices dispatcherServices = new DispatcherServices();
        public static DriverServices driverServices = new DriverServices();

        public static User loggedUser;

        public static List<Driver> drivers = new List<Driver>();
        public static IEnumerable<Dispatcher> dispatchers = dispatcherServices.RetriveAllDispatchers();
    }
}