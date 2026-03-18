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

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-white text-[#1a1a1a] dark:bg-[#1e1e1e] dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
