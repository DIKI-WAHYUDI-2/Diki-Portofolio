import "./globals.css";

export const metadata = {
  title: "Portfolio — Civic Systems Developer",
  description:
    "Full-stack developer building payroll, disaster relief, and administrative systems for local government.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
