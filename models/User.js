const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  likedPlays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Play" }],
});

module.exports = mongoose.model("User", UserSchema);
