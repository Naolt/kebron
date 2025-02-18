"use client";
import React, { useEffect, useState } from "react";
import { AddSermonForm } from "./_components/add-sermon-form";
import { SermonsList } from "./_components/sermons-list";
import { SermonResponse } from "@/types";
import { Sermon } from "@/models/sermon";
import { Button } from "@/components/ui/button";

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const itemsPerPage = 8;

  const fetchSermons = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const response = await fetch(
        `/api/sermons?page=${nextPage}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sermons");
      }
      setPage(nextPage);
      const data: SermonResponse = await response.json();
      console.log(data);
      setSermons((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sermons Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddSermonForm onSuccess={fetchSermons} />
        <SermonsList
          sermons={sermons}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchSermons}
          itemsPerPage={itemsPerPage}
          setSermons={setSermons}
        />
      </div>
      {hasMore && !isLoading && (
        <div className="w-full flex items-center justify-center py-4">
          <Button
            variant={"outline"}
            onClick={fetchSermons}
            className="mx-auto"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
