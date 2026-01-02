# Bonus Italia MVP 🇮🇹

Una web app moderna per visualizzare tutti i bonus e incentivi disponibili in Italia, con filtri per ISEE e categorie.

## 🎯 Obiettivo

Semplificare l'accesso alle informazioni sui bonus statali italiani attraverso un'interfaccia pulita e intuitiva, aiutando i cittadini a scoprire quali agevolazioni possono richiedere.

## 🚀 Stack Tecnologico

- **Framework**: Next.js 14 (App Router)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS
- **Dati**: JSON statico (per MVP)
- **Deploy**: Vercel (consigliato)

## 📊 Scope Iniziale

**Versione MVP:**
- Solo bonus **natalità** (3 bonus principali)
- Solo bonus **nazionali** (no regionali/comunali)
- Dati statici aggiornati manualmente
- Zero backend/database

**Bonus attualmente inclusi:**
1. **Bonus Nuove Nascite 2025** - 1.000€ una tantum
2. **Assegno Unico Universale** - 57,5€-201€ mensili
3. **Bonus Asilo Nido** - 1.500€-3.600€ annui

## 🎨 Design Guidelines

- **UI/UX**: Ispirato ai migliori siti moderni (ProductHunt, Linear, Vercel)
- **Stile**: Minimale, pulito, pratico
- **Layout**: Cards responsive con filtri laterali/header
- **Mobile-first**: Ottimizzato per tutti i dispositivi

## 📁 Struttura Progetto

```
/
├── app/                    # App Router Next.js
├── components/            # Componenti React riutilizzabili
├── data/                 # File JSON con bonus
│   └── bonus.json       # Database statico bonus
├── types/               # Type definitions TypeScript
├── utils/               # Utility functions
└── public/              # Assets statici
```

## 🔧 Installazione e Sviluppo

```bash
# Clone repository
git clone [repo-url]
cd bonus-italia-mvp

# Installa dipendenze
npm install

# Avvia server sviluppo
npm run dev

# Build produzione
npm run build

# Deploy
npm run start
```

## Deploy Setup

### Stack
- **Frontend:** Next.js + TypeScript (static export)
- **Container:** Docker (multi-stage build)
- **Registry:** GitHub Container Registry (GHCR)
- **Server:** TrueNAS SCALE
- **Automation:** Watchtower + GitHub Actions

### Automated Deployment
1. Push to `main` branch
2. GitHub Actions builds and pushes to `ghcr.io/luigipinna/bonusly:latest`
3. Watchtower auto-deploys new image (checks every 5 minutes)

### Manual Commands
```bash
# Deploy manually
cd /mnt/tank/docker/websites
sudo docker compose pull
sudo docker compose up -d

# View logs
sudo docker logs bonusly
sudo docker logs watchtower
```

### Live Site
🌐 https://bonusly.org

## 📊 Configurazione Analytics (Google Analytics 4)

L'app è configurata per supportare Google Analytics 4 (gratuito). Per abilitare il tracking:

