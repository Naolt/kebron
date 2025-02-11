"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Gallery } from "@/models/gallery";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

//function GallerySkeleton() {
//  return (
//    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-20">
//      {gridPatterns.map((pattern, index) => (
//        <div
//          key={index}
//          className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse"
//          style={{
//            gridRow: `span ${pattern.rowSpan}`,
//            gridColumn: `span ${pattern.colSpan}`,
//            minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
//          }}
//        />
//      ))}
//    </div>
//  );
//}

function PhotoGallery({
  initialItems,
  totalItems,
  itemsPerPage,
}: {
  initialItems: Gallery[];
  totalItems: number;
  itemsPerPage: number;
}) {
  const [items, setItems] = useState<Gallery[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalItems > items.length);

  const loadMore = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await fetch(
        `/api/gallery?page=${nextPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();

      console.log("data", data);
      setItems((prev) => [...prev, ...data.items]);
      setPage(nextPage);
      setHasMore(data.items.length === itemsPerPage);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-20">
        {items.map((photo, index) => {
          const pattern = gridPatterns[index % gridPatterns.length];

          return (
            <StaggerItem
              key={photo.publicId}
              className="relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02] ease-in-out duration-300"
              style={{
                gridRow: `span ${pattern.rowSpan}`,
                gridColumn: `span ${pattern.colSpan}`,
                minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
              }}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
