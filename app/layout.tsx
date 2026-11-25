import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Kosi AI — One mind. Many modes.", description: "A multi-mode AI workspace for thinking, creating, researching and exploring." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
