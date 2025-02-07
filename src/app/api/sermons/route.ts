import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Sermon } from "@/models/sermon";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.formData();

    const sermon = await Sermon.create({
      title: data.get("title") || "",
      videoUrl: data.get("videoUrl"),
      platform: data.get("platform"),
      videoId: data.get("videoId"),
      embedUrl: data.get("embedUrl"),
    });

    return NextResponse.json(sermon);
  } catch (error) {
    console.error("Error creating sermon:", error);
    return NextResponse.json(
      { error: "Failed to create sermon" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const sermons = await Sermon.find().sort({ createdAt: -1 });
    return NextResponse.json(sermons);
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: "Failed to fetch sermons" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json();

    const sermon = await Sermon.findByIdAndDelete(id);
    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    return NextResponse.json(
      { error: "Failed to delete sermon" },
      { status: 500 }
    );
  }
}
