import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Livestream } from "@/models/livestream";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.formData();

    const livestream = await Livestream.create({
      title: data.get("title") || "",
      videoUrl: data.get("videoUrl"),
      platform: data.get("platform"),
      videoId: data.get("videoId"),
      embedUrl: data.get("embedUrl"),
    });

    revalidateTag("livestreams");
    return NextResponse.json(livestream);
  } catch (error) {
    console.error("Error creating livestream:", error);
    return NextResponse.json(
      { error: "Failed to create livestream" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  try {
    await connectDB();
    const livestreams = await Livestream.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Livestream.countDocuments();

    return NextResponse.json({
      items: livestreams,
      total,
      currentPage: page,
      itemsPerPage: limit,
    });
  } catch (error) {
    console.error("Error fetching livestreams:", error);
    return NextResponse.json(
      { error: "Failed to fetch livestreams" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json();

    const livestream = await Livestream.findByIdAndDelete(id);
    if (!livestream) {
      return NextResponse.json(
        { error: "Livestream not found" },
        { status: 404 }
      );
    }

    revalidateTag("livestreams");
    return NextResponse.json({ message: "Livestream deleted successfully" });
  } catch (error) {
    console.error("Error deleting livestream:", error);
    return NextResponse.json(
      { error: "Failed to delete livestream" },
      { status: 500 }
    );
  }
}
