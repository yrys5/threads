import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { LikesProvider } from "@/lib/context/LikesProvider";

interface Props {
  currentUserId: string;
  accoundId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accoundId, accountType }: Props) => {
  let result: any;

  result =
    accountType === "Community"
      ? await fetchCommunityPosts(accoundId)
      : await fetchUserPosts(accoundId);

  if (!result) redirect("/");
  return (
    <section className="mt-9 flex flex-col sm:gap-10">
      <LikesProvider>
      {JSON.parse(JSON.stringify(result.threads)).map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread.community} //todo
            createdAt={thread.createdAt}
            comments={thread.children}
            likesCount={thread.likesCount}
          />
          ))}
          </LikesProvider>
    </section>
  );
};

export default ThreadsTab;
