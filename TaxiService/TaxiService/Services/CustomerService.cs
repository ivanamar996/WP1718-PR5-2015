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
    public class CustomerService
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Customers.xml");

        public bool CheckIfCustomerExists(string username)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                bool retVal = (from customer in xmlDocument.Root.Elements("Customer")
                               where customer.Element("Username").Value.ToString().ToLower().Equals(username.ToLower())
                               select customer).Any();

                return retVal;
            }
            else
            {
                return false;
            }
        }

        public void EditCustomerProfile(Customer customer)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Id", customer.Id);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Username", customer.Username);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Password", customer.Password);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Name", customer.Name);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Surname", customer.Surname);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Jmbg", customer.Jmbg);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Phone", customer.Phone);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Email", customer.Email);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Gender", customer.Gender);
                xmlDocument.Element("Customers")
                                        .Elements("Customer")
                                        .Where(x => x.Attribute("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                        .SetElementValue("Role", customer.Role);

                xmlDocument.Save(fileName);
            }
        }

        public bool LogIn(string username, string password)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                bool retVal = (from customer in xmlDocument.Root.Elements("Customer")
                               where (customer.Element("Username").Value.ToString().ToLower().Equals(username.ToLower()) && customer.Element("Password").Value.ToString() == password)
                               select customer).Any();

                return retVal;
            }
            else
            {
                return false;
            }
        }

        public void NewCustomer(Customer customer)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),

                new XElement("Customers",
                new XElement("Customer", new XAttribute("Id", customer.Id),
                new XElement("Id", customer.Id),
                new XElement("Username", customer.Username),
                new XElement("Password", customer.Password),
                new XElement("Name", customer.Name),
                new XElement("Surname", customer.Surname),
                new XElement("Jmbg", customer.Jmbg),
                new XElement("Phone", customer.Phone),
                new XElement("Email", customer.Email),
                new XElement("Gender", customer.Gender),
                new XElement("Role", customer.Role))
                ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument doc = XDocument.Load(stream);
                    XElement customers = doc.Element("Customers");
                    customers.Add(new XElement("Customer", new XAttribute("Id", customer.Id),
                                  new XElement("Id", customer.Id),
                                  new XElement("Username", customer.Username),
                                  new XElement("Password", customer.Password),
                                  new XElement("Name", customer.Name),
                                  new XElement("Surname", customer.Surname),
                                  new XElement("Jmbg", customer.Jmbg),
                                  new XElement("Phone", customer.Phone),
                                  new XElement("Email", customer.Email),
                                  new XElement("Gender", customer.Gender),
                                  new XElement("Role", customer.Role)));
                    doc.Save(fileName);
                }
                catch { }
            }
        }

        public IEnumerable<Customer> RetriveAllCustomers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Customer> customers =
                    doc.Root
                    .Elements("Customer")
                    .Select(customer => new Customer
                    {
                        Id = Guid.Parse(customer.Element("Id").Value),
                        Username = customer.Element("Username").Value,
                        Password = customer.Element("Password").Value,
                        Name = customer.Element("Name").Value,
                        Surname = customer.Element("Surname").Value,
                        Jmbg = customer.Element("Jmbg").Value,
                        Email = customer.Element("Email").Value,
                        Phone = customer.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), customer.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), customer.Element("Role").Value)
                    }).ToList();

                return customers;
            }
            else
            {
                return null;
            }
        }

        public Customer RetriveCustomerById(Guid id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Customer> customers =
                    doc.Root
                    .Elements("Customer")
                    .Where(x => x.Attribute("Id").Value == id.ToString())
                    .Select(customerx => new Customer
                    {
                        Id = Guid.Parse(customerx.Element("Id").Value),
                        Username = customerx.Element("Username").Value,
                        Password = customerx.Element("Password").Value,
                        Name = customerx.Element("Name").Value,
                        Surname = customerx.Element("Surname").Value,
                        Jmbg = customerx.Element("Jmbg").Value,
                        Email = customerx.Element("Email").Value,
                        Phone = customerx.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), customerx.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), customerx.Element("Role").Value)
                    }).ToList();

                Customer customer = customers.First(x => x.Id.Equals(id));

                return customer;
            }
            else
            {
                return null;
            }
        }

        public Customer RetriveCustomerByUserName(string Name)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);
                IEnumerable<Customer> customers =
                    doc.Root
                    .Elements("Customer")
                    .Where(x => x.Element("Username").Value.ToLower() == Name.ToLower())
                    .Select(customerx => new Customer
                    {
                        Id = Guid.Parse(customerx.Element("Id").Value),
                        Username = customerx.Element("Username").Value,
                        Password = customerx.Element("Password").Value,
                        Name = customerx.Element("Name").Value,
                        Surname = customerx.Element("Surname").Value,
                        Jmbg = customerx.Element("Jmbg").Value,
                        Email = customerx.Element("Email").Value,
                        Phone = customerx.Element("Phone").Value,
                        Gender = (Genders)Enum.Parse(typeof(Genders), customerx.Element("Gender").Value),
                        Role = (Roles)Enum.Parse(typeof(Roles), customerx.Element("Role").Value)
                    }).ToList();

                Customer customer = customers.First(x => x.Username.ToLower().Equals(Name.ToLower()));

                return customer;
            }
            else
            {
                return null;
            }
        }
    }
}