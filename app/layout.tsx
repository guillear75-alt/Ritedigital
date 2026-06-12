import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "RITE Escolar",
  description:
    "Sistema de Registro Institucional de Trayectorias Educativas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={nunito.variable}
    >
      <body>{children}</body>
    </html>
  );
}