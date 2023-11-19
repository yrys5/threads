import InfinityThreads from "@/components/shared/InfinityThreads";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thrinks",
  description: `Discover the ultimate social experience at Thrinks. Connect with friends, share your life's moments, and stay informed about the world. Join us today and be a part of the Thrinks community. It's where connections thrive!`,
};

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  const threads = await fetchPosts(1,6)

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10 max-sm:gap-0">
        <InfinityThreads
          currentUserId={user?.id || ""}
          threadsInitial={threads.posts}
        />
      </section>
    </>
  );
}

export default Home
