"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { addLike, deleteLike, getUserLikes } from "../actions/like.actions";
import { useUser } from "@clerk/nextjs";
import {
  createRepost,
  deleteRepost,
  fetchUserReposts,
} from "../actions/repost.actions";

interface LikesProviderProps {
  children: ReactNode;
}

const LikesContext = createContext({
  likedPosts: [] as string[],
  repostedPosts: [] as string[],
  toggleLike: async (threadId: string) => {},
  toggleRepost: async (threadId: string) => {},
});

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [repostedPosts, setRepostedPosts] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchLikes = async () => {
      if (user?.id) {
        try {
          const response = await getUserLikes({ userId: user.id });
          setLikedPosts(JSON.parse(JSON.stringify(response)));
        } catch (error) {
          console.error("Error fetching likes:", error);
        }
      }
    };

    //TODO: Fix fetchUserReposts
    const fetchReposts = async () => {
      if (user?.id) {
        try {
          const responseReposts = await fetchUserReposts(user.id);
          setRepostedPosts(JSON.parse(JSON.stringify(responseReposts)));
        } catch (error) {
          console.error("Error fetching reposts:", error);
        }
      }
    };

    fetchLikes();
    fetchReposts();
  }, [user?.id]);

  const toggleLike = async (threadId: string) => {
    if (user && user.id) {
      if (likedPosts.includes(threadId)) {
        await deleteLike({ threadId, userId: user.id });
        setLikedPosts(likedPosts.filter((id) => id !== threadId));
      } else {
        await addLike({ threadId, userId: user.id });
        setLikedPosts([...likedPosts, threadId]);
      }
    }
  };

  const toggleRepost = async (threadId: string) => {
    if (user && user.id) {
      if (repostedPosts.includes(threadId)) {
        console.log("delete repost")
        await deleteRepost(threadId, user.id);
        setRepostedPosts(repostedPosts.filter((id) => id !== threadId));
      } else {
        console.log("add repost")
        await createRepost({ originalThreadId: threadId, repostedBy: user.id });
        setRepostedPosts([...repostedPosts, threadId]);
      }
    }
  };

  return (
    <LikesContext.Provider
      value={{ likedPosts, repostedPosts, toggleLike, toggleRepost }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  return useContext(LikesContext);
};
