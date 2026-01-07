import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Bonusly',
  description: 'Cookie Policy di Bonusly. Scopri quali cookie utilizziamo e come gestire le tue preferenze sui cookie.',
  keywords: [
    'cookie policy',
    'gestione cookie',
    'cookie bonusly',
    'preferenze cookie',
    'cookie tecnici',
    'cookie analitici',
  ],
  alternates: {
    canonical: '/cookie/',
  },
  openGraph: {
    title: 'Cookie Policy - Bonusly',
    description: 'Cookie Policy di Bonusly. Scopri quali cookie utilizziamo e come gestire le tue preferenze.',
    url: 'https://bonusly.org/cookie/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy - Bonusly',
    description: 'Cookie Policy di Bonusly',
  },
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

