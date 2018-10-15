const server = require("express");
const router = server.Router();
const User = require("../models/User.js");
const Log = require("../models/Log.js");
const UserComponent = require("../components/user.js");
const LogComponent = require("../components/log.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");

router.get("/", (req, res) => {
  
  res.render("index.ejs");
  
});


module.exports = router;