import "./globals.css";

export const metadata = {
  title: "Elora Skeleton",
  description: "Next.js + Tailwind layout skeleton",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-white antialiased">{children}</body>
    </html>
  );
}
