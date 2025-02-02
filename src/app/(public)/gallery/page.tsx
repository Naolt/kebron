import React from "react";
import GalleryHero from "../../_components/Gallery/gallery-hero";
import PhotoGallery from "../../_components/Gallery/photo-gallery";

const GalleryPage = () => {
  return (
    <div className="w-full">
      <GalleryHero />
      <PhotoGallery />
    </div>
  );
};

export default GalleryPage;
