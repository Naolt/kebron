"use client";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { extractSrcFromIframe } from "@/lib/map-utils";
import { uploadToCloudinary } from "@/lib/cloudinary";

const formSchema = z.object({
  contactPersonName: z.string().min(2, "Name must be at least 2 characters"),
  contactPersonImage: z.instanceof(File).optional(),
  contactPersonImageUrl: z.string().optional(),
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

function ImageUpload({
  value,
  onChange,
  defaultImage,
}: {
  value?: File;
  onChange: (file?: File) => void;
  defaultImage?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-left gap-4 mb-8">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-40 h-40 rounded-full group cursor-pointer"
      >
        {value || defaultImage ? (
          <>
            <Image
              src={value ? URL.createObjectURL(value as Blob) : defaultImage!}
              alt="Contact person"
              fill
              className="object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="h-8 w-8 text-white" />
            </div>
          </>
        ) : (
          <div className="w-full h-full rounded-full border-4 border-dashed border-muted-foreground/25 flex items-center justify-center">
            <Upload className="h-8 w-8 text-muted-foreground/25" />
          </div>
        )}

        {(value || defaultImage) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
            }}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && file.size <= 5 * 1024 * 1024) {
            onChange(file);
          } else {
            toast.error("Image must be less than 5MB");
          }
          e.target.value = "";
        }}
      />
      <p className="text-sm text-muted-foreground">
        Click to upload (JPEG, PNG, WebP • Max 5MB)
      </p>
    </div>
  );
}

export default function ContactPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setFormData({
          contactPersonName: data.contactPersonName,
          contactPersonImage: undefined,
          contactPersonImageUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1080,q_auto,f_auto/${data.publicId}`,
          phoneNumber: data.phoneNumber,
          email: data.email,
          address: data.address,
          mapEmbedLink: data.mapEmbedLink,
          facebookUrl: data.socialLinks.facebook,
          youtubeUrl: data.socialLinks.youtube,
          linkedinUrl: data.socialLinks.linkedin,
          twitterUrl: data.socialLinks.twitter,
        });
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactPersonName: "",
      phoneNumber: "",
      email: "",
      address: "",
      mapEmbedLink: "",
      facebookUrl: "",
      youtubeUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
    values: formData || undefined,
  });

  const handleReset = () => {
    form.reset(formData || undefined);
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      // Handle image upload first if there's a new image
      let imageUrl = undefined;
      let publicId = undefined;

      if (data.contactPersonImage) {
        const cloudinaryResponse = await uploadToCloudinary(
          data.contactPersonImage,
          "contact"
        );
        imageUrl = cloudinaryResponse.url;
        publicId = cloudinaryResponse.publicId;
      }

      // Send data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactPersonName: data.contactPersonName,
          contactPersonImage: imageUrl,
          publicId,
          phoneNumber: data.phoneNumber,
          email: data.email,
          address: data.address,
          mapEmbedLink: data.mapEmbedLink,
          socialLinks: {
            facebook: data.facebookUrl || "",
            youtube: data.youtubeUrl || "",
            linkedin: data.linkedinUrl || "",
            twitter: data.twitterUrl || "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact information");
      }

      toast.success("Contact information updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update contact information");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    return () => {
      const file = form.getValues("contactPersonImage");
      if (file) {
        URL.revokeObjectURL(URL.createObjectURL(file as Blob));
      }
    };
  }, [form]);

  return (
    <div className="p-6">
      <Card className="max-w-[1400px] rounded-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contact Information</CardTitle>
          {form.formState.isDirty && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                Reset Changes
              </Button>
              <Button type="submit" form="contact-form" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="contact-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <ImageUpload
                    value={form.watch("contactPersonImage")}
                    onChange={(file) =>
                      form.setValue("contactPersonImage", file, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    defaultImage={formData?.contactPersonImageUrl}
                  />
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
                      {/* render the map embed link if it exists extracting the src from the iframe */}
                      {form.watch("mapEmbedLink") && (
                        <iframe
                          src={extractSrcFromIframe(form.watch("mapEmbedLink"))}
                          width="100%"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="max-w-[832px] rounded-lg"
                        ></iframe>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
