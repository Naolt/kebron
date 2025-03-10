"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditGalleryForm } from "./edit-gallery-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Gallery } from "@/models/gallery";

interface GalleryCardProps {
  item: Gallery;
  onDelete: () => Promise<void>;
  onUpdate: () => Promise<void>;
  isSelected: boolean;
  onSelect: () => void;
}

export function GalleryCard({
  item,
  onDelete,
  onUpdate,
  isSelected,
  onSelect,
}: GalleryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery`, {
        method: "DELETE",
        body: JSON.stringify({ id: item._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      toast.success("Image deleted successfully");
      setShowDeleteDialog(false);
      await onDelete();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (body: {
    id: string;
    title: string;
    imageUrl?: string;
    publicId?: string;
  }) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/gallery/${item._id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update image");
      }

      toast.success("Image updated successfully");
      setShowEditDialog(false);
      await onUpdate();
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image");
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all",
          isSelected ? "ring-2 ring-primary ring-offset-2" : ""
        )}
        onClick={() => onSelect()}
      >
        {!imageError ? (
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1080,q_auto,f_auto/${item.publicId}`}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Image failed to load</span>
          </div>
        )}

        {/* Selection overlay - always visible */}
        {isSelected && (
          <div className="absolute top-2 left-2 z-20">
            <Checkbox
              id={item._id}
              checked={isSelected}
              onCheckedChange={onSelect}
              className="h-5 w-5 border-2 bg-white data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:bg-white/90"
            />
          </div>
        )}

        {/* Actions overlay - visible on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditDialog(true);
              }}
            >
              <Pencil className="text-white w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
            >
              <Trash2 className="text-white w-5 h-5" />
            </Button>
          </div>

          <div className="text-white">
            <h3 className="font-medium">{item.title}</h3>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{item.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Make changes to the image details below.
            </DialogDescription>
          </DialogHeader>
          <EditGalleryForm
            id={item._id}
            publicId={item.publicId}
            title={item.title}
            image={item.image}
            isUpdating={isUpdating}
            onSubmit={handleUpdate}
            onCancel={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
