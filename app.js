const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User.js");
const Log = require("./models/Log.js");
const UserController = require("./controllers/User.js");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressSession = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const indexRoutes = require("./routes/index.js");
const reportRoutes = require("./routes/logs.js");
const userRoutes = require("./routes/user.js");
const updateUsers = require("./updateUsers.js");
const flash = require("connect-flash");
const config = require("./config");
const port = config.PORT || 8080;
// const cookieParser = require("cookie-parser");

Mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

/********************** SESSION CONFIG ******************************/

app.use(
  ExpressSession({
    secret: "User Authentication",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize()); //good stuff
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/********************** END SESSION CONFIG ******************************/

app.use(flash());

/* GLOBAL MIDDLEWARE */

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// for when i found a better name for non-admin users
// updateUsers();

app.use("/", indexRoutes);
app.use("/log", reportRoutes);
app.use("/user", userRoutes);

app.listen(config.PORT, process.env.IP, () => {
  console.log(
    `Server is running at port ${port} and connected to database @ ${
      config.MONGODB_URI
    }`
  );
});
