import "./globals.css";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";


export const metadata = {
  metadataBase: new URL("https://blog-fe-2.vercel.app"),
  title: {
    default: "My blog",
    template: "%s | My blog",
  },
   description: "A modern blog about technology, culture, and inspiration.",
   openGraph: {
    type: "website",
    siteName: "MyBlog",
    images: [
      {
        url: "/image_5.jpg", 
        width: 1200,
        height: 630,
        alt: "MyBlog",
      },
    ],
   },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#1e1e1e] text-white antialiased">
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
