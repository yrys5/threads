"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { addLike, deleteLike, getUserLikes } from "../actions/like.actions";
import { useUser } from "@clerk/nextjs";

interface LikesProviderProps {
  children: ReactNode;
}

const LikesContext = createContext({
  likedPosts: [] as string[],
  toggleLike: async (threadId: string) => {},
});

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
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

    fetchLikes();
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

  return (
    <LikesContext.Provider value={{ likedPosts, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  return useContext(LikesContext);
};
