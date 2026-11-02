import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UBB Campus",
  description: "StudyRoom Finder for Babeș-Bolyai students.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
