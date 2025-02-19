"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png and .webp formats are supported"
    ),
});

type FormValues = z.infer<typeof formSchema>;

const AddImageTriggerButton = (
  <button className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
    <Plus className="w-8 h-8 text-gray-400" />

    <span className="mt-2 text-sm text-gray-500">Add New Image</span>
  </button>
);

function FormContent({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      setUploadError(null);

      // Upload to Cloudinary first
      const cloudinaryResponse = await uploadToCloudinary(
        data.image,
        "gallery"
      );

      // Then send data to our API
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          imageUrl: cloudinaryResponse.url,
          publicId: cloudinaryResponse.publicId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload");
      }

      toast.success("Image uploaded successfully");
      form.reset();

      onSuccess();
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Image title (will also be used as description)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {uploadError && (
          <div className="text-red-500 text-sm">{uploadError}</div>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLoading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </Form>
  );
}

export function AddImageForm({ onSuccess }: { onSuccess: () => void }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{AddImageTriggerButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
            <DialogDescription>
              Upload a new image to the gallery
            </DialogDescription>
          </DialogHeader>
          <FormContent onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{AddImageTriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Image</DrawerTitle>
          <DrawerDescription>
            Upload a new image to the gallery
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <FormContent onSuccess={onSuccess} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
