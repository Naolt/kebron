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

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
};

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

function PhotoGallery({ galleryItems }: { galleryItems: GalleryItem[] }) {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[768px]">
        <h1 className="text-center">Photo Gallery</h1>
        <p className="text-center mt-6">
          {`Explore our collection of photos that capture the spirit of our community.`}
        </p>
      </div>
      {/* gallery section */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-20">
        {galleryItems.map((photo, index) => {
          const pattern = gridPatterns[index % gridPatterns.length];

          return (
            <div
              key={photo._id}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PhotoGallery;
