using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaxiService.Services;

namespace TaxiService.Models
{
    public static class Data
    {
        public static CustomerServices customerService;
        public static DispatcherServices dispatcherServices;
        public static DriverServices driverServices;
        public static DriveServices driveServices;
        public static CommentService commentServices;
        public static User loggedUser;
        public static IEnumerable<Driver> drivers;
        public static IEnumerable<Dispatcher> dispatchers;
        public static List<Drive> filterDrives;

        static Data()
        {
            customerService = new CustomerServices();
            dispatcherServices = new DispatcherServices();
            driverServices = new DriverServices();
            driveServices = new DriveServices();
            commentServices = new CommentService();
            drivers = driverServices.RetriveAllDrivers();
            dispatchers = dispatcherServices.RetriveAllDispatchers();
            
        }       
    }
}
 