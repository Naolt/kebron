import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Gallery } from "@/models/gallery";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const files = formData.getAll("images");
    const titles = formData.getAll("titles") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file, index) => {
      const bytes = await (file as File).arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "gallery",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
              }
            )
            .end(buffer);
        }
      );

      return {
        ...result,
        title: titles[index],
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const galleryEntries = uploadedImages.map(
      (image: CloudinaryUploadResult & { title: string }) => ({
        image: image.secure_url,
        publicId: image.public_id,
        title: image.title,
      })
    );

    await Gallery.insertMany(galleryEntries);

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${files.length} images`,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload images",
      },
      { status: 500 }
    );
  }
}
