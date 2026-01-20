import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Esplora tutti i Bonus',
  description: 'Esplora e filtra tutti i bonus e incentivi disponibili in Italia. Cerca per categoria, ISEE, tipologia e trova i bonus giusti per te.',
  keywords: [
    'esplora bonus italia',
    'cerca bonus',
    'filtro bonus',
    'lista bonus completa',
    'tutti i bonus italiani',
  ],
  openGraph: {
    title: 'Esplora tutti i Bonus | Bonusly',
    description: 'Esplora e filtra tutti i bonus e incentivi disponibili in Italia.',
    url: 'https://bonusly.org/esplora',
  },
  alternates: {
    canonical: '/esplora',
  },
};

export default function EsploraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>{children}</Suspense>;
}
