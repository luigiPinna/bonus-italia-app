import { getAllBonus } from '@/lib/data';

export function StructuredData() {
  const allBonus = getAllBonus();
  const attivi = allBonus.filter(b => b.status === 'attivo').length;
  const inArrivo = allBonus.filter(b => b.status === 'in_arrivo').length;

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bonusly',
    url: 'https://bonusly.org',
    logo: 'https://bonusly.org/icon.svg',
    description: 'Piattaforma informativa per scoprire tutti i bonus e incentivi disponibili in Italia',
    sameAs: [
      // Aggiungi i tuoi social media quando disponibili
      // 'https://twitter.com/bonusly',
      // 'https://facebook.com/bonusly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@bonusly.org',
    },
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bonusly',
    url: 'https://bonusly.org',
    description: 'Scopri tutti i bonus e incentivi disponibili in Italia. Filtra per ISEE, categorie e trova i bonus giusti per te.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bonusly.org/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // WebApplication Schema
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bonusly',
    url: 'https://bonusly.org',
    applicationCategory: 'GovernmentApplication',
    operatingSystem: 'Web Browser',
    description: 'Piattaforma per scoprire e calcolare l\'eligibilità per i bonus italiani',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Ricerca bonus',
      'Filtri avanzati',
      'Calcolatore eligibilità',
      'Gestione preferiti',
    ],
  };

  // BreadcrumbList Schema (per homepage)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bonusly.org',
      },
    ],
  };

  // CollectionPage Schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bonus Italia',
    description: `Raccolta di ${allBonus.length} bonus e incentivi disponibili in Italia. ${attivi} bonus attivi e ${inArrivo} in arrivo.`,
    url: 'https://bonusly.org',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allBonus.length,
      itemListElement: allBonus.slice(0, 10).map((bonus, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: bonus.nome,
          description: bonus.descrizione,
          url: `https://bonusly.org/?bonus=${bonus.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </>
  );
}

