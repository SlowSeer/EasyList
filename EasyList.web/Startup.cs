using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EasyList.web.Startup))]
namespace EasyList.web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
