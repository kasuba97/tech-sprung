import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import Nav from "./components/Nav";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plan B Electric Supply",
  description: "here to serve when zesco fails option",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lexend.className} bg-bgColor p-10`}>
        <MantineProvider>
          <nav>
            <Nav />
          </nav>
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
