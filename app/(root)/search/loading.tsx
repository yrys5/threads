import SearchbarLoader from "@/components/loaders/SearchbarLoader";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
      <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchbarLoader/>
      <div className="mt-14 flex flex-col gap-9">
      </div>
    </section>
    )
  }