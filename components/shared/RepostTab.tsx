import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { LikesProvider } from "@/lib/context/LikesProvider";
import { fetchUserReposts } from "@/lib/actions/repost.actions";

interface Props {
  currentUserId: string;
  accoundId: string;
  accountType: string;
}

const RepostTab = async ({ currentUserId, accoundId, accountType }: Props) => {
  let result: any;

  result = await fetchUserReposts(accoundId);

  if (!result) redirect("/");

  console.log(result)
  return (
    <section className="mt-9 flex flex-col sm:gap-10">
      <LikesProvider>
      {JSON.parse(JSON.stringify(result)).map((thread: any) => (
          <ThreadCard
          key={thread.originalThread._id}
          id={thread.originalThread._id}
          currentUserId={currentUserId}
          parentId={thread.originalThread.parentId}
          content={thread.originalThread.text}
          author={
              accountType === "User"
              ? { name: thread.originalThread.author.name, image: thread.originalThread.author.image, id: thread.originalThread.author.id }
              : {
                  name: thread.originalThread.author.name,
                  image: thread.originalThread.author.image,
                  id: thread.originalThread.author.id,
                }
            }
            community={thread.originalThread.community} //todo
            createdAt={thread.originalThread.createdAt}
            comments={thread.originalThread.children}
            likesCount={thread.originalThread.likesCount}
            />
          ))}
          </LikesProvider>
    </section>
  );
};

export default RepostTab;
