"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FadeInView } from "@/components/animations/motion-wrapper";
import { Gallery } from "@/models/gallery";

// Define the pattern for grid items
type GridPattern = {
  rowSpan: number;
  colSpan: number;
};

const gridPatterns: GridPattern[] = [
  { rowSpan: 2, colSpan: 1 }, // tall
  { rowSpan: 1, colSpan: 1 }, // normal
  { rowSpan: 1, colSpan: 1 }, // normal
  { rowSpan: 1, colSpan: 2 }, // wide
  { rowSpan: 1, colSpan: 1 }, // normal
  { rowSpan: 2, colSpan: 1 }, // tall
  { rowSpan: 2, colSpan: 1 }, // tall
  { rowSpan: 1, colSpan: 1 }, // normal
];

// First, let's uncomment and modify the GallerySkeleton component
function GallerySkeleton({
  currentLoaded,
  skeletons,
}: {
  currentLoaded: number;
  skeletons: number;
}) {
  return (
    <>
      {Array.from({ length: skeletons }).map((_, index) => {
        const pattern =
          gridPatterns[(index + currentLoaded) % gridPatterns.length];
        return (
          <div
            key={index}
            className="relative overflow-hidden bg-gray-400 rounded-lg border"
            style={{
              gridRow: `span ${pattern.rowSpan}`,
              gridColumn: `span ${pattern.colSpan}`,
              minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
            }}
          >
            <div className="w-full h-full animate-pulse bg-muted"></div>
          </div>
        );
      })}
    </>
  );
}

function PhotoGallery({
  initialItems,
  totalItems,
  itemsPerPage,
  currentPage,
}: {
  initialItems: Gallery[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}) {
  const [items, setItems] = useState<Gallery[]>(initialItems);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalItems > items.length);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (loading) return; // Prevent multiple calls

    try {
      setLoading(true);
      const nextPage = page + 1;

      const url = `/api/gallery?page=${nextPage}&limit=${itemsPerPage}`;
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
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <FadeInView className="flex flex-col mx-auto items-center max-w-[768px]">
        <h1 className="text-center">Photo Gallery</h1>
        <p className="text-center mt-6">
          {`Explore our collection of photos that capture the spirit of our community.`}
        </p>
      </FadeInView>

      {/* gallery section */}
      <div className="mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full border">
          {items.map((photo, index) => {
            const pattern = gridPatterns[index % gridPatterns.length];
            return (
              <div
                key={photo.publicId}
                className="group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02] ease-in-out duration-300 border "
                style={{
                  gridRow: `span ${pattern.rowSpan}`,
                  gridColumn: `span ${pattern.colSpan}`,
                  minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
                }}
              >
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-black via-transparent to-transparent bg-opacity-50 p-4 flex-col justify-end gap-2 hidden group-hover:flex ease-in-out duration-300">
                  <h4 className="text-white font-light text-ellipsis">
                    {photo.title}
                  </h4>
                </div>
                <Image
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1080,q_auto,f_auto/${photo.publicId}`}
                  alt={photo.title}
                  fill
                  className="object-cover bg-slate-400"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            );
          })}

          {loading && hasMore && (
            <GallerySkeleton
              currentLoaded={items.length}
              skeletons={itemsPerPage}
            />
          )}
        </div>

        {/* Intersection Observer target */}
        {hasMore && <div ref={loaderRef} className="h-4 w-full" />}
      </div>
    </section>
  );
}

export default PhotoGallery;
