using System;
using System.Collections.Generic;
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
            Bez_Naznake,
            Car,
            Kombi
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