import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Sermon } from "@/models/sermon";
import { revalidateTag } from "next/cache";

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
    revalidateTag("sermons");
    return NextResponse.json(sermon);
  } catch (error) {
    console.error("Error creating sermon:", error);
    return NextResponse.json(
      { error: "Failed to create sermon" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  try {
    await connectDB();
    const sermons = await Sermon.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log("From Server", sermons);
    return NextResponse.json({
      items: sermons,
      total: await Sermon.countDocuments(),
      currentPage: page,
      hasMore: (await Sermon.countDocuments()) > page * limit,
    });
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

    revalidateTag("sermons");

    return NextResponse.json({ message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    return NextResponse.json(
      { error: "Failed to delete sermon" },
      { status: 500 }
    );
  }
}
