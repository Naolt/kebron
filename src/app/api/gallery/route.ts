import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";

// Configure body size limit for the route
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
    responseLimit: false,
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.formData();
    const title = data.get("title") as string;
    const alt = data.get("alt") as string;
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Add timeout and chunking for large files
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          transformation: [
            { width: 800, height: 1067, crop: "fill", quality: "auto" },
          ],
          format: "jpg",
          folder: "gallery",
          timeout: 60000, // 60 second timeout
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Handle upload stream errors
      uploadStream.on("error", (error) => {
        console.error("Upload stream error:", error);
        reject(error);
      });

      // Upload in chunks
      const chunkSize = 64 * 1024; // 64KB chunks
      for (let i = 0; i < buffer.length; i += chunkSize) {
        const chunk = buffer.slice(i, i + chunkSize);
        uploadStream.write(chunk);
      }
      uploadStream.end();
    });

    // log the secure_url and public_id
    console.log("secure_url", (uploadResponse as any).secure_url);
    console.log("public_id", (uploadResponse as any).public_id);

    // Create gallery item in MongoDB
    const galleryItem = await Gallery.create({
      title,
      alt,
      image: (uploadResponse as any).secure_url,
      publicId: (uploadResponse as any).public_id,
    });

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Error in POST /api/gallery:", error);
    return NextResponse.json(
      {
        error:
          "Upload failed. Please try again with a smaller file or better connection.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error("Error in GET /api/gallery:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(galleryItem.publicId);
    } catch (cloudinaryError) {
      console.error("Error deleting from Cloudinary:", cloudinaryError);
      // Continue with MongoDB deletion even if Cloudinary delete fails
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/gallery:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
