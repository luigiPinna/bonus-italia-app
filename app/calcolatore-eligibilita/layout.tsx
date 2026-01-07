import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calcolatore Eligibilità Bonus - Verifica i Bonus Disponibili',
  description: 'Calcola la tua eligibilità per i bonus italiani. Inserisci i tuoi dati (ISEE, residenza, età figli) e scopri quali bonus puoi richiedere. Strumento gratuito e aggiornato.',
  keywords: [
    'calcolatore bonus',
    'calcolatore eligibilità bonus',
    'verifica bonus disponibili',
    'calcolo ISEE bonus',
    'simulatore bonus',
    'quali bonus posso richiedere',
    'calcolatore bonus italia',
    'verifica requisiti bonus',
    'calcolatore bonus famiglia',
    'calcolatore bonus natalità',
  ],
  alternates: {
    canonical: '/calcolatore-eligibilita/',
  },
  openGraph: {
    title: 'Calcolatore Eligibilità Bonus - Verifica i Bonus Disponibili',
    description: 'Calcola la tua eligibilità per i bonus italiani. Inserisci i tuoi dati e scopri quali bonus puoi richiedere.',
    url: 'https://bonusly.org/calcolatore-eligibilita/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calcolatore Eligibilità Bonus - Verifica i Bonus Disponibili',
    description: 'Calcola la tua eligibilità per i bonus italiani. Strumento gratuito e aggiornato.',
  },
};

export default function CalcolatoreEligibilitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

