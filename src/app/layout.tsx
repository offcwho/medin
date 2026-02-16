import localFont from 'next/font/local';
import "./globals.css";
import Modals from "@/components/modals";
import Provider from "@/components/provider";
import SiteLayoutShell from "@/components/site-layout-shell";

const font = localFont({
  src: '../../public/fonts/SNPro.woff2',
  variable: '--font-snpro',
});

export const metadata = {
  title: {
    default: 'ООО Медин | Главная страница',
    template: 'ООО Медин  |  %s',
  },
  description: 'Описание сайта по умолчанию',
  keywords: ['ключевое слово 1', 'ключевое слово 2'],
  openGraph: {
    title: 'Главная страница',
    description: 'Описание для соц. сетей',
    type: 'website',
  },
  icons: {
    icon: '/logos/favicon.ico',
    shortcut: '/logos/favicon.svg',
    apple: '/logos/favicon.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logos/favicon.svg',
    },
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.variable} antialiased`}
      >
        <Provider>
          <div className="">
            <SiteLayoutShell>{children}</SiteLayoutShell>
          </div>
          <Modals />
        </Provider>
      </body>
    </html>
  );
}
