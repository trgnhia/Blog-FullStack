import "./globals.css";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
export const metadata = {
  title: "My blog",
  description: "Next.js + Tailwind layout skeleton",
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
