import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/analytics';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
    template: '%s | Bonusly',
  },
  description: 'Scopri tutti i bonus e incentivi disponibili in Italia. Filtra per ISEE, categorie e trova i bonus giusti per te. Calcolatore di eligibilità gratuito.',
  keywords: [
    'bonus italia',
    'incentivi italia',
    'bonus statali',
    'bonus natalità',
    'bonus famiglia',
    'assegno unico',
    'bonus asilo nido',
    'bonus ISEE',
    'agevolazioni italia',
    'bonus 2025',
    'bonus 2026',
    'calcolatore bonus',
    'eligibilità bonus',
    'bonus INPS',
    'agevolazioni fiscali',
    'bonus governo',
  ],
  authors: [{ name: 'Bonusly' }],
  creator: 'Bonusly',
  publisher: 'Bonusly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bonusly.org/'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://bonusly.org/',
    siteName: 'Bonusly',
    title: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia. Filtra per ISEE, categorie e trova i bonus giusti per te. Calcolatore di eligibilità gratuito.',
    images: [
      {
        url: 'https://bonusly.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonus Italia - Scopri Bonus e Incentivi in Italia',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia. Filtra per ISEE, categorie e trova i bonus giusti per te.',
    images: ['https://bonusly.org/og-image.png'],
    creator: '@bonusly',
  },
  verification: {
    // Aggiungi i tuoi codici di verifica quando disponibili
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'Government & Public Services',
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
        <StructuredData />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}

