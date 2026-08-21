import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
  title: "RICHARD PORTFOLIO",
  description: "Full-stack developer building payroll, disaster relief, and administrative systems for local government.",
  openGraph: {
    title: "RICHARD PORTFOLIO",
    description: "Full-stack developer building payroll, disaster relief, and administrative systems for local government.",
    url: "https://richard-portfolio.vercel.app",
    siteName: "RICHARD PORTFOLIO",
    images: [
      {
        url: "/images/about/profile.png",
        width: 1200,
        height: 630,
        alt: "RICHARD PORTFOLIO",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RICHARD PORTFOLIO",
    description: "Full-stack developer building payroll, disaster relief, and administrative systems for local government.",
    images: ["/images/about/profile.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/about/profile.png" />
        <link rel="apple-touch-icon" href="/images/about/profile.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
