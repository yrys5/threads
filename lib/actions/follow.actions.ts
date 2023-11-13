"use server";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Community from "../models/community.model";
import Follow from "../models/follow.model";

export async function isFollowed(followerId: string, followedId: string): Promise<boolean> {
    await connectToDB();
  
    //USER / COMMUNITY == Followed
    const followedCommunityId = await Community.findOne({ id: followedId });
    const followedUserId = await User.findOne({ id: followedId });
    const followedObject = followedCommunityId || followedUserId;
  
    //USER / COMMUNITY == Follower
    const followerCommunityId = await Community.findOne({ id: followerId });
    const followerUserId = await User.findOne({ id: followerId });
    const followerObject = followerCommunityId || followerUserId;
  
    const isFollower = await Follow.findOne({
      'user.userId': followedObject,
      'followers.followerId': followerObject
    });
  
    return !!isFollower; // Konwersja do boolean - zwraca true jeśli znaleziono dokument, w przeciwnym razie false
  }
  

export async function addFollow(followerId: string, followedId: string) {
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
  //   const followedObjectinFollow = await Follow.findOne({
  //     "user.userId": followedObject,
  //   });
  //   const followerObjectinFollow = await Follow.findOne({
  //     "user.userId": followerObject,
  //   });

  //   const isFollower = await Follow.findOne({
  //     'user.userId': followedObject,
  //     'followers.followerId': followerObject
  // });

  //   // TODO: Pull if exist
  //   await Follow.findOneAndUpdate(
  //     { "user.userId": followedObject },
  //     {
  //       $set: {
  //         "user.userId": followedObject,
  //         "user.onModel": "User", // TODO: Comunnity <=
  //       },
  //       $addToSet: {
  //         followers: {
  //           followerId: followerObject,
  //           onModel: "User", // TODO: Comunnity <=
  //         },
  //       },
  //     },
  //     { upsert: true, new: true }
  //   );

  //   // TODO: Pull if exist
  //   await Follow.findOneAndUpdate(
  //     { "user.userId": followerObject },
  //     {
  //       $set: {
  //         "user.userId": followerObject,
  //         "user.onModel": "User", // TODO: Comunnity <=
  //       },
  //       $addToSet: {
  //         followed: {
  //           followerId: followedObject,
  //           onModel: "User", // TODO: Comunnity <=
  //         },
  //       },
  //     },
  //     { upsert: true, new: true }
  //   );

  // Dodaj followerObject do listy followers obiektu followedObject, jeśli go tam jeszcze nie ma
  await Follow.findOneAndUpdate(
    {
      "user.userId": followedObject,
      "followers.followerId": { $ne: followerObject },
    },
    {
      $addToSet: {
        followers: {
          followerId: followerObject,
          onModel: "User", // Użyj funkcji isUser/isCommunity, aby ustalić to
        },
      },
    },
    { upsert: true, new: true }
  );

  // Usuń followerObject z listy followers obiektu followedObject, jeśli jest już na liście
  // await Follow.findOneAndUpdate(
  //     {
  //         'user.userId': followedObject,
  //         'followers.followerId': followerObject
  //     },
  //     {
  //         $pull: {
  //             followers: {
  //                 followerId: followerObject
  //             }
  //         }
  //     },
  //     { new: true }
  // );

  // Analogicznie dla followedObject i listy followed
  // Dodaj followedObject do listy followed obiektu followerObject, jeśli go tam jeszcze nie ma
  await Follow.findOneAndUpdate(
    {
      "user.userId": followerObject,
      "followed.followedId": { $ne: followedObject },
    },
    {
      $addToSet: {
        followed: {
          followedId: followedObject,
          onModel: "User", // Użyj funkcji isUser/isCommunity, aby ustalić to
        },
      },
    },
    { upsert: true, new: true }
  );

  // Usuń followedObject z listy followed obiektu followerObject, jeśli jest już na liście
  // await Follow.findOneAndUpdate(
  //     {
  //         'user.userId': followerObject,
  //         'followed.followedId': followedObject
  //     },
  //     {
  //         $pull: {
  //             followed: {
  //                 followedId: followedObject
  //             }
  //         }
  //     },
  //     { new: true }
  // );
}

export async function removeFollow(followerId: string, followedId: string) {
  await connectToDB();

  //USER / COMMUNITY == Followed
  const followedCommunityId = await Community.findOne({ id: followedId });
  const followedUserId = await User.findOne({ id: followedId });
  const followedObject = followedCommunityId || followedUserId;

  //USER / COMMUNITY == Follower
  const followerCommunityId = await Community.findOne({ id: followerId });
  const followerUserId = await User.findOne({ id: followerId });
  const followerObject = followerCommunityId || followerUserId;

  // Usuń followerObject z listy followers obiektu followedObject, jeśli jest już na liście
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
  // Usuń followedObject z listy followed obiektu followerObject, jeśli jest już na liście
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
}
