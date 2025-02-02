import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { AddImageForm } from "./_components/add-image-form";

type GalleryItemType = {
  id: string;
  alt: string;
  image: string;
};

const galleryItems: GalleryItemType[] = [
  {
    id: "1",
    alt: "Gallery Item 1",
    image: "https://picsum.photos/1920/1080?random=1",
  },

  {
    id: "2",
    alt: "Gallery Item 2",
    image: "https://picsum.photos/1920/1080?random=2",
  },
  {
    id: "3",
    alt: "Gallery Item 3",
    image: "https://picsum.photos/1920/1080?random=3",
  },
  {
    id: "4",
    alt: "Gallery Item 4",
    image: "https://picsum.photos/1920/1080?random=4",
  },
  {
    id: "5",
    alt: "Gallery Item 5",
    image: "https://picsum.photos/1920/1080?random=5",
  },
  {
    id: "6",
    alt: "Gallery Item 6",
    image: "https://picsum.photos/1920/1080?random=6",
  },
  {
    id: "7",
    alt: "Gallery Item 7",
    image: "https://picsum.photos/1920/1080?random=7",
  },
];

function GalleryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddImageForm />
        {/* Gallery Items */}
        {galleryItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItemType }) {
  return (
    <div className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all">
      <Image
        src={item.image}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay with actions */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 text-white hover:bg-white/20 rounded-full"
          >
            <Pencil className="text-white w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 text-white hover:bg-white/20 rounded-full"
          >
            <Trash2 className="text-white w-5 h-5" />
          </Button>
        </div>

        <div className="text-white">
          <h3 className="font-medium">{item.alt}</h3>
          <p className="text-sm text-gray-300 mt-1">Click to edit details</p>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
