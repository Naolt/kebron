export const generateChurchStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Kebron International Church",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[Church Address]",
    addressLocality: "Rüsselsheim",
    addressRegion: "Hessen",
    postalCode: "[Postal Code]",
    addressCountry: "DE",
  },
  telephone: "[Phone Number]",
  url: process.env.NEXT_PUBLIC_APP_URL,
  sameAs: [
    "[Facebook URL]",
    "[YouTube URL]",
    // Add other social media URLs
  ],
});
