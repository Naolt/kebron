"use client";
import { VideoCard } from "./video-card";
import { VideoCardSkeleton } from "./video-card-skeleton";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
}

interface VideosListProps {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export function VideosList({
  videos,
  isLoading,
  error,
  onRefresh,
}: VideosListProps) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          title={video.title}
          embedUrl={video.embedUrl}
          videoUrl={video.videoUrl}
          id={video._id}
          onDelete={onRefresh}
          onUpdate={onRefresh}
        />
      ))}
    </>
  );
}
