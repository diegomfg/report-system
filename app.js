const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User.js");
const Log = require("./models/Log.js");
const UComponent = require("./controllers/user.js");
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressSession = require('express-session');
const passportLocalMongoose = require("passport-local-mongoose");
const indexRoutes = require("./routes/index.js");
const logRoutes = require("./routes/logs.js");
const userRoutes = require('./routes/user.js');
const updateUsers = require('./updateUsers.js');
const flash = require('connect-flash');
const port = process.env.PORT || 8080;
// const cookieParser = require("cookie-parser");

Mongoose.connect("mongodb://localhost/LogApp", {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

/********************** SESSION CONFIG ******************************/

app.use(ExpressSession({ 
    secret: "User Authentication", 
    resave: false, 
    saveUninitialized: false })); //this has to be initialized before passport.initialize()
    
app.use(passport.initialize()); //good stuff
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**********************END SESSION CONFIG ******************************/

app.use(flash());


/* GLOBAL MIDDLEWARE */

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// for when i found a better name for non-admin users
// updateUsers();

app.use("/", indexRoutes);
app.use("/log", logRoutes);
app.use("/user", userRoutes);


app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Service is running at port ${port}`);
});
