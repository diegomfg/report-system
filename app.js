const express = require("express");
const app = express();
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const express_session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const indexRoutes = require("./routes/index.js");
const reportRoutes = require("./routes/logs.js");
const userRoutes = require("./routes/user.js");
const User = require("./models/User");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;

Mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/report_system",
  { useNewUrlParser: true },
  (error, db) => {
    if (error) {
      console.log("ERROR: ", error);
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// static assets
app.use(express.static(__dirname + "/public"));
app.use(
  express_session({
    secret: process.env.E_SECRET || "secretkey12312312312312",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      return done(null, user);
    });
  })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ----- GLOBAL VARIABLES FOR EVERY PAGE -----*/

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/log", reportRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 8080, process.env.IP, () => {
  console.log(`Server is running at port ${port}`);
});
