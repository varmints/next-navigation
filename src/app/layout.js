import localFont from 'next/font/local'
import "./globals.css";

import Menu from "@/components/menu/Menu";

const saans = localFont({
  src: [
    {
      path: '../fonts/Saans-Regular.woff2',
      variable: '--font-saans',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Saans-SemiBold.woff2',
      variable: '--font-saans',
      weight: '500',
      style: 'normal',
    },

  ],
})

export const metadata = {
  title: "NextJS x GSAP Responsive Navigation",
  description: "by Okej Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={saans.className}>
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
