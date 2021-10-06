using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using MyMobileTrackerList.Models;
using Newtonsoft.Json;
using RestSharp;

namespace MyMobileTrackerList.Controllers
{
    public class MyMobileTrackersController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: MyMobileTrackers
        public ActionResult Index()
        {

            return View(db.MyMobileTrackers.ToList());
        }

        // GET: MyMobileTrackers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MyMobileTracker myMobileTracker = db.MyMobileTrackers.Find(id);
            if (myMobileTracker == null)
            {
                return HttpNotFound();
            }
            return View(myMobileTracker);
        }

        // GET: MyMobileTrackers/Create
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AjaxPush(int hitcount)
        {
            if (ModelState.IsValid)
            {
                var UserId = GetUser();
                var currentUser = db.MyMobileTrackers.Where(m => m.User_Id == UserId).FirstOrDefault();

                if (currentUser == null)
                {
                    MyMobileTracker Mobiletracker = new MyMobileTracker();
                    Mobiletracker.HitCount = hitcount;
                    Mobiletracker.User_Id = UserId;
                    db.MyMobileTrackers.Add(Mobiletracker);
                    //db.Entry(Mobiletracker).State = EntityState.Modified;
                    db.SaveChanges();
                    return Json(-1);
                }

                if (currentUser.HitCount > hitcount)
                    return Json(-1);
                var currenthitcount = currentUser.HitCount;
                currentUser.HitCount = hitcount;
                db.SaveChanges();

            }
            return Json(-1);
        }

        [HttpGet]
        public IList AjaxGet()
        {
            var totallist = new JsonArray();
            if (ModelState.IsValid)
            {
                var mobiletracker = db.MyMobileTrackers.OrderByDescending(m => m.HitCount).Take(5);
                var listbla = mobiletracker.ToList();
                
                foreach (var item in listbla)
                {

                    var currentUser = db.Set<ApplicationUser>().Find(item.User_Id.ToString());
                    var personallist = new JsonArray();

                    personallist.Add(item.Id);
                    personallist.Add(item.HitCount);
                    personallist.Add(currentUser.UserName);
                    totallist.Add(personallist);
                }
                //return (IList)Json(totallist);
                return totallist;
            }
            //return (IList)Json(totallist);
            return totallist;
        }

        // POST: MyMobileTrackers/Create
        // 초과 게시 공격으로부터 보호하려면 바인딩하려는 특정 속성을 사용하도록 설정하세요. 
        // 자세한 내용은 https://go.microsoft.com/fwlink/?LinkId=317598을(를) 참조하세요.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,HitCount,CurrentTime")] MyMobileTracker myMobileTracker)
        {
            if (ModelState.IsValid)
            {
                db.MyMobileTrackers.Add(myMobileTracker);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(myMobileTracker);
        }

        // GET: MyMobileTrackers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MyMobileTracker myMobileTracker = db.MyMobileTrackers.Find(id);
            if (myMobileTracker == null)
            {
                return HttpNotFound();
            }
            return View(myMobileTracker);
        }

        // POST: MyMobileTrackers/Edit/5
        // 초과 게시 공격으로부터 보호하려면 바인딩하려는 특정 속성을 사용하도록 설정하세요. 
        // 자세한 내용은 https://go.microsoft.com/fwlink/?LinkId=317598을(를) 참조하세요.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,HitCount,CurrentTime")] MyMobileTracker myMobileTracker)
        {
            if (ModelState.IsValid)
            {
                db.Entry(myMobileTracker).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(myMobileTracker);
        }

        // GET: MyMobileTrackers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MyMobileTracker myMobileTracker = db.MyMobileTrackers.Find(id);
            if (myMobileTracker == null)
            {
                return HttpNotFound();
            }
            return View(myMobileTracker);
        }

        // POST: MyMobileTrackers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            MyMobileTracker myMobileTracker = db.MyMobileTrackers.Find(id);
            db.MyMobileTrackers.Remove(myMobileTracker);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private string GetUser()
        {
            var userID = User.Identity as ClaimsIdentity;
            if (userID != null)
            {
                // the principal identity is a claims identity.
                // now we need to find the NameIdentifier claim
                var userIdClaim = userID.Claims
                    .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                if (userIdClaim != null)
                {
                    var userIdValue = userIdClaim.Value;
                    return userIdValue;
                }
            }
            return null;
        }
    }
}
