import React from "react";
import GalleryHero from "../../_components/Gallery/gallery-hero";
import PhotoGallery from "../../_components/Gallery/photo-gallery";

async function getGalleryItems() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/gallery`,
    {
      next: {
        tags: ["gallery"],
        revalidate: 60, // Cache for 60 seconds
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch gallery items");
  }

  return response.json();
}

export default async function PublicGalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <div className="w-full">
      <GalleryHero />
      <PhotoGallery galleryItems={galleryItems} />
    </div>
  );
}
