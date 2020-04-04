using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICSS_Devbridge_Calendar_WebPage.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult Home()
        {
            return View();
        }
        public ActionResult Calendar()
        {
            return View();
        }
        public ActionResult LearningTree()
        {
            return View();
        }
        public ActionResult Settings()
        {
            return View();
        }
        public ActionResult Team()
        {
            return View();
        }
        public ActionResult Topics()
        {
            return View();
        }
    }
}