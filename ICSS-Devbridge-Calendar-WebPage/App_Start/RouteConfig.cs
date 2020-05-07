using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ICSS_Devbridge_Calendar_WebPage
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Register",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Register", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Base",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Directory", action = "Contact", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Home",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "Home", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "LearningTree",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "LearningTree", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Calendar",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "Calendar", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Settings",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "Settings", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Team",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Main", action = "Team", id = UrlParameter.Optional }
           );
            routes.MapRoute(
               name: "Topics",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Main", action = "Topics", id = UrlParameter.Optional }
           );

        }
    }
}
