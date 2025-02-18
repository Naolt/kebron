"use client";
import { Livestream } from "@/models/livestream";
import { VideoCard } from "./video-card";
import { VideoCardSkeleton } from "./video-card-skeleton";

interface VideosListProps {
  videos: Livestream[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
  itemsPerPage: number;
  setVideos: React.Dispatch<React.SetStateAction<Livestream[]>>
}

export function VideosList({
  videos,
  isLoading,
  error,
  onRefresh,
  setVideos,
  itemsPerPage = 8,
}: VideosListProps) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleStateDelete = async (id: string) => {
    const newVideos = videos.filter((video) => video._id !== id);
    setVideos(newVideos);
    await onRefresh();
  }

  return (
    <>
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          onDelete={() => handleStateDelete(video._id)}
          onUpdate={onRefresh}
          setVideos={setVideos}

        />
      ))}
      {isLoading &&
        Array.from({ length: itemsPerPage }).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
    </>
  );
}
