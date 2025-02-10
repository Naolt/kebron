export function extractSrcFromIframe(iframeString: string) {
  if (typeof window === "undefined") {
    // Server-side: basic string extraction
    const srcMatch = iframeString.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  }

  // Client-side: use DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(iframeString, "text/html");
  const iframe = doc.querySelector("iframe");
  return iframe?.src || "";
}
