"use client";

import { extractSrcFromIframe } from "@/lib/map-utils";

function Location({ mapEmbedLink }: { mapEmbedLink: string }) {
  return (
    <iframe
      src={extractSrcFromIframe(mapEmbedLink)}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="max-w-[832px] rounded-lg"
    ></iframe>
  );
}

export default Location;
