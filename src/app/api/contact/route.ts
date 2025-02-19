import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Create or update contact information
    const contact = await Contact.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        contactPersonName: data.contactPersonName,
        contactPersonImage: data.contactPersonImage,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        mapEmbedLink: data.mapEmbedLink,
        socialLinks: data.socialLinks,
        publicId: data.publicId,
      },
      { upsert: true, new: true }
    );

    // Revalidate both contact pages
    revalidateTag("contact");
    revalidatePath("/contact");
    revalidatePath("/admin/contact");

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
