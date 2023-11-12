import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  user: {
    userId: {
      type: String, // Zmiana z ObjectId na String, aby pasowało do Twojego niestandardowego ID
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
      followerId: {
        type: String, // Zmiana z ObjectId na String
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
      followedId: {
        type: String, // Zmiana z ObjectId na String
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