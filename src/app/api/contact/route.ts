import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.formData();

    // Upload image to Cloudinary if provided
    let imageUrl = "";
    let publicId = "";
    const imageFile = data.get("contactPersonImage") as File;
    
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "contact",
            timeout: 60000,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.write(buffer);
        uploadStream.end();
      }) as any;

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Create or update contact information
    const contact = await Contact.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        contactPersonName: data.get("contactPersonName"),
        contactPersonImage: imageUrl,
        phoneNumber: data.get("phoneNumber"),
        email: data.get("email"),
        address: data.get("address"),
        mapEmbedLink: data.get("mapEmbedLink"),
        socialLinks: {
          facebook: data.get("facebookUrl"),
          youtube: data.get("youtubeUrl"),
          linkedin: data.get("linkedinUrl"),
          twitter: data.get("twitterUrl"),
        },
        publicId,
      },
      { upsert: true, new: true }
    );

    revalidateTag("contact");
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact information" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const contact = await Contact.findOne();
    return NextResponse.json(contact || {});
  } catch (error) {
    console.error("Error in GET /api/contact:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact information" },
      { status: 500 }
    );
  }
} 