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
        public static List<Drive> filterDrives = new List<Drive>();

        static Data()
        {
            customerService = new CustomerServices();
            dispatcherServices = new DispatcherServices();
            driverServices = new DriverServices();
            driveServices = new DriveServices();
            commentServices = new CommentService();
            drivers = driverServices.RetriveAllDrivers();
            dispatchers = dispatcherServices.RetriveAllDispatchers();
            filterDrives = new List<Drive>();
        }
       
        /*public static CustomerServices customerService = new CustomerServices();
        public static DispatcherServices dispatcherServices = new DispatcherServices();
        public static DriverServices driverServices = new DriverServices();
        public static DriveServices driveServices = new DriveServices();
        public static CommentService commentServices = new CommentService();

        public static User loggedUser;

        public static IEnumerable<Driver> drivers = driverServices.RetriveAllDrivers();

        public static List<Drive> filterDrives = new List<Drive>();

        public static List<Driver> freeDrivers = new List<Driver>();
        public static List<Driver> busyDrivers = new List<Driver>();

        public static IEnumerable<Dispatcher> dispatchers = dispatcherServices.RetriveAllDispatchers();*/
    }
}
 