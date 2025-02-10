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
import { getVideoInfo } from "@/lib/video-utils";

const editFormSchema = z.object({
  title: z.string().optional(),
  videoUrl: z
    .string()
    .url("Must be a valid URL")
    .refine(
      (url) =>
        url.includes("youtube.com") ||
        url.includes("youtu.be") ||
        url.includes("facebook.com") ||
        url.includes("fb.watch"),
      "Must be a YouTube or Facebook video URL"
    ),
});

export type EditVideoFormValues = z.infer<typeof editFormSchema>;

interface EditVideoFormProps {
  title: string;
  videoUrl: string;
  isUpdating: boolean;
  onSubmit: (data: EditVideoFormValues) => Promise<void>;
  onCancel: () => void;
  onSuccess?: () => Promise<void>;
}

export function EditVideoForm({
  title,
  videoUrl,
  isUpdating,
  onSubmit,
  onCancel,
  onSuccess,
}: EditVideoFormProps) {
  const [previewUrl, setPreviewUrl] = useState(() => {
    try {
      return getVideoInfo(videoUrl).embedUrl;
    } catch {
      return null;
    }
  });

  const form = useForm<EditVideoFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
      videoUrl,
    },
  });

  const handleVideoUrlChange = (url: string) => {
    try {
      const videoInfo = getVideoInfo(url);
      setPreviewUrl(videoInfo.embedUrl);
    } catch {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (data: EditVideoFormValues) => {
    try {
      await onSubmit(data);
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="YouTube or Facebook video URL"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleVideoUrlChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video Preview */}
        {previewUrl && (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={previewUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
