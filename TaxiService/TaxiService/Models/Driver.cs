using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiService.Models
{
    public class Driver : User
    {
        public Location Location { get; set; } 
        public Car DriverCar { get; set; }
        public bool Free { get; set; }

        public Driver()
        {
            Id = -1;
        }
    }
}