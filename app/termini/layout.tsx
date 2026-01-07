import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termini di Utilizzo - Bonusly',
  description: 'Termini di Utilizzo di Bonusly. Leggi le condizioni d\'uso del servizio e le informazioni importanti sul sito.',
  keywords: [
    'termini di utilizzo',
    'condizioni d\'uso',
    'termini servizio',
    'termini bonusly',
    'condizioni legali',
  ],
  alternates: {
    canonical: '/termini/',
  },
  openGraph: {
    title: 'Termini di Utilizzo - Bonusly',
    description: 'Termini di Utilizzo di Bonusly. Leggi le condizioni d\'uso del servizio.',
    url: 'https://bonusly.org/termini/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Termini di Utilizzo - Bonusly',
    description: 'Termini di Utilizzo di Bonusly',
  },
};

export default function TerminiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

