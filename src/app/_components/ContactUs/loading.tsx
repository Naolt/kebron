import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* header */}
      <div className="flex flex-col">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-[500px] max-w-full" />
      </div>

      {/* contact detail and map container */}
      <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* contact details */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>

        {/* map */}
        <Skeleton className="w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-0" />
      </div>
    </section>
  );
}
