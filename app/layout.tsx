import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Geist } from "next/font/google";
import { PostHogProvider } from "./components/PostHogProvider";
import { ThemeProvider } from "./components/theme-provider";
import { FeedbackButton } from "./components/feedback";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });


export const metadata: Metadata = {
  metadataBase: new URL("https://tanav.me"),
  title: {
    default: "Tanav",
    template: "%s",
  },
  description:
    "Tanav Poswal is a Fullstack developer from India with proficiency in Web and AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanav.me",
    siteName: "Tanav Poswal",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tanav Poswal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tanavtwt",
    creator: "@tanavtwt",
    images: ["https://tanav.me/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tanav Poswal",
  url: "https://tanav.me",
  description: "Full-stack software engineer building AI-powered applications, scalable backend systems, and distributed software.",
  jobTitle: "Full Stack Engineer",
  sameAs: [
    "https://github.com/tanav29",
    "https://www.linkedin.com/in/tanav29",
    "https://x.com/tanavtwt",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      {/*<ViewTransition>*/}
      <body className="antialiased overflow-y-scroll">
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="light"
            disableTransitionOnChange={false}
          >
            <PostHogProvider>
              <div className="site-shell">
                <Navbar />
                <main id="main-content" className="site-main">
                  {children}
                </main>
                <footer className="site-footer">
                  <div>{new Date().getFullYear()} Tanav</div>
                  <div>
                    <FeedbackButton />
                  </div>
                </footer>
{/*
                <div
                  aria-hidden="true"
                  className="absolute h-full w-5 bottom-0 top-0 -right-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-full w-5 top-0 bottom-0 -left-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block"
                />*/}
              </div>
            </PostHogProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
      {/*</ViewTransition>*/}
    </html>
  );
}
