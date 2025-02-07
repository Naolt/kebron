export function getVideoInfo(url: string) {
  // YouTube URL patterns
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);

  // Facebook URL patterns
  const facebookRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com\/[^\/]+\/videos\/|fb\.watch\/)([a-zA-Z0-9_-]+)/;
  const facebookMatch = url.match(facebookRegex);

  if (youtubeMatch) {
    return {
      platform: "youtube" as const,
      videoId: youtubeMatch[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}`,
    };
  }

  if (facebookMatch) {
    const videoId = facebookMatch[1];
    const embedUrl = url.includes("fb.watch")
      ? `https://www.facebook.com/plugins/video.php?href=https://fb.watch/${videoId}&show_text=false`
      : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          url
        )}&show_text=false`;

    return {
      platform: "facebook" as const,
      videoId,
      embedUrl,
    };
  }

  throw new Error(
    "Invalid video URL. Please provide a valid YouTube or Facebook video URL"
  );
}
