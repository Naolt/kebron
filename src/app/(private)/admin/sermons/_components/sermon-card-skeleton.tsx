export function SermonCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden bg-white border shadow-sm">
      {/* Video Player Skeleton */}
      <div className="aspect-video bg-gray-200 animate-pulse" />

      {/* Title and Actions Bar Skeleton */}
      <div className="p-4 flex items-center justify-between border-t">
        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
        <div className="flex gap-2 ml-4">
          <div className="w-9 h-9 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-9 h-9 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
