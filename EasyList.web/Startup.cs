using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularJSTest.web.Startup))]
namespace AngularJSTest.web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
