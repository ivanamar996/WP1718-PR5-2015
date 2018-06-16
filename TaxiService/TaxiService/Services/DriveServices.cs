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
    public class DriveServices
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Drives.xml");

        public void EditDriverProfile(Driver driver)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Id", driver.Id);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Username", driver.Username);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Password", driver.Password);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Name", driver.Name);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Surname", driver.Surname);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Jmbg", driver.Jmbg);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Phone", driver.Phone);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Email", driver.Email);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Gender", driver.Gender);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Role", driver.Role);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("X", driver.Location.X);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Y", driver.Location.Y);
                xmlDocument.Element("Drivers")
                                        .Elements("Driver")
                                        .Where(x => x.Attribute("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Address", driver.Location.Address);

                xmlDocument.Save(fileName);
            }
        }

        public void NewDrive(Drive drive) //nisam nista za Comment,
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),

                new XElement("Drives",
                new XElement("Drive", new XAttribute("Id", drive.Id),
                new XElement("Id", drive.Id),
                new XElement("OrderDate",drive.OrderDate),
                new XElement("AddressX",drive.Address.X),
                new XElement("AddressY",drive.Address.Y),
                new XElement("AddressAdr",drive.Address.Address),
                new XElement("CarType",drive.CarType),
                new XElement("CustomerId", drive.OrderedBy.Id),
                //new XElement("CustomerUsername", drive.OrderedBy.Username),
              //  new XElement("CustomerPassword", drive.OrderedBy.Password),
              //  new XElement("CustomerName", drive.OrderedBy.Name),
             //   new XElement("CustomerSurname", drive.OrderedBy.Surname),
              //  new XElement("CustomerJmbg", drive.OrderedBy.Jmbg),
              //  new XElement("CustomerPhone", drive.OrderedBy.Phone),
                //new XElement("CustomerEmail", drive.OrderedBy.Email),
               // new XElement("CustomerGender", drive.OrderedBy.Gender),
              //  new XElement("CustomerRole", drive.OrderedBy.Role),
                new XElement("DestinationX", drive.Destination.X),
                new XElement("DestinationY", drive.Destination.Y),
                new XElement("DestinationAdr", drive.Destination.Address),
                new XElement("DispatcherId", drive.ApprovedBy.Id),
              //  new XElement("DispatcherUsername", drive.ApprovedBy.Username),
              //  new XElement("DispatcherPassword", drive.ApprovedBy.Password),
              //  new XElement("DispatcherName", drive.ApprovedBy.Name),
              //  new XElement("DispatcherSurname", drive.ApprovedBy.Surname),
             //   new XElement("DispatcherJmbg", drive.ApprovedBy.Jmbg),
              //  new XElement("DispatcherPhone", drive.ApprovedBy.Phone),
             //   new XElement("DispatcherEmail", drive.ApprovedBy.Email),
//new XElement("DispatcherGender", drive.ApprovedBy.Gender),
              //  new XElement("DispatcherRole", drive.ApprovedBy.Role),
                new XElement("Price",drive.Price),
                new XElement("Status",drive.State)
                )
                ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument doc = XDocument.Load(stream);
                    XElement drivers = doc.Element("Drives");
                    drivers.Add(new XElement("Drive", new XAttribute("Id", drive.Id),
                new XElement("Id", drive.Id),
                new XElement("OrderDate", drive.OrderDate),
                new XElement("AddressX", drive.Address.X),
                new XElement("AddressY", drive.Address.Y),
                new XElement("AddressAdr", drive.Address.Address),
                new XElement("CarType", drive.CarType),
                new XElement("CustomerId", drive.OrderedBy.Id),
                //new XElement("CustomerUsername", drive.OrderedBy.Username),
                //  new XElement("CustomerPassword", drive.OrderedBy.Password),
                //  new XElement("CustomerName", drive.OrderedBy.Name),
                //   new XElement("CustomerSurname", drive.OrderedBy.Surname),
                //  new XElement("CustomerJmbg", drive.OrderedBy.Jmbg),
                //  new XElement("CustomerPhone", drive.OrderedBy.Phone),
                //new XElement("CustomerEmail", drive.OrderedBy.Email),
                // new XElement("CustomerGender", drive.OrderedBy.Gender),
                //  new XElement("CustomerRole", drive.OrderedBy.Role),
                new XElement("DestinationX", drive.Destination.X),
                new XElement("DestinationY", drive.Destination.Y),
                new XElement("DestinationAdr", drive.Destination.Address),
                new XElement("DispatcherId", drive.ApprovedBy.Id),
                new XElement("CommentId", drive.Comments.Id),
                //  new XElement("DispatcherUsername", drive.ApprovedBy.Username),
                //  new XElement("DispatcherPassword", drive.ApprovedBy.Password),
                //  new XElement("DispatcherName", drive.ApprovedBy.Name),
                //  new XElement("DispatcherSurname", drive.ApprovedBy.Surname),
                //   new XElement("DispatcherJmbg", drive.ApprovedBy.Jmbg),
                //  new XElement("DispatcherPhone", drive.ApprovedBy.Phone),
                //   new XElement("DispatcherEmail", drive.ApprovedBy.Email),
                //new XElement("DispatcherGender", drive.ApprovedBy.Gender),
                //  new XElement("DispatcherRole", drive.ApprovedBy.Role),
                new XElement("Price", drive.Price),
                new XElement("Status", drive.State)
                ));
                    doc.Save(fileName);
                }
                catch { }
            }
        }

        public IEnumerable<Drive> RetriveAllDrives()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Drive> drives =
                    doc.Root
                    .Elements("Drive")
                    .Select(drive => new Drive
                    {
                        Id = Int32.Parse(drive.Element("Id").Value),

                        OrderedBy = Data.customerService.RetriveCustomerById(Int32.Parse(drive.Element("CustomerId").Value)),

                        Address = new Location
                        {
                            Address = drive.Element("AddressAdr").Value,
                            X = Double.Parse(drive.Element("AddressX").Value),
                            Y = Double.Parse(drive.Element("AddressY").Value)
                        },

                        Destination = new Location
                        {
                            Address = drive.Element("DestinationAdr").Value,
                            X = Double.Parse(drive.Element("DestinationX").Value),
                            Y = Double.Parse(drive.Element("DestinationY").Value)

                        },

                        CarType = (CarTypes)Enum.Parse(typeof(CarTypes), drive.Element("CarType").Value),
                        ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(Int32.Parse(drive.Element("DispatcherId").Value)),
                        Price = Double.Parse(drive.Element("Price").Value),
                        State = (Status)Enum.Parse(typeof(Status), drive.Element("State").Value),
                        Comments = new Comment { },
                  
                    }).ToList();

                return drives;
            }
            else
            {
                return null;
            }
        }
    }
}