import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true,
      refPath: "user.onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Organization"],
    },
  },
  followers: [
    {
      _id: false,
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "followers.onModel",
      },
      onModel: {
        type: String,
        enum: ["User", "Organization"],
      },
    },
  ],
  followed: [
    {
      _id: false,
      followedId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "followed.onModel",
      },
      onModel: {
        type: String,
        enum: ["User", "Organization"],
      },
    },
  ],
});

const Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema);

export default Follow;
