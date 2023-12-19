import { redirect } from "next/navigation";
import { fetchUserThreadsAndParents } from "@/lib/actions/thread.actions";

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
      {/* TODO: RepliesCard.tsx */}
    </section>
  );
};

export default RepliesTab;
