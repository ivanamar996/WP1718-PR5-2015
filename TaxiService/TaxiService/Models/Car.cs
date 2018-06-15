using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static TaxiService.Models.Enums;

namespace TaxiService.Models
{
    public class Car
    {
        public Driver Driver { get; set; }
        public int Year { get; set; }
        public int RegNumber { get; set; }
        public int CarID { get; set; }
        public CarTypes Type { get; set; }

    }
}