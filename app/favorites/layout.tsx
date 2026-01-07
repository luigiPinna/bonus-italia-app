import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I Miei Bonus Preferiti - Salva e Gestisci i Tuoi Bonus',
  description: 'Gestisci i tuoi bonus preferiti salvati. Accedi rapidamente ai bonus che ti interessano e tienili sempre a portata di mano.',
  keywords: [
    'bonus preferiti',
    'salva bonus',
    'gestisci bonus',
    'lista bonus',
    'bonus salvati',
    'preferiti bonus',
  ],
  alternates: {
    canonical: '/favorites/',
  },
  robots: {
    index: false, // Non indicizzare la pagina dei preferiti (contenuto personale)
    follow: true,
  },
  openGraph: {
    title: 'I Miei Bonus Preferiti - Salva e Gestisci i Tuoi Bonus',
    description: 'Gestisci i tuoi bonus preferiti salvati. Accedi rapidamente ai bonus che ti interessano.',
    url: 'https://bonusly.org/favorites/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'I Miei Bonus Preferiti',
    description: 'Gestisci i tuoi bonus preferiti salvati',
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

