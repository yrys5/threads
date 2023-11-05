import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Thrinks',
  description: `Discover the ultimate social experience at Thrinks. Connect with friends, share your life's moments, and stay informed about the world. Join us today and be a part of the Thrinks community. It's where connections thrive!`
}


export default async function Home() {
  const result = await fetchPosts(1, 30);
  // const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-results">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                // currentUserId={user?.id || ""}
                currentUserId={""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
