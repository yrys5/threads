"use server";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Community from "../models/community.model";
import Follow from "../models/follow.model";

export async function isFollowed(
  followerId: string,
  followedId: string
): Promise<boolean> {
  try {
    await connectToDB();

    const followedCommunityId = await Community.findOne({ id: followedId });
    const followedUserId = await User.findOne({ id: followedId });
    const followedObject = followedCommunityId || followedUserId;

    const followerCommunityId = await Community.findOne({ id: followerId });
    const followerUserId = await User.findOne({ id: followerId });
    const followerObject = followerCommunityId || followerUserId;

    const isFollower = await Follow.findOne({
      "user.userId": followedObject,
      "followers.followerId": followerObject,
    });

    return !!isFollower; // Konwersja do boolean - zwraca true jeśli znaleziono dokument, w przeciwnym razie false
  } catch (error) {
    console.error("Error is followers:", error);
    throw error;
  }
}

export async function getUserFollows(clerkUserId: string) {
  try {
    await connectToDB();
    const isCommunity = await Community.findOne({ id: clerkUserId });
    const isUser = await User.findOne({ id: clerkUserId });
    const findedId = isCommunity || isUser;

    const searchedUser = await Follow.findOne({
      "user.userId": findedId,
    });
    return { searchedUser };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function addFollow(followerId: string, followedId: string) {
  try {
    await connectToDB();

    //USER / COMMUNITY == Followed
    const followedCommunityId = await Community.findOne({ id: followedId });
    const followedUserId = await User.findOne({ id: followedId });
    const followedObject = followedCommunityId || followedUserId;

    const followerCommunityId = await Community.findOne({ id: followerId });
    const followerUserId = await User.findOne({ id: followerId });
    const followerObject = followerCommunityId || followerUserId;

    await Follow.findOneAndUpdate(
      {
        "user.userId": followedObject,
        "followers.followerId": { $ne: followerObject },
      },
      {
        $addToSet: {
          followers: {
            followerId: followerObject,
            onModel: "User", // TODO: Or Community
          },
        },
      },
      { upsert: true, new: true }
    );

    await Follow.findOneAndUpdate(
      {
        "user.userId": followerObject,
        "followed.followedId": { $ne: followedObject },
      },
      {
        $addToSet: {
          followed: {
            followedId: followedObject,
            onModel: "User", // TODO: Or Community
          },
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error adding follow:", error);
    throw error;
  }
}

export async function removeFollow(followerId: string, followedId: string) {
  try {
    await connectToDB();

    const followedCommunityId = await Community.findOne({ id: followedId });
    const followedUserId = await User.findOne({ id: followedId });
    const followedObject = followedCommunityId || followedUserId;

    const followerCommunityId = await Community.findOne({ id: followerId });
    const followerUserId = await User.findOne({ id: followerId });
    const followerObject = followerCommunityId || followerUserId;

    await Follow.findOneAndUpdate(
      {
        "user.userId": followedObject,
        "followers.followerId": followerObject,
      },
      {
        $pull: {
          followers: {
            followerId: followerObject,
          },
        },
      },
      { new: true }
    );

    await Follow.findOneAndUpdate(
      {
        "user.userId": followerObject,
        "followed.followedId": followedObject,
      },
      {
        $pull: {
          followed: {
            followedId: followedObject,
          },
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error removing follow:", error);
    throw error;
  }
}
