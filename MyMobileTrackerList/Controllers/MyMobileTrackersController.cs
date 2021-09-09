using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using MyMobileTrackerList.Models;

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
            MyMobileTracker Mobiletracker = new MyMobileTracker();
            if (ModelState.IsValid)
            {
                string currentUserId = User.Identity.GetUserId();
                // ApplicationUser currentUser = db.Users.FirstOrDefault
                //     (x => x.Id == currentUserId);
                var currentUser = db.Set<ApplicationUser>().Find(currentUserId);
                //ApplicanionUser currentUser = db.Set<ApplicationUser>().Find(currentUserId);
                Mobiletracker.User = currentUser;
                System.Diagnostics.Debug.WriteLine(hitcount);
                Console.WriteLine(hitcount);
                Mobiletracker.HitCount = hitcount;
                db.MyMobileTrackers.Add(Mobiletracker);
                //db.Entry(Mobiletracker).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(Mobiletracker.HitCount);
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
    }
}
