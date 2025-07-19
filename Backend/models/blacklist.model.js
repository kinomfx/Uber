import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 24 hours in seconds
  }
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
export default Blacklist;