﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TaxiService.Models
{
    public class Enums
    {
        public enum Roles : int
        {
            Driver,
            Customer,
            Dispatcher
        }

        public enum CarTypes : int
        {
            None,
            Car,
            Van
        }

        public enum Status : int
        {
            
            Created,
            Canceled,
            Formated,
            Processed,
            Accepted,
            Successful,
            Unsuccessful
        }

        public enum Genders : int
        {
            Male,
            Female
        }
    }
}