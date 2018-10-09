const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  title: String,
  body: String,
  creation_date: { type: Date, default: Date.now},
  area: {type: String, default: "general"},
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Log", LogSchema);
