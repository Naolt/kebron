import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Livestream } from "@/models/livestream";
import { getVideoInfo } from "@/lib/video-utils";

// Define the params type
type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    await connectDB();
    const data = await request.json();
    // Get new embed URL from video URL
    const videoInfo = getVideoInfo(data.videoUrl);
    const { id } = await params;

    const livestream = await Livestream.findByIdAndUpdate(
      id,
      {
        title: data.title,
        videoUrl: data.videoUrl,
        platform: videoInfo.platform,
        videoId: videoInfo.videoId,
        embedUrl: videoInfo.embedUrl,
      },
      { new: true }
    );

    if (!livestream) {
      return NextResponse.json(
        { error: "Livestream not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(livestream);
  } catch (error) {
    console.error("Error updating livestream:", error);
    return NextResponse.json(
      { error: "Failed to update livestream" },
      { status: 500 }
    );
  }
}
