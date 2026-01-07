export function CalcolatoreStructuredData() {
  // SoftwareApplication Schema per il calcolatore
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calcolatore Eligibilità Bonus',
    applicationCategory: 'GovernmentApplication',
    operatingSystem: 'Web Browser',
    url: 'https://bonusly.org/calcolatore-eligibilita/',
    description: 'Calcola la tua eligibilità per i bonus italiani. Inserisci i tuoi dati (ISEE, residenza, età figli) e scopri quali bonus puoi richiedere.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Calcolo ISEE',
      'Verifica residenza',
      'Calcolo età figli',
      'Verifica cittadinanza',
      'Calcolo eligibilità bonus',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1',
    },
  };

  // HowTo Schema per il calcolatore
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Come calcolare l\'eligibilità per i bonus italiani',
    description: 'Guida passo-passo per calcolare la tua eligibilità per i bonus italiani',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Inserisci i tuoi dati',
        text: 'Inserisci il tuo ISEE, residenza, cittadinanza e altri dati richiesti',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Aggiungi informazioni sui figli',
        text: 'Aggiungi informazioni sui tuoi figli (età, disabilità) se applicabile',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Visualizza i risultati',
        text: 'Visualizza l\'elenco dei bonus per cui sei eligibile',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

