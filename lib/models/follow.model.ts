import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followers: [
    {
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "followers.onModel",
      },
      onModel: {
        type: String,
        required: true,
        enum: ["User", "Organization"],
      },
    },
  ],
  followed: [
    {
      followedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "followers.onModel",
      },
      onModel: {
        type: String,
        required: true,
        enum: ["User", "Organization"],
      },
    },
  ],
});

const Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema);

export default Follow;
