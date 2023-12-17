import ThreadCardLoader from "@/components/loaders/ThreadCardLoader";

export default function Loading() {
  // Or a custom loading skeleton component
  // return <p className="flex flex-col w-full text-light-2">Loading...</p>
  return (
    <section className="relative">
      <div className="max-sm:mt-5">
        <ThreadCardLoader />
      </div>
    </section>
  );
}
