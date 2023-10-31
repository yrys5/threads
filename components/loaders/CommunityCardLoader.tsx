import { Button } from "../ui/button";

export default function CommunityCardLoader() {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative h-12 w-12">
          <div className="animate-pulse rounded-full bg-neutral-800 h-12 w-12 object-cover" />
        </div>

        <div>
          <div className="w-full bg-neutral-800"></div>
          <div className="w-full h-5 mt-1 bg-neutral-800" />
        </div>
      </div>

      <div className="animate-pulse mt-4 w-full h-5 bg-neutral-800 rounded-md" />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Button size="sm" disabled className="community-card_btn"></Button>
        </div>

        <div className="flex items-center">
          <div className={`animate-pulse -ml-2 h-5 w-5 rounded-full object-cover bg-neutral-800`} />
          <div className={`animate-pulse -ml-2 h-5 w-5 rounded-full object-cover bg-neutral-800`} />
        </div>
      </div>
    </article>
  );
}
