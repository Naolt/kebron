import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

// Remove unused config since we're not handling files anymore
export const config = {
  api: {
    responseLimit: false,
  },
};

// Remove unused cloudinary config and CloudinaryResponse type
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const title = data.title;
    const imageUrl = data.imageUrl;
    const publicId = data.publicId;

    console.log(imageUrl);

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    // Create gallery item in MongoDB
    const galleryItem = await Gallery.create({
      title,
      image: imageUrl,
      publicId,
    });

    revalidateTag("gallery");
    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Error in POST /api/gallery:", error);
    return NextResponse.json(
      {
        error: "Upload failed. Please try again with a valid image URL.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "2");
    const skip = (page - 1) * limit;

    await connectDB();

    // Get total count for pagination
    const total = await Gallery.countDocuments();

    // Get paginated items
    const galleryItems = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({
      items: galleryItems,
      total,
      currentPage: page,
      totalPages,
      hasMore: totalPages > page,
    });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    // Get the gallery item to get the publicId
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    console.log("galleryItem", galleryItem);

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(galleryItem.publicId);
    } catch (cloudinaryError) {
      console.error("Error deleting from Cloudinary:", cloudinaryError);
      // Continue with MongoDB deletion even if Cloudinary delete fails
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    revalidateTag("gallery");
    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/gallery:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
