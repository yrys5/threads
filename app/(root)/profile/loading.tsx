export default function Loading() {
  return (
    <div className="flex w-full flex-col justify-start max-sm:px-3 max-sm:mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <div className="rounded-full object-cover shadow-2xl h-16 w-16 bg-neutral-800" />
          </div>
          <div className="flex-1">
            <div className="text-left text-heading-3-bold w-full bg-neutral-800 h-5"></div>
            <div className="w-full h-5 bg-neutral-800"></div>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-lg w-full h-5 bg-neutral-800 rounded-md"></div>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}
