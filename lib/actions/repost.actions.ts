"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import Repost from "../models/repost.model";

interface RepostParams {
    originalThreadId: string,
    repostedBy: string,
  }
  
  export async function createRepost({ originalThreadId, repostedBy }: RepostParams) {
    try {
      connectToDB();
  
      const repost = await Repost.create({
        originalThread: originalThreadId,
        repostedBy,
      });
  
      // Znajdź użytkownika po jego unikalnym 'id' (nie ObjectId)
      const user = await User.findOne({ id: repostedBy });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Aktualizuj listę repostów użytkownika
      user.reposts.push(repost._id);
      await user.save();
  
      return repost; // Return the created repost object
    } catch (error: any) {
      throw new Error(`Failed to create repost: ${error.message}`);
    }
  }
  

  export async function deleteRepost(orginalThreadId: string, repostedBy: string): Promise<void> {
    try {
      connectToDB();
      
      const repost = await Repost.findOne({ originalThread: orginalThreadId, repostedBy: repostedBy });
      if (!repost) {
        throw new Error("Repost not found");
      }
  
      // Delete the repost
      await Repost.findOneAndRemove({originalThread: orginalThreadId, repostedBy: repostedBy});
  
      // Znajdź użytkownika po jego unikalnym 'id'
      const user = await User.findOne({ id: repostedBy });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Update User model
      const repostIndex = user.reposts.indexOf(repost._id);
      if (repostIndex > -1) {
        user.reposts.splice(repostIndex, 1);
        await user.save();
      }
  
    } catch (error: any) {
      throw new Error(`Failed to delete repost: ${error.message}`);
    }
  }
  

  export async function fetchUserReposts(userId: string) {
    try {
      connectToDB();
  
      // Znajdź użytkownika po ID z modelu
      const user = await User.findOne({ id: userId });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Pobierz wszystkie reposty użytkownika
    //   const reposts = await Repost.find({ _id: { $in: user.reposts } }).populate('originalThread');

    const reposts = await Repost.find({ _id: { $in: user.reposts } })
    .populate({
      path: 'originalThread',
      populate: [
        {
          path: 'author',
          model: 'User', // Upewnij się, że nazwa modelu jest poprawna
          select: 'name id image' // Przykładowe pola
        },
        {
          path: "children", // Populate the children field
          populate: {
            path: "author", // Populate the author field within children
            model: 'User', // Użyj ciągu znaków 'User' zamiast zmiennej
            select: "_id name parentId image", // Select only specified fields of the author
          }
        }
      ]
    })
    .sort({ repostedAt: "desc" });
  
      return reposts; // Zwróć znalezione reposty
    } catch (error: any) {
      throw new Error(`Failed to find reposts: ${error.message}`);
    }
  }

  export async function fetchUserRepostsIds(userId: string) {
    try {
      connectToDB();
  
      const user = await User.findOne({ id: userId });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const reposts = await Repost.find({ _id: { $in: user.reposts } })
        .populate('originalThread', 'id');
  
      const repostIds = reposts.map(repost => repost.originalThread.id);
  
      return repostIds;
    } catch (error:any) {
      throw new Error(`Failed to find reposts: ${error.message}`);
    }
  }
  
  
  