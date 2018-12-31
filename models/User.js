const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const timeStamp = require("mongoose-timestamp");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  role: { type: String, default: "junior" },
  id: mongoose.Schema.Types.ObjectId,
  password: String,
  logEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Log" }]
});

UserSchema.plugin(timeStamp);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
