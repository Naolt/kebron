"use client";
import React from "react";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  videoUrl: z.string().url("Must be a valid URL"),
  duration: z.string().min(1, "Duration is required"),
  thumbnail: z.instanceof(File, { message: "Thumbnail is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddWebinarTriggerButton = (
  <button className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
    <Plus className="w-8 h-8 text-gray-400" />
    <span className="mt-2 text-sm text-gray-500">Add New Webinar</span>
  </button>
);

function FormContent() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormValues) {
    console.log(data);
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
                <Input placeholder="Webinar title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Webinar description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 45:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input placeholder="https://youtube.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({
            field: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              value,
              onChange,
              ...field
            },
          }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Webinar
        </Button>
      </form>
    </Form>
  );
}

export function AddWebinarForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{AddWebinarTriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Webinar</DialogTitle>
            <DialogDescription>
              Upload a new Webinar to the collection
            </DialogDescription>
          </DialogHeader>
          <FormContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{AddWebinarTriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Webinar</DrawerTitle>
          <DrawerDescription>
            Upload a new Webinar to the collection
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <FormContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
