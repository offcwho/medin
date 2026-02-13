import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Modals from "@/components/modals";
import Provider from "@/components/provider";

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
      <Provider>
        <body
          className={`${font.variable} antialiased`}
        >
          <div className="">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
          <Modals />
        </body>
      </Provider>
    </html>
  );
}
