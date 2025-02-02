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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  alt: z.string().min(2, "Alt text must be at least 2 characters"),
  image: z.instanceof(File, { message: "Image is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddImageTriggerButton = (
  <button className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
    <Plus className="w-8 h-8 text-gray-400" />

    <span className="mt-2 text-sm text-gray-500">Add New Image</span>
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
                <Input placeholder="Image title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="Image description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({
            field: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              value,
              onChange,
              ...field
            },
          }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
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
          Upload Image
        </Button>
      </form>
    </Form>
  );
}

export function AddImageForm() {
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
          <FormContent />
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
          <FormContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
