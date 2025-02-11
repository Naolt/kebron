import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No images selected for deletion" },
        { status: 400 }
      );
    }

    // Get the images before deleting them
    const images: Gallery[] = await Gallery.find({ _id: { $in: ids } });

    // Delete from Cloudinary
    for (const image of images) {
      const publicId = image.publicId;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete from database
    const result = await Gallery.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "No images found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Successfully deleted ${result.deletedCount} images`,
    });
  } catch (error) {
    console.error("Error deleting images:", error);
    return NextResponse.json(
      { error: "Failed to delete images" },
      { status: 500 }
    );
  }
}
