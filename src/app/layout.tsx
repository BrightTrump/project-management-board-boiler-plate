import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
// import Reduxprovider from "@/store/redux-provider";
// import { Toast } from "@/ui";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management Board",
  description:
    "Prioritize and Manage Your Tasks with this AI Powered PTM Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={lato.className} suppressHydrationWarning={true}>
        <main className="bg-white w-full mx-auto grid place-items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
