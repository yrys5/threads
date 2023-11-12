"use server";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Community from "../models/community.model";
import Follow from "../models/follow.model";

export async function toggleFollow(followerId: string, followedId: string) {
  await connectToDB();

  //USER / COMMUNITY == Followed
  const followedCommunityId = await Community.findOne({ id: followedId });
  const followedUserId = await User.findOne({ id: followedId });
  const followedObject = followedCommunityId || followedUserId;

  //USER / COMMUNITY == Follower
  const followerCommunityId = await Community.findOne({ id: followerId });
  const followerUserId = await User.findOne({ id: followerId });
  const followerObject = followerCommunityId || followerUserId;

  // Followed / Follower - Object in Follow collection
  const followedObjectinFollow = await Follow.findOne({
    "user.userId": followedObject,
  });
  const followerObjectinFollow = await Follow.findOne({
    "user.userId": followerObject,
  });

  // TODO: Pull if exist
  await Follow.findOneAndUpdate(
    { "user.userId": followedObject },
    {
      $set: {
        "user.userId": followedObject,
        "user.onModel": "User", // TODO: Comunnity <=
      },
      $addToSet: {
        followers: {
          followerId: followerObject,
          onModel: "User", // TODO: Comunnity <=
        },
      },
    },
    { upsert: true, new: true }
  );

  // TODO: Pull if exist
  await Follow.findOneAndUpdate(
    { "user.userId": followerObject },
    {
      $set: {
        "user.userId": followerObject,
        "user.onModel": "User", // TODO: Comunnity <=
      },
      $addToSet: {
        followed: {
          followerId: followedObject,
          onModel: "User", // TODO: Comunnity <=
        },
      },
    },
    { upsert: true, new: true }
  );
}
