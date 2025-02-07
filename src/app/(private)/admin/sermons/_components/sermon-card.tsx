"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditSermonForm, EditSermonFormValues } from "./edit-sermon-form";

interface SermonCardProps {
  id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
  onDelete: () => Promise<void>;
  onUpdate: () => Promise<void>;
}

export function SermonCard({
  id,
  title,
  videoUrl,
  embedUrl,
  onDelete,
  onUpdate,
}: SermonCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/sermons`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete");
      }

      toast.success("Sermon deleted successfully");
      setShowDeleteDialog(false);
      await onDelete();
    } catch (error) {
      console.error("Error deleting sermon:", error);
      toast.error("Failed to delete sermon");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (data: EditSermonFormValues) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/sermons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update sermon");
      }

      toast.success("Sermon updated successfully");
      setShowEditDialog(false);
      await onUpdate();
    } catch (error) {
      console.error("Error updating sermon:", error);
      toast.error("Failed to update sermon");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden bg-white border shadow-sm hover:border-gray-300 transition-all">
        {/* Video Player */}
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Title and Actions Bar */}
        <div className="p-4 flex items-center justify-between border-t">
          <h3 className="text-lg font-medium text-gray-900 flex-1">
            {title || "Untitled Sermon"}
          </h3>
          <div className="flex gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => setShowEditDialog(true)}
            >
              <Pencil className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sermon</DialogTitle>
            <DialogDescription>
              Make changes to the sermon details below.
            </DialogDescription>
          </DialogHeader>
          <EditSermonForm
            title={title}
            videoUrl={videoUrl}
            isUpdating={isUpdating}
            onSubmit={handleUpdate}
            onCancel={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sermon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              {title ? `"${title}"` : "this sermon"}? This action cannot be
              undone.
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
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
