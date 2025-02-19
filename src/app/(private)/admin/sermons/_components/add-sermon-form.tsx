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
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getVideoInfo } from "@/lib/video-utils";

const formSchema = z.object({
  title: z.string().optional(),
  videoUrl: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => {
      try {
        getVideoInfo(url);
        return true;
      } catch {
        return false;
      }
    }, "Please provide a valid YouTube or Facebook video URL"),
});

type FormValues = z.infer<typeof formSchema>;

const AddSermonTriggerButton = (
  <div className="rounded-lg overflow-hidden bg-white  shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-300 hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100 transition-all">
    <div className="aspect-video w-full  flex flex-col items-center justify-center ">
      <Plus className="w-8 h-8 text-gray-400" />
      <span className="mt-2 text-sm text-gray-500">Add New Sermon</span>
    </div>
    <div className="p-4 h-[68px]" />{" "}
  </div>
);

interface FormContentProps {
  onSuccess: () => void;
}

function FormContent({ onSuccess }: FormContentProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
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

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      const videoInfo = getVideoInfo(data.videoUrl);
      const formData = new FormData();

      if (data.title) {
        formData.append("title", data.title);
      }
      formData.append("videoUrl", data.videoUrl);
      formData.append("platform", videoInfo.platform);
      formData.append("videoId", videoInfo.videoId);
      formData.append("embedUrl", videoInfo.embedUrl);

      const response = await fetch("/api/sermons", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create sermon");
      }

      toast.success("Sermon added successfully");
      form.reset();
      setPreviewUrl(null);
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add sermon");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste YouTube or Facebook video URL"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleVideoUrlChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>
                For YouTube use the video URL (e.g.
                https://www.youtube.com/watch?v=dQw4w9WgXcQ) or for Facebook use
                the share link (e.g.
                https://www.facebook.com/watch/?v=1234567890)
              </FormDescription>
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
                <Input placeholder="Sermon title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Sermon"}
        </Button>
      </form>
    </Form>
  );
}

interface AddSermonFormProps {
  onSuccess: () => void;
}

export function AddSermonForm({ onSuccess }: AddSermonFormProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{AddSermonTriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Sermon</DialogTitle>
            <DialogDescription>
              Add a new sermon video from YouTube or Facebook
            </DialogDescription>
          </DialogHeader>
          <FormContent onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{AddSermonTriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Sermon</DrawerTitle>
          <DrawerDescription>
            Add a new sermon video from YouTube or Facebook
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <FormContent onSuccess={onSuccess} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
