import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Bonusly',
  description: 'Privacy Policy di Bonusly. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali in conformità con il GDPR.',
  keywords: [
    'privacy policy',
    'protezione dati',
    'GDPR',
    'privacy bonusly',
    'trattamento dati personali',
    'cookie policy',
  ],
  alternates: {
    canonical: '/privacy/',
  },
  openGraph: {
    title: 'Privacy Policy - Bonusly',
    description: 'Privacy Policy di Bonusly. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
    url: 'https://bonusly.org/privacy/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Bonusly',
    description: 'Privacy Policy di Bonusly. Conformità GDPR.',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

