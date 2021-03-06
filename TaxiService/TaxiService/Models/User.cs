﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static TaxiService.Models.Enums;

namespace TaxiService.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Jmbg { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Enums.Genders Gender { get; set; }
        public Enums.Roles Role { get; set; }
        public List<Drive> Drives { get; set; }

        public User()
        {
            Id = -1;
        }
    }
}