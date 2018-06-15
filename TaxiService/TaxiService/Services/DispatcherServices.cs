using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using TaxiService.Models;
using static TaxiService.Models.Enums;

namespace TaxiService.Services
{
    public class DispatcherServices
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Dispatchers.xml");

        public bool CheckIfDispatcherExists(string username)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                bool retVal = (from dispatcher in xmlDocument.Root.Elements("Dispatcher")
                               where dispatcher.Element("Username").Value.ToString().ToLower().Equals(username.ToLower())
                               select dispatcher).Any();

                return retVal;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<Dispatcher> RetriveAllDispatchers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Dispatcher> dispatchers =
                    doc.Root
                    .Elements("Dispatcher")
                    .Select(dispatcher => new Dispatcher
                    {
                        Id = Int32.Parse(dispatcher.Element("Id").Value),
                        Username = dispatcher.Element("Username").Value,
                        Password = dispatcher.Element("Password").Value,
                        Name = dispatcher.Element("Name").Value,
                        Surname = dispatcher.Element("Surname").Value,
                        Jmbg = dispatcher.Element("Jmbg").Value,
                        Email = dispatcher.Element("Email").Value,
                        Phone = dispatcher.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), dispatcher.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), dispatcher.Element("Role").Value)
                    }).ToList();

                return dispatchers;
            }
            else
            {
                return null;
            }
        }

        public void EditDispatcherProfile(Dispatcher dispatcher)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Id", dispatcher.Id);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Username", dispatcher.Username);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Password", dispatcher.Password);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Name", dispatcher.Name);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Surname", dispatcher.Surname);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Jmbg", dispatcher.Jmbg);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Phone", dispatcher.Phone);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Email", dispatcher.Email);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Gender", dispatcher.Gender);
                xmlDocument.Element("Dispatchers")
                                        .Elements("Dispatcher")
                                        .Where(x => x.Attribute("Id").Value == dispatcher.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Role", dispatcher.Role);

                xmlDocument.Save(fileName);
            }
        }

        public bool LogIn(string username, string password)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                bool retVal = (from dispatcher in xmlDocument.Root.Elements("Dispatcher")
                               where (dispatcher.Element("Username").Value.ToString().ToLower().Equals(username.ToLower()) && dispatcher.Element("Password").Value.ToString() == password)
                               select dispatcher).Any();

                return retVal;
            }
            else
            {
                return false;
            }
        }

        public Dispatcher RetriveDispatcherById(Guid id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Dispatcher> dispatchers =
                    doc.Root
                    .Elements("Dispatcher")
                    .Where(x => x.Attribute("Id").Value == id.ToString())
                    .Select(dispatcherx => new Dispatcher
                    {
                        Id = Int32.Parse(dispatcherx.Element("Id").Value),
                        Username = dispatcherx.Element("Username").Value,
                        Password = dispatcherx.Element("Password").Value,
                        Name = dispatcherx.Element("Name").Value,
                        Surname = dispatcherx.Element("Surname").Value,
                        Jmbg = dispatcherx.Element("Jmbg").Value,
                        Email = dispatcherx.Element("Email").Value,
                        Phone = dispatcherx.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), dispatcherx.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), dispatcherx.Element("Role").Value)
                    }).ToList();

                Dispatcher dispatcher = dispatchers.First(x => x.Id.Equals(id));

                return dispatcher;
            }
            else
            {
                return null;
            }
        }

        public Dispatcher RetriveDispatcherByUserName(string Name)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Dispatcher> dispatchers =
                    doc.Root
                    .Elements("Dispatcher")
                    .Where(x => x.Element("Username").Value.ToLower() == Name.ToLower())
                    .Select(dispatcherx => new Dispatcher
                    {
                        Id = Int32.Parse(dispatcherx.Element("Id").Value),
                        Username = dispatcherx.Element("Username").Value,
                        Password = dispatcherx.Element("Password").Value,
                        Name = dispatcherx.Element("Name").Value,
                        Surname = dispatcherx.Element("Surname").Value,
                        Jmbg = dispatcherx.Element("Jmbg").Value,
                        Email = dispatcherx.Element("Email").Value,
                        Phone = dispatcherx.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), dispatcherx.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), dispatcherx.Element("Role").Value)
                    }).ToList();

                Dispatcher dispatcher = dispatchers.First(x => x.Username.ToLower().Equals(Name.ToLower()));

                return dispatcher;
            }
            else
            {
                return null;
            }
        }
    }
}