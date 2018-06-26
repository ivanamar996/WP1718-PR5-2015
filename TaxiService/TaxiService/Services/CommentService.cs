using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using TaxiService.Models;

namespace TaxiService.Services
{
    public class CommentService
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Comments.xml");

        public void NewComment(Comment comment)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement("Comments",
                new XElement("Comment", new XAttribute("Id", comment.Id),
                        new XElement("Id", comment.Id),
                        new XElement("Description", comment.Description),
                        new XElement("UserId", comment.CreatedBy.Id),
                        new XElement("DriveId", comment.CommentedOn.Id),
                        new XElement("Grade", comment.Grade)
                )));
                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument doc = XDocument.Load(stream);
                    XElement drivers = doc.Element("Comments");
                    drivers.Add(new XElement("Comment", new XAttribute("Id", comment.Id),
                        new XElement("Id", comment.Id),
                        new XElement("Description", comment.Description),
                        new XElement("UserId", comment.CreatedBy.Id),
                        new XElement("DriveId", comment.CommentedOn.Id),
                        new XElement("Grade", comment.Grade)
                ));
                    doc.Save(fileName);
                }
                catch { }
            }
        }

        public IEnumerable<Comment> RetriveAllComments()
        {
            if (File.Exists(fileName))
            {
                List<Comment> fullComments = new List<Comment>();

                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);

                IEnumerable<CommentPom> comments =
                    doc.Root
                    .Elements("Comment")
                    .Select(comment => new CommentPom
                    {
                        Id = Int32.Parse(comment.Element("Id").Value),

                        UserId = Int32.Parse(comment.Element("UserId").Value),

                        Description = comment.Element("Description").Value,
                        
                        DriveId = Int32.Parse(comment.Element("DriveId").Value),

                        Grade = Int32.Parse(comment.Element("Grade").Value)

                    }).ToList();

                foreach (CommentPom pom in comments)
                {

                    Comment com = new Comment();
                    com.Id = pom.Id;
                    com.Grade = pom.Grade;
                    com.CreatedBy = Data.customerService.RetriveCustomerById(pom.UserId);
                    com.CommentedOn = Data.driveServices.RetriveDriveById(pom.DriveId);
                    com.Description = pom.Description;

                    fullComments.Add(com);
                }

                return fullComments;
            }
            else
            {
                return null;
            }
        }

        public Comment RetriveCommentById(int id)
        {
            if (File.Exists(fileName))
            {
                List<Comment> fullComments = new List<Comment>();

                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument doc = XDocument.Load(stream);

                IEnumerable<CommentPom> comments =
                    doc.Root
                    .Elements("Comment")
                    .Select(comment => new CommentPom
                    {
                        Id = Int32.Parse(comment.Element("Id").Value),

                        UserId = Int32.Parse(comment.Element("UserId").Value),

                        Description = comment.Element("Description").Value,

                        DriveId = Int32.Parse(comment.Element("DriveId").Value),

                        Grade = Int32.Parse(comment.Element("Grade").Value)

                    }).ToList();

                foreach (CommentPom pom in comments)
                {

                    Comment com = new Comment();
                    com.Id = pom.Id;
                    com.Grade = pom.Grade;
                    com.CreatedBy = Data.customerService.RetriveCustomerById(pom.UserId);
                    com.CommentedOn = Data.driveServices.RetriveDriveById(pom.DriveId);
                    com.Description = pom.Description;
                    fullComments.Add(com);
                }
            

                Comment comment1 = fullComments.First(x => x.Id.Equals(id));

                return comment1;
            }
            else
            {
                return null;
            }
        }
    }
}