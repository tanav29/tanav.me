import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { DM_Sans, Geist } from "next/font/google";
import { PostHogProvider } from "./components/PostHogProvider";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { FeedbackButton } from "./components/feedback";
import { TooltipProvider } from "@/components/ui/tooltip";
import Border from "./components/border";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sans = DM_Sans({
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      {/*<ViewTransition>*/}
      <body className={`${sans.className} antialiased overflow-y-scroll`}>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <PostHogProvider>
              <div className="mx-auto max-w-2xl overflow-hidden py-5 min-h-screen border scroll-smooth bg-background relative sm:px-[18px]">
                <header className="px-2 sm:px-5 flex items-center justify-between py-4 pt-0">
                  <Navbar />
                  <ThemeToggle />
                </header>
                <Border />
                <main id="main-content" className="my-6 min-h-[77vh]">
                  {children}
                </main>
                <Border />
                <footer className="mt-4 mx-6 flex items-center justify-between text-sm text-muted-foreground">
                  <div>© {new Date().getFullYear()} Tanav</div>
                  <div>
                    <FeedbackButton />
                  </div>
                </footer>

                <div
                  aria-hidden="true"
                  className="absolute h-full w-5 bottom-0 top-0 -right-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-full w-5 top-0 bottom-0 -left-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block"
                />
              </div>
            </PostHogProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
      {/*</ViewTransition>*/}
    </html>
  );
}
