const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
            console.log(err);
        else
            res.render("comments/new",{campground:campground});
    });
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
            console.log(err)
        else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err)
                    console.log(err);
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
});

router.get("/:commentID/edit",middleware.isLoggedIn,middleware.isAutherizedForComments,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
            console.log(err)
        else{
            Comment.findById(req.params.commentID,(err,comment)=>{
                if(err)
                    console.log(err);
                else{
                    res.render("comments/edit",{campground:campground,comment:comment});
                }
            });
        }
    });
});

router.put("/:commentID",middleware.isLoggedIn,middleware.isAutherizedForComments,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.commentID,req.body.comment,(err,updatedComment)=>{
        if(err)
            console.log(err);
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:commentID",middleware.isLoggedIn,middleware.isAutherizedForComments,(req,res)=>{
    Comment.findByIdAndDelete(req.params.commentID,(err)=>{
        if(err)
            console.log(err);
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;