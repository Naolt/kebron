import React from "react";
import GalleryHero from "../../_components/Gallery/gallery-hero";
import PhotoGallery from "../../_components/Gallery/photo-gallery";
import { getGallery } from "@/actions/action";
import { Gallery } from "@/models/gallery";

export default async function PublicGalleryPage() {
  const galleryItems: Gallery[] | null = await getGallery();

  if (!galleryItems) {
    return <div>No gallery items found</div>;
  }

  return (
    <div className="w-full">
      <GalleryHero />
      <PhotoGallery galleryItems={galleryItems} />
    </div>
  );
}
