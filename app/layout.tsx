import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "TetraDev · AI Automation, Web & App Development",
  description:
    "TetraDev builds AI automations, websites, applications, and custom AI features for businesses and product teams. Explore our services and discuss your project.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('tetradev-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}` }} />{children}</body>
    </html>
  );
}
