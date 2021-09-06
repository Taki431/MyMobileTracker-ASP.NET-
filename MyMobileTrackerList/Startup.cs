using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyMobileTrackerList.Startup))]
namespace MyMobileTrackerList
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
