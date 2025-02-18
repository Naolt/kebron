
// sermon list
"use client";

import { useEffect, useRef, useState } from "react";
import { Sermon } from "@/models/sermon";

export default function SermonList({
  initialItems,
  totalItems,
  itemsPerPage,
  currentPage,
}: {
  initialItems: Sermon[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}) {
  const [items, setItems] = useState<Sermon[]>(initialItems);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalItems > items.length);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (loading) return; // Prevent multiple calls

    try {
      setLoading(true);
      const nextPage = page + 1;

      const url = `/api/sermons?page=${nextPage}&limit=${itemsPerPage}`;
      const response = await fetch(url);
      const data = await response.json();

      setItems((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);
      setHasMore(data.items.length === itemsPerPage);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, loading]); // Re-run effect when hasMore or loading changes

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
        {items.map((sermon, index) => (
          <div
            className="flex flex-col col-auto mx-auto border-2 w-full"
            key={index}
          >
            {/* Video Player */}

            <div className="aspect-video ">
              <iframe
                src={sermon.embedUrl}
                className="w-full h-full "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}

        {loading && hasMore && <SermonSkeleton skeletons={itemsPerPage} />}
      </div>
      {/* Intersection Observer target */}
      {hasMore && <div ref={loaderRef} className="h-4 w-full" />}
    </>
  );
}

function SermonSkeleton({ skeletons }: { skeletons: number }) {
  return (
    <>
      {Array.from({ length: skeletons }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col col-auto mx-auto border-2 w-full aspect-video"
        >
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>
      ))}
    </>
  );
}
