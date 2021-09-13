namespace MyMobileTrackerList.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MyMobileTracker2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.MyMobileTrackers", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.MyMobileTrackers", new[] { "User_Id" });
            AlterColumn("dbo.MyMobileTrackers", "User_Id", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.MyMobileTrackers", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.MyMobileTrackers", "User_Id");
            AddForeignKey("dbo.MyMobileTrackers", "User_Id", "dbo.AspNetUsers", "Id");
        }
    }
}
