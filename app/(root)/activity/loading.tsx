import ActivityCardLoader from "@/components/loaders/ActivityCardLoader";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
      <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
      <>
      <ActivityCardLoader/>
      <ActivityCardLoader/>
      <ActivityCardLoader/>
      <ActivityCardLoader/>
      </>
      </section>
    </section>
    )
  }