//metadata
export const metadata = {
  title: "Account",
  description:
    "Share your opinion on books you've read or simply look for your next great read",
  generator: "Next.js",
  applicationName: "Key",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Maela", url: "https://maelacudini.com" }],
  creator: "Maela",
  publisher: "Maela",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://addwebsite.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Key",
    description:
      "Share your opinion on books you've read or simply look for your next great read",
    url: "https://addwebsite.com",
    siteName: "Key",
    authors: ["Maela"],
    images: [
      {
        url: "https://addwebsite.com/opengraph-image.png",
        width: 1800,
        height: 1600,
        alt: "Key, book reviews",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Key",
    description:
      "Share your opinion on books you've read or simply look for your next great read",
    images: ["https://addwebsite.com/twitter-image.png"],
  },
};

export default function AccountLayout({ children }) {
  return <>{children}</>;
}
