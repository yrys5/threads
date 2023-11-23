"use client"
import React from "react";
import ThreadCard from "./ThreadCard";

const ThreadCardClient = (thread:any, user:any) => {
  return (
    <>
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id || ""}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
        likesCount={thread.likesCount}
      />
    </>
  );
};

export default ThreadCardClient;
