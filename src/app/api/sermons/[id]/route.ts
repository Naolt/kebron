import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Sermon } from "@/models/sermon";
import { getVideoInfo } from "@/lib/video-utils"; // We'll create this utility

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();

    // Get new embed URL from video URL
    const videoInfo = getVideoInfo(data.videoUrl);

    const sermon = await Sermon.findByIdAndUpdate(
      params.id,
      {
        title: data.title,
        videoUrl: data.videoUrl,
        platform: videoInfo.platform,
        videoId: videoInfo.videoId,
        embedUrl: videoInfo.embedUrl,
      },
      { new: true }
    );

    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(sermon);
  } catch (error) {
    console.error("Error updating sermon:", error);
    return NextResponse.json(
      { error: "Failed to update sermon" },
      { status: 500 }
    );
  }
}
