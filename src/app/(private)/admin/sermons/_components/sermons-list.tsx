"use client";
import { useEffect, useState } from "react";
import { SermonCard } from "./sermon-card";
import { SermonCardSkeleton } from "./sermon-card-skeleton";

interface Sermon {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
}

export function SermonsList() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSermons = async () => {
    try {
      const response = await fetch("/api/sermons");
      if (!response.ok) {
        throw new Error("Failed to fetch sermons");
      }
      const data = await response.json();
      setSermons(data);
    } catch (error) {
      console.error("Error fetching sermons:", error);
      setError("Failed to load sermons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

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
          onDelete={fetchSermons}
          onUpdate={fetchSermons}
        />
      ))}
    </>
  );
}
