import CommunityCardLoader from "@/components/loaders/CommunityCardLoader";
import SearchbarLoader from "@/components/loaders/SearchbarLoader";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
      <section className="max-sm:px-5">
      <h1 className="head-text mb-10">Search</h1>
      <SearchbarLoader/>
      <div className="mt-14 flex flex-wrap gap-9">
      <CommunityCardLoader/>
      <CommunityCardLoader/>
      <CommunityCardLoader/>
      <CommunityCardLoader/>
      </div>
      </section>
    )
  }