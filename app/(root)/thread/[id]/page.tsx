import ThreadCard from "@/components/cards/ThreadCard";
import ThreadCardClient from "@/components/cards/ThreadCardClient";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { LikesProvider } from "@/lib/context/LikesProvider";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;

  const userInfo = await fetchThreadById(params.id);
  return {
    title: `${userInfo?.author?.name} post on Thrinks`,
    description: `${userInfo?.text}`,
  };
};

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id)
    return (
      <p className="text-light-1">
        Something went wrong. Please Sign in and reload the page.
      </p>
    );

  const user = await currentUser();
  if (!user)
    return (
      <p className="text-light-1">
        To view this post, please log in to your account. If you don't have an
        account yet, you can sign up for free.
      </p>
    );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <LikesProvider>
      <div className="max-sm:mt-5">
        <ThreadCardClient
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          likesCount={thread?.likesCount}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-7">
        {/* {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            likesCount={childItem.likesCount}
            isComment
          />
        ))} */}
      </div>
      </LikesProvider>
    </section>
  );
};

export default Page;