### 1. Crea un account Google Analytics
1. Vai su [Google Analytics](https://analytics.google.com/)
2. Crea un nuovo account (se non ne hai uno)
3. Crea una nuova proprietà per il tuo sito web
4. Seleziona "Web" come piattaforma
5. Inserisci il nome del sito e l'URL

### 2. Ottieni il Measurement ID
1. Nella dashboard di Google Analytics, vai su **Amministrazione** (icona ingranaggio)
2. Seleziona la tua proprietà
3. Vai su **Flussi di dati** > **Web**
4. Copia il **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 3. Configura la variabile d'ambiente

#### Per sviluppo locale
Crea un file `.env.local` nella root del progetto:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Sostituisci `G-XXXXXXXXXX` con il tuo Measurement ID reale.

## ⚡ Funzionalità Core MVP

### 🏠 Homepage
- Griglia cards bonus con anteprima
- Search bar globale
- Filtri principali visibili

### 🔍 Sistema Filtri
- **ISEE**: Fasce predefinite (0-17k, 17-25k, 25-40k, 40k+)
- **Categoria**: Natalità, Famiglia, Educazione
- **Tipologia**: Una tantum, Mensile, Annuale
- **Età figli**: Gravidanza, 0-1, 1-3, 3-18, 18-21, Disabili

### 📋 Dettaglio Bonus
- Modal/drawer con informazioni complete
- Link ufficiali INPS
- Requisiti dettagliati
- Come fare domanda
- Scadenze e importi

### 📱 Responsive Design
- Mobile-first approach
- Cards adattive
- Menu filtri collassabile
- Touch-friendly

## 📊 Struttura Dati

Ogni bonus include:
- Informazioni generali (nome, categoria, status)
- Importi (fissi/variabili, fasce ISEE)
- Requisiti (cittadinanza, età, ISEE)
- Procedura richiesta (link, documenti, scadenze)
- Compatibilità con altri bonus

## 🎛 Filtri Implementati

```typescript
interface Filtri {
  isee: string[];          // Fasce ISEE
  categorie: string[];     // Tipologie bonus
  tipologie: string[];     // Modalità erogazione
  eta_figli: string[];     // Range età beneficiari
}
```

## 🔮 Roadmap Futtura

### Fase 2 - Espansione
- [ ] Bonus casa, lavoro, energia
- [ ] Bonus regionali principali
- [ ] Simulatore eligibilità

### Fase 3 - Backend
- [ ] Database PostgreSQL
- [ ] API per aggiornamenti
- [ ] CMS per gestione contenuti

### Fase 4 - Features
- [ ] Account utente
- [ ] Notifiche nuovi bonus
- [ ] Integrazione CAF

## 📋 TODO List - Funzionalità Utili (temp: no db)

### Funzionalità da implementare
- [x] **Preferiti/Favoriti** - Salvare bonus preferiti in localStorage con icona cuore, sezione "I miei bonus"
- [x] **Calcolatore Eligibilità Personale** - Form per inserire ISEE, età figli, residenza e mostrare solo bonus compatibili
- [ ] **Calcolatore Totale Potenziale** - Selezionare bonus compatibili e calcolare totale annuo/mensile con breakdown
- [ ] **Link Condivisibili con Filtri** - Generare URL con filtri preimpostati per condividere ricerche specifiche
- [ ] **Checklist Requisiti Interattiva** - Checklist nel modal per verificare requisiti e documenti, salvare progresso
- [ ] **Timeline/Calendario Scadenze** - Vista calendario con scadenze bonus, filtro "In scadenza" (prossimi 30 giorni)
- [ ] **Storico Visualizzazioni** - Salvare ultimi N bonus visualizzati, sezione "Visti di recente"
- [ ] **Filtri Salvati** - Salvare combinazioni di filtri con nome personalizzato per accesso rapido
- [ ] **Esportazione Lista** - Esportare bonus filtrati in PDF, CSV o JSON
- [ ] **Notifiche Scadenze** - Notifiche browser per bonus in scadenza usando Notification API
- [ ] **Modalità "Solo per me"** - Filtro rapido che applica automaticamente ISEE, età figli e categorie salvate

## 📝 Note sui Dati

- **Fonte**: Siti ufficiali INPS, Gazzette Ufficiali
- **Aggiornamento**: Manuale per MVP
- **Accuratezza**: Verificata al 17/11/2025
- **Disclaimer**: Consultare sempre fonti ufficiali per conferma

## ⚖️ Disclaimer

Questa applicazione fornisce informazioni orientative sui bonus italiani. Per informazioni definitive e aggiornate, consultare sempre i siti ufficiali degli enti erogatori (INPS, Agenzia delle Entrate, etc.).

## 🤝 Contributi

Per segnalazioni di errori nei dati o suggerimenti:
- Verificare sempre con fonti ufficiali
- Indicare fonte e data dell'informazione
- Fornire link alle circolari/normative di riferimento

---

**Versione MVP** | **Target**: Cittadini italiani | **Ultimo aggiornamento**: Dicembre 2025

---

Available temporary on:  https://luigipinna.github.io/bonus-italia-app/