import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter", // Custom CSS variable for the font
});

export const metadata: Metadata = {
    title: "Scriptwiz - Python & R Visualizations",
    description:
        "Scriptwiz offers powerful Python and R visualization tools to enhance data analysis and insights.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
