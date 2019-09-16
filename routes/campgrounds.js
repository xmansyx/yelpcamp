const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const User = require("../models/user");
const middleware = require("../middleware");

router.get("/",(req,res)=>{
    Campground.find({}, (err,campgrounds) => {
        if(err)
            console.log(err);
        else {
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

router.post("/",middleware.isLoggedIn,(req,res) => {
    req.body.campground.author  = {
        id: req.user._id,
        username:req.user.username
    }
    newCampground = req.body.campground;
    console.log(newCampground);
    Campground.create(newCampground,(err,campground) => {
        if(err)
            console.log(err)
        else {
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
});

router.get("/:id/edit",middleware.isLoggedIn,middleware.isAutherizedForCampgrounds,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if (err)
            console.log(err)
        else
            res.render("campgrounds/edit",{campground:campground});
    });
    
});
router.put("/:id",middleware.isLoggedIn,middleware.isAutherizedForCampgrounds,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,campground)=>{
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds/"+req.params.id);
    });
});
router.delete("/:id",middleware.isLoggedIn,middleware.isAutherizedForCampgrounds,(req,res)=>{
    Campground.findOneAndDelete(req.params.id,(err)=>{
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds")
    });
});
router.get("/:id",(req,res)=> {
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec((err,campground)=>{
        if(err)
            console.log(err);
        else {
            // username = User.findById(campground.comments.author.id,"username");
            // campground.comments.author.username = username;
            //console.log(campground.comments);
            res.render("campgrounds/campground",{campground:campground});
        }
            
    });
});

module.exports = router;