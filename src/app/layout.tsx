import type { Metadata } from "next";
import { Inter, Stardos_Stencil } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryClientProvider } from "@/provider/provider";

const inter = Inter({ subsets: ["latin"] });
const stardos_stencil = Stardos_Stencil({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-stardos_stencil",
});

export const metadata: Metadata = {
  title: "Creativa",
  description: " Welcome to Creativa,  Where Expertise Meets Creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={stardos_stencil.className}>
        <ReactQueryClientProvider>
          <ToastContainer />
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
