using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static TaxiService.Models.Enums;

namespace TaxiService.Models
{
    public class Drive
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public Location Address { get; set; }
        public CarTypes CarType { get; set; }
        public Customer OrderedBy { get; set; }
        public Location Destination { get; set; }
        public Dispatcher ApprovedBy { get; set; }
        public Driver DrivedBy { get; set; }
        public double Price { get; set; }
        public Comment Comments { get; set; }
        public Status State { get; set; }
    }
}