import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vansh Nagpal — iPad Classic OS",
  description: "The portfolio of Vansh Nagpal, Full-stack, iOS and design engineer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
