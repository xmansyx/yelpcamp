const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");
//const seedDb = require("./seeds");
const passport = require("passport");
const User = require("./models/user");
const localStrategy = require("passport-local");
const expressSession = require('express-session');
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//seedDb;
app.use(flash());

//passport config
app.use(expressSession({
    secret: "i don't know WTF is this",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();

});
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.listen(3001, () => {
    console.log("staring at 3001");
});


app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);
