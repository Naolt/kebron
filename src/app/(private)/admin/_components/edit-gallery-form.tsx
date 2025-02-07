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
  isUpdating: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function EditGalleryForm({
  id,
  title,
  image,
  isUpdating,
  onSubmit,
  onCancel,
}: EditGalleryFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(image);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<EditGalleryFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
    },
  });

  const handleSubmit = async (values: EditGalleryFormValues) => {
    try {
      setUploadError(null);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", values.title);
      if (values.image) {
        formData.append("image", values.image);
      }
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setUploadError("Failed to update image");
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
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
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
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
