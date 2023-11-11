"use server";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Community from "../models/community.model";
import Follow from "../models/follow.model";

export async function toggleFollow(followerId: string, followedId: string){
    await connectToDB();

    const followedCommunityIdObject = await Community.findOne(
        { id: followedId },
        { _id: 1 }
      );

    const followerCommunityIdObject = await Community.findOne(
        { id: followerId },
        { _id: 1 }
      );

    const followRecord = await Follow.findOne({
        'user.userId': followerId,
        $or: [
            { 'followed.followedId': followedCommunityIdObject ? followedCommunityIdObject._id : followedId },
            { 'followers.followerId': followerCommunityIdObject ? followerCommunityIdObject._id : followerId }
        ]
    });

    if (followRecord) {
        // Usuń rekord obserwowania
        await Follow.findByIdAndRemove(followRecord._id);
    } else {
        // Utwórz rekord obserwowania
        await Follow.create({
            user: { userId: followerId, onModel: 'User' },
            followed: [{
                followedId: followedCommunityIdObject ? followedCommunityIdObject._id : followedId,
                onModel: followedCommunityIdObject ? 'Community' : 'User'
            }]
        });
    }
}