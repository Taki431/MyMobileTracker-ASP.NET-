namespace MyMobileTrackerList.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using MyMobileTrackerList.Models;
    internal sealed class Configuration : DbMigrationsConfiguration<MyMobileTrackerList.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MyMobileTrackerList.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            AddUsers(context);
        }
        void AddUsers (Models.ApplicationDbContext context)
        {
            var user = new ApplicationUser { UserName = "jlee431@sanion.com" };
            var um = new UserManager<ApplicationUser>(
                new UserStore<ApplicationUser>(context));
            um.Create(user, "password");
        }
    }
}
