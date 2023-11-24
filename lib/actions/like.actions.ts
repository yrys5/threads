"use server";

import { connectToDB } from "../mongoose";

import Like from "../models/like.model";
import Thread from "../models/thread.model";
import mongoose from "mongoose";

interface Params {
    threadId: string,
    userId: string
  }

export async function addLike({ threadId, userId }: Params
) {
  try {
    connectToDB();

    await Like.create({
      threadId,
      userId,
    });

    // Update Thread model
    await Thread.findByIdAndUpdate(threadId, {
        $inc: { likesCount: 1 },
      });
  

  } catch (error: any) {
    throw new Error(`Failed to add like: ${error.message}`);
  }
}

export async function deleteLike({ threadId, userId }: Params
    ) {
      try {
        connectToDB();
    
        const like = await Like.findOneAndDelete({
            threadId,
            userId,
          });
      
          if (like) {
            // Jeśli dokument został znaleziony i usunięty, zaktualizuj licznik polubień
            await Thread.findByIdAndUpdate(threadId, {
              $inc: { likesCount: -1 },
            });
          }
    
      } catch (error: any) {
        throw new Error(`Failed to add like: ${error.message}`);
      }
    }

interface CheckLikeParams {
    threadId: string,
    userId: string
  }
  
  export async function hasUserLikedPost({ threadId, userId }: CheckLikeParams): Promise<boolean> {
    try {
      connectToDB();
  
      const like = await Like.findOne({
        threadId,
        userId,
      });
  
      return !!like; // Zwraca 'true' jeśli znaleziono dokument, 'false' w przeciwnym wypadku
  
    } catch (error: any) {
      throw new Error(`Error checking like: ${error.message}`);
    }
  }

  interface UserLikesParams {
    userId: string;
  }

// export async function getUserLikes({ userId }: UserLikesParams): Promise<any> {
export async function getUserLikes({ userId }: UserLikesParams): Promise<mongoose.Types.ObjectId[]> {
    try {
      connectToDB();
  
      const userLikes = await Like.find({ userId }).select('threadId');
  
      return userLikes.map(like => like?.threadId.toString());
    //   return userLikes.map(like => like.threadId);
    } catch (error: any) {
      throw new Error(`Failed to retrieve likes: ${error.message}`);
    }
  }