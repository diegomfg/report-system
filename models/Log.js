const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");

const LogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  body: {
    type: String
  },
  area: {
    type: String, 
    default: "general"
    
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

LogSchema.plugin(timeStamp);

module.exports = mongoose.model("Log", LogSchema);
