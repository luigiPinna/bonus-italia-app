import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/analytics';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
  description: 'Scopri tutti i bonus e incentivi disponibili in Italia',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia. Filtra per ISEE, categorie e trova i bonus giusti per te.',
    url: 'https://bonusly.org/',
    siteName: 'Bonusly',
    images: [
      {
        url: 'https://bonusly.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia',
    images: ['https://bonusly.org/og-image.png'],
  },
  metadataBase: new URL('https://bonusly.org/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}

