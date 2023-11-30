import mongoose from "mongoose";

const repostSchema = new mongoose.Schema({
  originalThread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  repostedBy: {
    type: String,
    required: true,
  },
  repostedAt: {
    type: Date,
    default: Date.now,
  },
  customText: {
    type: String,
  },
});

const Repost = mongoose.models.Repost || mongoose.model("Repost", repostSchema);

export default Repost;