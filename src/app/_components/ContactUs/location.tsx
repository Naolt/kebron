"use client";

import { extractSrcFromIframe } from "@/lib/map-utils";

function Location({ mapEmbedLink }: { mapEmbedLink: string }) {
  return (
    <iframe
      src={extractSrcFromIframe(mapEmbedLink)}
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: "100%" }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full rounded-lg"
    ></iframe>
  );
}

export default Location;
