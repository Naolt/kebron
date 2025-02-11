"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { BulkUploadForm } from "./bulk-upload-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface BulkUploadDialogProps {
  onSuccess: () => Promise<void>;
}

export function BulkUploadDialog({ onSuccess }: BulkUploadDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Bulk Upload Images</DialogTitle>
            <DialogDescription>
              Upload multiple images at once. Images will be titled based on
              their filenames.
            </DialogDescription>
          </DialogHeader>
          <BulkUploadForm onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Bulk Upload
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bulk Upload Images</DrawerTitle>
          <DrawerDescription>
            Upload multiple images at once. Images will be titled based on their
            filenames.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <BulkUploadForm onSuccess={onSuccess} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
