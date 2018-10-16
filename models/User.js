const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  role: { type: String, default: "technician" },
  id: mongoose.Schema.Types.ObjectId,
  password: String,
  logEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Log" }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
