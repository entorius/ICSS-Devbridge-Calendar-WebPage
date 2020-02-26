using System.Web;
using System.Web.Mvc;

namespace ICSS_Devbridge_Calendar_WebPage
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
