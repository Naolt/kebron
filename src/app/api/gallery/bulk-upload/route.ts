import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { images } = await req.json();

    // Create gallery items in MongoDB
    const galleryItems = await Gallery.insertMany(
      images.map(
        (img: { title: string; imageUrl: string; publicId: string }) => ({
          title: img.title,
          image: img.imageUrl,
          publicId: img.publicId,
        })
      )
    );

    revalidateTag("gallery");
    return NextResponse.json({ success: true, items: galleryItems });
  } catch (error) {
    console.error("Error in POST /api/gallery/bulk-upload:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
