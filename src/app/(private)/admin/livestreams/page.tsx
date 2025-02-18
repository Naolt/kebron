"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AddVideoForm } from "./_components/add-video-form";
import { VideosList } from "./_components/videos-list";
import { LiveStreamResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Livestream } from "@/models/livestream";


export default function VideosPage() {
  const [videos, setVideos] = useState<Livestream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const itemsPerPage = 8;

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const response = await fetch(
        `/api/livestreams?page=${nextPage}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      setPage(nextPage);
      const data: LiveStreamResponse = await response.json();
      setVideos([...videos,...data.items]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, []);

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
          itemsPerPage={itemsPerPage}
          setVideos={setVideos}
        />
      </div>
      {hasMore && !isLoading && (
        <div className="w-full flex items-center justify-center py-4">
          <Button variant={"outline"} onClick={fetchVideos} className="mx-auto">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
