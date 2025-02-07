"use client";
import { useEffect, useState } from "react";
import { AddImageForm } from "./_components/add-image-form";
import { GallerySkeleton } from "./_components/gallery-skeleton";
import { GalleryCard } from "./_components/gallery-card";

type GalleryItemType = {
  _id: string;
  title: string;
  alt: string;
  image: string;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery", {
        next: {
          tags: ["gallery"],
          revalidate: 0, // Opt out of caching for admin page
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }

      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddImageForm onSuccess={fetchGalleryItems} />
        {loading ? (
          // Show 8 skeleton cards while loading
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <GallerySkeleton key={index} />
            ))}
          </>
        ) : (
          galleryItems?.map((item) => (
            <GalleryCard
              key={item._id}
              item={item}
              onDelete={fetchGalleryItems}
              onUpdate={fetchGalleryItems}
            />
          ))
        )}
      </div>
    </div>
  );
}
