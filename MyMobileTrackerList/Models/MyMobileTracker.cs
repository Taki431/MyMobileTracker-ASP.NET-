using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyMobileTrackerList.Models
{
    public class MyMobileTracker
    {
        public int Id { get; set; }
        public int HitCount { get; set; }
        public DateTime CurrentTime { get; set; }
        public ApplicationUser User { get; set; }
    }
}