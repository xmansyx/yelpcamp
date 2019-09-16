const midllewareObj = {};
const Campground = require("../models/campground");
const Comment = require("../models/comment");

midllewareObj.isLoggedIn= (req,res,next)=>{
    if(req.isAuthenticated())
        return next();
        
    req.flash("error","you must login first");
    res.redirect("/login");
}

midllewareObj.isAutherizedForComments = (req,res,next)=>{
    Comment.findById(req.params.commentID,(err,comment)=>{
        if (err)
            console.log(err)
        else{
            if(comment.author.id.equals(req.user._id)){
               console.log(req.user._id);
               next();
            }
            else{
                res.redirect("back");
            }
        }         
    });
}

midllewareObj.isAutherizedForCampgrounds= (req,res,next)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if (err)
            console.log(err)
        else{
            if(campground.author.id.equals(req.user._id)){
               console.log(req.user._id);
               next();
            }
            else{
                res.redirect("back");
            }
        }         
    });
}

module.exports = midllewareObj;