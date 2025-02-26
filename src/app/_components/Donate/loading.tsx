import { Skeleton } from "@/components/ui/skeleton";

export default function DonateLoading() {
  return (
    <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* Header */}
      <div className="flex flex-col mx-auto items-center">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-[500px] max-w-full" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col border bg-card text-card-foreground"
          >
            <Skeleton className="w-full h-[200px]" />
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
