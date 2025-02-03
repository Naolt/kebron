"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { AddImageForm } from "./_components/add-image-form";
import { toast } from "sonner";
type GalleryItemType = {
  _id: string;
  title: string;
  alt: string;
  image: string;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddImageForm onSuccess={fetchGalleryItems} />
        {galleryItems.map((item) => (
          <GalleryCard
            key={item._id}
            item={item}
            onDelete={fetchGalleryItems}
          />
        ))}
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onDelete,
}: {
  item: GalleryItemType;
  onDelete: () => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery`, {
        method: "DELETE",
        body: JSON.stringify({ id: item._id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete");
      }

      toast.success("Image deleted successfully");
      await onDelete();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all">
      {!imageError ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-400">Image failed to load</span>
        </div>
      )}

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
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            {!isDeleting && <Trash2 className="text-white w-5 h-5" />}
          </Button>
        </div>

        <div className="text-white">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{item.alt}</p>
        </div>
      </div>
    </div>
  );
}
