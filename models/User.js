const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const timeStamp = require("mongoose-timestamp");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  role: { type: String, required: true, default: "support" },
  id: mongoose.Schema.Types.ObjectId,
  password: {
    type: String,
    minlength: 4
  },
  reports: {
    type: Number,
    default: 0
  },
  logEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Log" }]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(timeStamp);

module.exports = mongoose.model("User", UserSchema);
