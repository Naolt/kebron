"use client";
import { Sermon } from "@/models/sermon";
import { SermonCard } from "./sermon-card";
import { SermonCardSkeleton } from "./sermon-card-skeleton";

interface SermonsListProps {
  sermons: Sermon[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
  itemsPerPage: number;
  setSermons: React.Dispatch<React.SetStateAction<Sermon[]>>;
}

export function SermonsList({
  sermons,
  isLoading,
  error,
  onRefresh,
  itemsPerPage,
  setSermons,
}: SermonsListProps) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteFromState = async (id:string) => {
    setSermons(sermons.filter((item) => item._id != id));
    await onRefresh();
  };

  return (
    <>
      {sermons.map((sermon) => (
        <SermonCard
          key={sermon._id}
          title={sermon.title}
          embedUrl={sermon.embedUrl}
          videoUrl={sermon.videoUrl}
          id={sermon._id}
          onDelete={() => deleteFromState(sermon._id)}
          onUpdate={onRefresh}
          setSermons={setSermons}
        />
      ))}
      {isLoading &&
        Array.from({ length: itemsPerPage }).map((_, index) => (
          <SermonCardSkeleton key={index} />
        ))}
    </>
  );
}
