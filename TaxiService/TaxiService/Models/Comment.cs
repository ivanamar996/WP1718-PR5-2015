using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiService.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public User CreatedBy { get; set; }
        public Drive CommentedOn { get; set; }
        public int Grade { get; set; }

        public Comment()
        {
            Id = -1;
            CreatedBy = new User();
            Grade = 0;
        }
    }
}