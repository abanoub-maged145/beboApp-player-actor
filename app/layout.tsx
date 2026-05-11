import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle — لاعبون & ممثلون",
  description: "اختار شخصية عشوائية من لاعبي كرة القدم الأسطوريين أو الممثلين المصريين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
