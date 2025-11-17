# Istruzioni per l'Installazione e l'Avvio

## Prerequisiti

- Node.js 18+ installato
- npm o yarn

## Installazione

1. Installa le dipendenze:

```bash
npm install
```

## Avvio in Sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000)

## Build per Produzione

```bash
npm run build
npm start
```

## Struttura del Progetto

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principale
│   ├── page.tsx           # Homepage
│   └── globals.css        # Stili globali Tailwind
├── components/
│   ├── ui/                # Componenti UI base
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── dialog.tsx
│   └── bonus/             # Componenti specifici bonus
│       ├── bonus-card.tsx
│       ├── bonus-modal.tsx
│       ├── search-bar.tsx
│       └── filter-sidebar.tsx
├── data/
│   └── bonus.json         # Dati statici bonus
├── lib/
│   ├── data.ts            # Funzioni per accesso dati
│   ├── filters.ts         # Logica filtri
│   └── utils.ts           # Utility functions
└── types/
    └── bonus.ts           # Type definitions
```

## Note

- I dati sono statici e si trovano in `data/bonus.json`
- Per aggiungere nuovi bonus, modifica il file JSON
- Il progetto usa TypeScript strict mode
- Tailwind CSS per lo styling
- Componenti UI basati su Radix UI

