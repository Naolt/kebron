import { Gallery } from "@/models/gallery";
import GalleryHero from "../../_components/Gallery/gallery-hero";
import PhotoGallery from "../../_components/Gallery/photo-gallery";
import { getGalleryServer } from "@/actions/action";
import { Metadata } from "next";

// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Church Gallery",
  openGraph: {
    title: "Church Gallery",
    description: "Church Gallery",
    images: [{ url: "/home/hero5.JPG" }],
  },
};

export type GalleryResponse = {
  items: Gallery[];
  total: number;
  currentPage: number;
  hasMore: boolean;
};

export default async function PublicGalleryPage() {
  const response: GalleryResponse = await getGalleryServer({
    page: 1,
    limit: 8,
  });

  return (
    <div className="w-full">
      <GalleryHero />
      <PhotoGallery
        currentPage={response.currentPage}
        initialItems={response.items}
        totalItems={response.total}
        itemsPerPage={8}
      />
    </div>
  );
}
