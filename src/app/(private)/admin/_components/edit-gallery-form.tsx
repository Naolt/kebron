"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const editFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png and .webp formats are supported"
    ),
});

export type EditGalleryFormValues = z.infer<typeof editFormSchema>;

interface EditGalleryFormProps {
  id: string;
  title: string;
  image: string;
  publicId: string;
  isUpdating: boolean;
  onSubmit: (data: {
    id: string;
    title: string;
    imageUrl?: string;
    publicId?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export function EditGalleryForm({
  id,
  title,
  //image,
  publicId,
  isUpdating,
  onSubmit,
  onCancel,
}: EditGalleryFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1080,q_auto,f_auto/${publicId}`
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditGalleryFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
    },
  });

  const handleSubmit = async (values: EditGalleryFormValues) => {
    try {
      setIsLoading(true);
      setUploadError(null);

      let imageUrl = undefined;
      let publicId = undefined;

      // Only upload to Cloudinary if a new image is provided
      if (values.image) {
        const cloudinaryResponse = await uploadToCloudinary(
          values.image,
          "gallery"
        );
        imageUrl = cloudinaryResponse.url;
        publicId = cloudinaryResponse.publicId;
      }

      // Send data to API
      await onSubmit({
        id,
        title: values.title,
        ...(imageUrl && { imageUrl, publicId }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setUploadError(
        error instanceof Error ? error.message : "Failed to update image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Image title" {...field} />
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
              <FormLabel>New Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Preview */}
        {previewUrl && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}

        {uploadError && (
          <div className="text-red-500 text-sm">{uploadError}</div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating} isLoading={isLoading}>
            {isUpdating ? "Updating..." : "Update Image"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
