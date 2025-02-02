"use client";
import React from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  contactPersonName: z.string().min(2, "Name must be at least 2 characters"),
  contactPersonImage: z
    .instanceof(File, { message: "Image is required" })
    .optional(),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  mapEmbedLink: z
    .string()
    .min(10, "Please enter a valid Google Maps embed link")
    .includes("<iframe", { message: "Must be an iframe embed code" }),
  facebookUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  youtubeUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="p-6">
      <Card className="max-w-[1400px] rounded-none">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contactPersonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPersonImage"
                    render={({
                      field: {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        value,
                        onChange,
                        ...field
                      },
                    }) => (
                      <FormItem>
                        <FormLabel>Contact Person Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a professional photo of the contact person
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contact@church.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="123 Church Street, City, State, ZIP"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mapEmbedLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Embed Code</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="<iframe src='https://www.google.com/maps/embed?...'></iframe>"
                            className="resize-none h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {`Paste the Google Maps embed iframe code here. You can
                          get this from Google Maps by clicking "Share" and
                          selecting "Embed a map"`}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Social Media Links
                    </h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="facebookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://facebook.com/..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="youtubeUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>YouTube</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://youtube.com/..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://linkedin.com/..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitterUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://twitter.com/..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="mt-8 ">
                  Save Contact Information
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
