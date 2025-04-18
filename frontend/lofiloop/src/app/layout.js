import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar"; // Import the NavBar component
import PageTitle from "../components/PageTitle"; // Import the PageTitle component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LoFiLoop",
  description: "LoFiLoop - AI generated LoFi music for your study sessions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* PageTitle appears above the NavBar */}
        {/* <PageTitle /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}