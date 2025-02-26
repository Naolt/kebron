import { Skeleton } from "@/components/ui/skeleton";

export default function FooterLoading() {
  return (
    <footer className="px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 bg-[rgba(240,242,251,1)]">
      <div className="max-w-screen-3xl mx-auto flex flex-wrap justify-between gap-6">
        {/* left */}
        <div className="flex flex-col gap-6">
          <Skeleton className="w-[100px] h-[100px] mb-2" />

          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>

          {/* social links */}
          <div className="flex gap-3 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-6 h-6" />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col-reverse">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-24 py-2" />
            ))}
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-24 py-2" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="mt-20 mb-8 h-[1px] w-full" />
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </footer>
  );
}
