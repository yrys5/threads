import { redirect } from "next/navigation";
import { fetchUserThreadsAndParents } from "@/lib/actions/thread.actions";
import { LikesProvider } from "@/lib/context/LikesProvider";
import RepliesCard from "../cards/RepliesCard";

interface Props {
  currentUserId: string;
  accoundId: string;
  accountType: string;
}

const RepliesTab = async ({ currentUserId, accoundId, accountType }: Props) => {
  let result: any;

  result = await fetchUserThreadsAndParents(accoundId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col sm:gap-10">
      <LikesProvider>
        {JSON.parse(JSON.stringify(result)).map((reply: any) => (
          <RepliesCard
            key={reply.parent._id + reply.thread._id}
            id={reply.parent._id}
            currentUserId={currentUserId}
            parentId={reply.parent?.parentId}
            content={reply.parent.text}
            author={{
              name: reply.parent.author.name,
              image: reply.parent.author.image,
              id: reply.parent.author.id,
            }}
            community={reply.parent.community} //todo
            createdAt={reply.parent.createdAt}
            comments={reply.parent.children}
            likesCount={reply.parent.likesCount}
            replyId={reply.thread._id}
            replyContent={reply.thread.text}
            replyAuthor={{
              name: reply.thread.author.name,
              image: reply.thread.author.image,
              id: reply.thread.author.id,
            }}
            replyCommunity={reply.thread.community} //todo
            replyCreatedAt={reply.thread.createdAt}
            replyComments={reply.thread.children}
            replyLikesCount={reply.thread.likesCount}
          />
        ))}
      </LikesProvider>
    </section>
  );
};

export default RepliesTab;
