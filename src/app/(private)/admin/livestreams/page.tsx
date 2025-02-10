"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AddVideoForm } from "./_components/add-video-form";
import { VideosList } from "./_components/videos-list";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/livestreams");
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Videos Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddVideoForm onSuccess={fetchVideos} />
        <VideosList
          videos={videos}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchVideos}
        />
      </div>
    </div>
  );
}
