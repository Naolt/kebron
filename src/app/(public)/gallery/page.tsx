import React from "react";
import GalleryHero from "../../_components/Gallery/gallery-hero";
import PhotoGallery from "../../_components/Gallery/photo-gallery";
import { Gallery } from "@/models/gallery";
import connectDB from "@/lib/mongodb";

const getGalleryItems = async ({ itemsPerPage }: { itemsPerPage: number }) => {
  await connectDB();
  const limit = itemsPerPage;
  const total = await Gallery.countDocuments();
  const initialItems = await Gallery.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  return {
    initialItems,
    total,
  };
};
export default async function PublicGalleryPage() {
  const itemsPerPage = 15;
  const { initialItems, total } = await getGalleryItems({ itemsPerPage });
  if (!initialItems) {
    return <div>No gallery items found</div>;
  }

  const serializedItems = initialItems.map((item) => ({
    _id: item._id.toString(), // Convert ObjectId to string
    title: item.title,
    image: item.image,
    publicId: item.publicId,
    createdAt: item.createdAt?.toISOString(), // Convert Date to string
    updatedAt: item.updatedAt?.toISOString(),
  }));

  return (
    <div className="w-full">
      <GalleryHero />
      <PhotoGallery
        initialItems={serializedItems}
        totalItems={total}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
