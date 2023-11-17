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
    console.error("Error in is followers:", error);
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
    console.error("Error geting follows:", error);
    throw error;
  }
}

// export async function addFollow(followerId: string, followedId: string) {
//   try {
//     await connectToDB();

//     //USER / COMMUNITY == Followed
//     const followedCommunityId = await Community.findOne({ id: followedId });
//     const followedUserId = await User.findOne({ id: followedId });
//     const followedObject = followedCommunityId || followedUserId;

//     const followerCommunityId = await Community.findOne({ id: followerId });
//     const followerUserId = await User.findOne({ id: followerId });
//     const followerObject = followerCommunityId || followerUserId;

//     await Follow.findOneAndUpdate(
//       {
//         "user.userId": followedObject,
//         "followers.followerId": { $ne: followerObject },
//       },
//       {
//         $addToSet: {
//           followers: {
//             followerId: followerObject,
//             onModel: "User", // TODO: Or Community
//           },
//         },
//       },
//       { upsert: true, new: true }
//     );

//     await Follow.findOneAndUpdate(
//       {
//         "user.userId": followerObject,
//         "followed.followedId": { $ne: followedObject },
//       },
//       {
//         $addToSet: {
//           followed: {
//             followedId: followedObject,
//             onModel: "User", // TODO: Or Community
//           },
//         },
//       },
//       { upsert: true, new: true }
//     );
//   } catch (error) {
//     console.error("Error adding follow:", error);
//     throw error;
//   }
// }

export async function addFollow(followerId: string, followedId: string) {
  try {
    await connectToDB();

    const isFollowerUser = followerId.startsWith("user_");
    const isFollowedUser = followedId.startsWith("user_");

    //USER / COMMUNITY == Followed
    const followedCommunityId = isFollowedUser ? null : await Community.findOne({ id: followedId });
    const followedUserId = isFollowedUser ? await User.findOne({ id: followedId }) : null;
    const followedObject = followedCommunityId || followedUserId;

    const followerCommunityId = isFollowerUser ? null : await Community.findOne({ id: followerId });
    const followerUserId = isFollowerUser ? await User.findOne({ id: followerId }) : null;
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
            onModel: isFollowerUser ? "User" : "Community",
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
            onModel: isFollowedUser ? "User" : "Community",
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
