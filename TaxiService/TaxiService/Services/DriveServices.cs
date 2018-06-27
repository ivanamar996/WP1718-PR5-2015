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

        public void NewDrive(Drive drive)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement("Drives",
                new XElement("Drive", new XAttribute("Id", drive.Id),
                        new XElement("Id", drive.Id),
                        new XElement("OrderDate", drive.OrderDate),
                        new XElement("AddressX", drive.Address.X),
                        new XElement("AddressY", drive.Address.Y),
                        new XElement("AddressAdr", drive.Address.Address),
                        new XElement("CarType", drive.CarType),
                        new XElement("CustomerId", drive.OrderedBy.Id),
                        new XElement("DestinationX", drive.Destination.X),
                        new XElement("DestinationY", drive.Destination.Y),
                        new XElement("DestinationAdr", drive.Destination.Address),
                        new XElement("DispatcherId", drive.ApprovedBy.Id),
                        new XElement("DriverId", drive.DrivedBy.Id),
                        new XElement("CommentId", drive.Comments.Id),
                        new XElement("Price", drive.Price),
                        new XElement("Status", drive.State)
                )));
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
                        new XElement("DestinationX", drive.Destination.X),
                        new XElement("DestinationY", drive.Destination.Y),
                        new XElement("DestinationAdr", drive.Destination.Address),
                        new XElement("DispatcherId", drive.ApprovedBy.Id),
                        new XElement("DriverId", drive.DrivedBy.Id),
                        new XElement("CommentId", drive.Comments.Id),
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
                List<Drive> fullDrives = new List<Drive>();

                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);

                IEnumerable<DrivePom> drives =
                    doc.Root
                    .Elements("Drive")
                    .Select(drive => new DrivePom
                    {
                        Id = Int32.Parse(drive.Element("Id").Value),

                        OrderDate = DateTime.Parse(drive.Element("OrderDate").Value),

                        CustomerId = Int32.Parse(drive.Element("CustomerId").Value),

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

                        DriverId = Int32.Parse(drive.Element("DriverId").Value),
                        CarType = (CarTypes)Enum.Parse(typeof(CarTypes), drive.Element("CarType").Value),
                        DispatcherId = Int32.Parse(drive.Element("DispatcherId").Value),
                        Price = Double.Parse(drive.Element("Price").Value),
                        State = (Status)Enum.Parse(typeof(Status), drive.Element("Status").Value),
                        CommentId = Int32.Parse(drive.Element("CommentId").Value),

                    }).ToList();

                foreach (DrivePom pom in drives)
                {
                    Drive drive = new Drive();
                    drive.Id = pom.Id;
                    drive.OrderDate = pom.OrderDate;
                    drive.OrderedBy = Data.customerService.RetriveCustomerById(pom.CustomerId);
                    drive.Price = pom.Price;
                    drive.State = pom.State;
                    drive.Destination = pom.Destination;
                    drive.CarType = pom.CarType;
                    drive.Address = pom.Address;

                    if (pom.DispatcherId == -1)
                        drive.ApprovedBy = new Dispatcher();
                    else
                        drive.ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(pom.DispatcherId);

                    if (pom.CommentId == -1)
                        drive.Comments = new Comment(); //nemam else her nisam napravila commenrService
                    else
                        drive.Comments = Data.commentServices.RetriveCommentById(pom.CommentId);

                    if (pom.DriverId == -1)
                        drive.DrivedBy = new Driver();
                    else
                        drive.DrivedBy = Data.driverServices.RetriveDriverById(pom.DriverId);

                    fullDrives.Add(drive);
                }

                return fullDrives;
            }
            else
            {
                return null;
            }
        }

        public void EditDriveProfile(Drive drive)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Id", drive.Id);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("OrderDate", drive.OrderDate);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("AddressX", drive.Address.X);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("AddressY", drive.Address.Y);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("AddressAdr", drive.Address.Address);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("CarType", drive.CarType);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("CustomerId", drive.OrderedBy.Id);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("DestinationX", drive.Destination.X);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("DestinationY", drive.Destination.Y);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("DestinationAdr", drive.Destination.Address);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("DispatcherId", drive.ApprovedBy.Id);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("DriverId", drive.DrivedBy.Id);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("CommentId", drive.Comments.Id);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Price", drive.Price);
                xmlDocument.Element("Drives")
                                        .Elements("Drive")
                                        .Where(x => x.Attribute("Id").Value == drive.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Status", drive.State);

                xmlDocument.Save(fileName);
            }
        }

        public Drive RetriveDriveById(int id)
        {
            if (File.Exists(fileName))
            {
                List<Drive> fullDrives = new List<Drive>();

                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<DrivePom> drives =
                    doc.Root
                    .Elements("Drive")
                    .Where(x => x.Attribute("Id").Value == id.ToString())
                    .Select(drivex => new DrivePom
                    {
                        Id = Int32.Parse(drivex.Element("Id").Value),

                        CustomerId = Int32.Parse(drivex.Element("CustomerId").Value),

                        Address = new Location
                        {
                            Address = drivex.Element("AddressAdr").Value,
                            X = Double.Parse(drivex.Element("AddressX").Value),
                            Y = Double.Parse(drivex.Element("AddressY").Value)
                        },

                        Destination = new Location
                        {
                            Address = drivex.Element("DestinationAdr").Value,
                            X = Double.Parse(drivex.Element("DestinationX").Value),
                            Y = Double.Parse(drivex.Element("DestinationY").Value)

                        },

                        DriverId = Int32.Parse(drivex.Element("DriverId").Value),
                        CarType = (CarTypes)Enum.Parse(typeof(CarTypes), drivex.Element("CarType").Value),
                        DispatcherId = Int32.Parse(drivex.Element("DispatcherId").Value),
                        Price = Double.Parse(drivex.Element("Price").Value),
                        State = (Status)Enum.Parse(typeof(Status), drivex.Element("Status").Value),
                        CommentId = Int32.Parse(drivex.Element("CommentId").Value),
                    }).ToList();

                foreach (DrivePom pom in drives)
                {
                    Drive d = new Drive();
                    d.Id = pom.Id;
                    d.OrderDate = pom.OrderDate;
                    d.OrderedBy = Data.customerService.RetriveCustomerById(pom.CustomerId);
                    d.Price = pom.Price;
                    d.State = pom.State;
                    d.Destination = pom.Destination;
                    d.CarType = pom.CarType;
                    d.Address = pom.Address;

                    if (pom.DispatcherId == -1)
                        d.ApprovedBy = new Dispatcher();
                    else
                        d.ApprovedBy = Data.dispatcherServices.RetriveDispatcherById(pom.DispatcherId);

                    if (pom.CommentId == -1)
                        d.Comments = new Comment(); //nemam else her nisam napravila commenrService
                    else
                        d.Comments = new Comment() { Id = pom.CommentId };


                    if (pom.DriverId == -1)
                        d.DrivedBy = new Driver();
                    else
                        d.DrivedBy = Data.driverServices.RetriveDriverById(pom.DriverId);

                    fullDrives.Add(d);
                }

                Drive drive = fullDrives.FirstOrDefault(x => x.Id.Equals(id));

                return drive;
            }
            else
            {
                return null;
            }
        }
    }
}