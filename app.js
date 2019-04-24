const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const indexRoutes = require("./routes/index.js");
const reportRoutes = require("./routes/logs.js");
const userRoutes = require("./routes/user.js");
const config = require("./config");
const port = config.PORT || 8080;
// const cookieParser = require("cookie-parser");

Mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
