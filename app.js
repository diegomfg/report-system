const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const express_session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const indexRoutes = require("./routes/index.js");
const reportRoutes = require("./routes/logs.js");
const userRoutes = require("./routes/user.js");
const config = require("./config");
const User = require('./models/User')
const port = config.PORT || 8080;
// const cookieParser = require("cookie-parser");

Mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express_session({
  secret: "User Authentication",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      return done(null, user);
    });
  }
));
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

app.listen(config.PORT, process.env.IP, () => {
  console.log(
    `Server is running at port ${port} and connected to database @ ${
    config.MONGODB_URI
    }`
  );
});
