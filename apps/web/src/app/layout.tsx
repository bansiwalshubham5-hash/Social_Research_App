import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PaperStateProvider } from "@/lib/paper-state";
import { PaperHeader } from "@/components/PaperHeader";
import { BottomNav } from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breakdown of Monotonic Impurity Entropy Flow — Interactive Explainer",
  description:
    "An interactive, exact-Bethe-Ansatz exploration of arXiv:2608.04083 — PT-symmetric multichannel Kondo systems.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function () {
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored ? stored === 'dark' : prefersDark) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col bg-paper text-ink">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <PaperStateProvider>
          <PaperHeader />
          <main
            className="min-h-0 flex-1 overflow-y-auto"
            style={{ paddingBottom: "calc(4.25rem + env(safe-area-inset-bottom))" }}
          >
            {children}
          </main>
          <BottomNav />
        </PaperStateProvider>
      </body>
    </html>
  );
}
