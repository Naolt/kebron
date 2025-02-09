function extractSrcFromIframe(iframe: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(iframe, "text/html");
  const iframeElement = doc.querySelector("iframe");
  return iframeElement?.src;
}

export { extractSrcFromIframe };
