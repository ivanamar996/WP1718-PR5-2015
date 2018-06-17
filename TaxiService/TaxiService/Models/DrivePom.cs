using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static TaxiService.Models.Enums;

namespace TaxiService.Models
{
    public class DrivePom
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public Location Address { get; set; }
        public CarTypes CarType { get; set; }
        public int CustomerId { get; set; }
        public Location Destination { get; set; }
        public int DispatcherId { get; set; }
        public int DriverId { get; set; }
        public double Price { get; set; }
        public int CommentId { get; set; }
        public Status State { get; set; }
    }
}