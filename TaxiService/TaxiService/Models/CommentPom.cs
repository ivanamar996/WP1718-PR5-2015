using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiService.Models
{
    public class CommentPom
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int DriveId { get; set; }
        public int Grade { get; set; }
    }
}