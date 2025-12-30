import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bonus Italia - Bonus e Incentivi per le Famiglie',
  description: 'Scopri tutti i bonus e incentivi disponibili in Italia per le famiglie',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Bonus Italia - Bonus e Incentivi per le Famiglie',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia per le famiglie. Filtra per ISEE, categorie e trova i bonus giusti per te.',
    url: 'https://luigipinna.github.io/bonus-italia-app/', // temporary url
    siteName: 'Bonusly',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bonus Italia - Bonus e Incentivi per le Famiglie',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonus Italia - Bonus e Incentivi per le Famiglie',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia per le famiglie',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://luigipinna.github.io/bonus-italia-app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

