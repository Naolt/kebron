import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File | null;
    const { id } = await params;

    // Find the existing gallery item
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // If a new image is provided, upload it and delete the old one
    let imageUrl = galleryItem.image;
    let publicId = galleryItem.publicId;

    if (imageFile) {
      // Delete old image from Cloudinary
      if (galleryItem.publicId) {
        await cloudinary.uploader.destroy(galleryItem.publicId);
      }

      // Upload new image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${base64Image}`,
        {
          folder: "gallery",
        }
      );

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Update the gallery item
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        image: imageUrl,
        publicId,
      },

      { new: true }
    );

    revalidateTag("gallery");
    return NextResponse.json(updatedGalleryItem);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}
