using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApplication.Models;

namespace TestApplication.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult GetTree()
        {
            using (DataContext db = new DataContext())
            {
                var treeData = db.Performers
                    .Include(p => p.Album)
                    .ToList();
                return Ok(treeData);
            }
        }


        [HttpGet]
        public IActionResult GetTracks(int albumId)
        {
            using (DataContext db = new DataContext())
            {
                var tracks = db.Albums
                    .Include(p => p.Tracks)
                    .FirstOrDefault(p => p.Id == albumId)
                    .Tracks
                    .ToList();
                return Ok(tracks);
            }
        }

        [HttpPost]
        public ActionResult PostTrackInfo(TrackModel trackData)
        {
            var rec = Request;
            return Json("");
        }


        public IActionResult Search(string str)
        {
            return Json("");
        }


        public IActionResult Index()
        {
            return View();
        }

     
    }
}
