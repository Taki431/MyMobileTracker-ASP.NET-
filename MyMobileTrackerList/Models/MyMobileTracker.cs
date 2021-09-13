using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyMobileTrackerList.Models
{
    public class MyMobileTracker
    {
        public MyMobileTracker()
        {
            CurrentTime = DateTime.Now;
            HitCount = 0;
        }
        public int Id { get; set; }
        public int HitCount { get; set; }
        public DateTime CurrentTime { get; set; }
        public string User_Id { get; set; }
    }
}