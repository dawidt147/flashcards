import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { SessionClientProvider } from "@/providers/SessionClientProvider";
import { NextIntlClientProvider } from 'next-intl';
import "@/assets/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SessionClientProvider>
          <ConvexClientProvider>
            <NextIntlClientProvider>
              {children}
            </NextIntlClientProvider>
          </ConvexClientProvider>
        </SessionClientProvider>
      </body>
    </html>
  );
}
