import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

// Keep cloudinary config for deleting old images
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
    const { id } = await params;

    const { title, imageUrl, publicId } = await request.json();

    // Find the existing gallery item
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // If a new image was uploaded, delete the old one from Cloudinary
    if (imageUrl && publicId && galleryItem.publicId) {
      try {
        await cloudinary.uploader.destroy(galleryItem.publicId);
      } catch (error) {
        console.error("Error deleting old image from Cloudinary:", error);
        // Continue with update even if delete fails
      }
    }

    // Update the gallery item
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        ...(imageUrl && { image: imageUrl }),
        ...(publicId && { publicId }),
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete from Cloudinary first
    if (galleryItem.publicId) {
      try {
        await cloudinary.uploader.destroy(galleryItem.publicId);
      } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        // Continue with MongoDB deletion even if Cloudinary delete fails
      }
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    revalidateTag("gallery");
    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
