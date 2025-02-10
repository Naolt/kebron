"use client";
import { SermonCard } from "./sermon-card";
import { SermonCardSkeleton } from "./sermon-card-skeleton";

interface Sermon {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
}

interface SermonsListProps {
  sermons: Sermon[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export function SermonsList({
  sermons,
  isLoading,
  error,
  onRefresh,
}: SermonsListProps) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <SermonCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {sermons.map((sermon) => (
        <SermonCard
          key={sermon._id}
          title={sermon.title}
          embedUrl={sermon.embedUrl}
          videoUrl={sermon.videoUrl}
          id={sermon._id}
          onDelete={onRefresh}
          onUpdate={onRefresh}
        />
      ))}
    </>
  );
}
