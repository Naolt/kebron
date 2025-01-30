"use client";

import React from "react";
import Image from "next/image";

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

type PhotoItem = {
  id: number;
  src: string;
  alt: string;
};

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-20">
      {gridPatterns.map((pattern, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse"
          style={{
            gridRow: `span ${pattern.rowSpan}`,
            gridColumn: `span ${pattern.colSpan}`,
            minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
          }}
        />
      ))}
    </div>
  );
}

function PhotoGallery() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [photos, setPhotos] = React.useState<PhotoItem[]>([]);

  React.useEffect(() => {
    // Simulate loading delay
    const loadPhotos = async () => {
      try {
        // Your actual photo loading logic here
        const photoData = [
          {
            id: 1,
            src: "https://picsum.photos/800/600?random=1",
            alt: "Gallery Image 1",
          },
          {
            id: 2,
            src: "https://picsum.photos/800/600?random=2",
            alt: "Gallery Image 2",
          },
          {
            id: 3,
            src: "https://picsum.photos/800/600?random=3",
            alt: "Gallery Image 3",
          },
          {
            id: 4,
            src: "https://picsum.photos/800/600?random=4",
            alt: "Gallery Image 4",
          },
          {
            id: 5,
            src: "https://picsum.photos/800/600?random=5",
            alt: "Gallery Image 5",
          },
          {
            id: 6,
            src: "https://picsum.photos/800/600?random=6",
            alt: "Gallery Image 6",
          },
          {
            id: 7,
            src: "https://picsum.photos/800/600?random=7",
            alt: "Gallery Image 7",
          },
          {
            id: 8,
            src: "https://picsum.photos/800/600?random=8",
            alt: "Gallery Image 8",
          },
          {
            id: 9,
            src: "https://picsum.photos/800/600?random=9",
            alt: "Gallery Image 9",
          },
        ];
        setPhotos(photoData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[768px]">
        <h1 className="text-center">Photo Gallery</h1>
        <p className="text-center mt-6">
          {`Explore our collection of photos that capture the spirit of our community.`}
        </p>
      </div>
      {/* gallery section */}
      {isLoading ? (
        <GallerySkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-20">
          {photos.map((photo, index) => {
            const pattern = gridPatterns[index % gridPatterns.length];

            return (
              <div
                key={photo.id}
                className="relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02] ease-in-out duration-300"
                style={{
                  gridRow: `span ${pattern.rowSpan}`,
                  gridColumn: `span ${pattern.colSpan}`,
                  minHeight: pattern.rowSpan === 2 ? "500px" : "250px",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
