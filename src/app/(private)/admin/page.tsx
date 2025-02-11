"use client";
import { useEffect, useState } from "react";
import { AddImageForm } from "./_components/add-image-form";
import { GallerySkeleton } from "./_components/gallery-skeleton";
import { GalleryCard } from "./_components/gallery-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BulkUploadDialog } from "./_components/bulk-upload-dialog";
import { Loader2 } from "lucide-react";

type GalleryItemType = {
  _id: string;
  title: string;
  alt: string;
  image: string;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryItemType[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // when the user clicks on a card, add it to the selected array, if it is already in the array, remove it
  const toggleSelection = (item: GalleryItemType) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i._id !== item._id)
        : [...prev, item]
    );
  };

  const selectAll = () => {
    setSelected(galleryItems);
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch(
        `/api/gallery?page=${currentPage}&limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }

      const data = await response.json();
      setGalleryItems(data.items);
      setHasMore(data.items.length === itemsPerPage);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = async () => {
    if (!hasMore) return;
    try {
      setIsLoadingMore(true);
      const response = await fetch(
        `/api/gallery?page=${currentPage + 1}&limit=${itemsPerPage}`
      );

      const data = await response.json();
      setGalleryItems((prev) => [...prev, ...data.items]);
      setCurrentPage(currentPage + 1);
      setHasMore(data.items.length === itemsPerPage);

      if (!response.ok) {
        throw new Error("Failed to fetch more gallery items");
      }
    } catch (error) {
      console.error("Error fetching more gallery items:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery/bulk-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selected.map((item) => item._id) }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete images");
      }

      toast.success("Selected images deleted successfully");
      setSelected([]);
      await fetchGalleryItems();
    } catch (error) {
      console.error("Error deleting images:", error);
      toast.error("Failed to delete images");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
        <div className="flex gap-2 flex-wrap">
          {selected.length > 0 ? (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete {selected.length} Images
              </Button>
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                Deselect All
              </Button>
            </>
          ) : (
            <BulkUploadDialog onSuccess={fetchGalleryItems} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddImageForm onSuccess={fetchGalleryItems} />
        {loading ? (
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
              isSelected={selected.includes(item)}
              onSelect={() => toggleSelection(item)}
            />
          ))
        )}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={loadMoreItems}
            disabled={loading || isLoadingMore}
            variant={"outline"}
            size={"sm"}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
      {/* delete dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete {selected.length}{" "}
              {selected.length === 1 ? "image" : "images"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete {selected.length}{" "}
            {selected.length === 1 ? "image" : "images"}?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
