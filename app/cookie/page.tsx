'use client';

import { Navbar } from '@/components/navbar';
import { Cookie, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CookiePage() {
  return (
    <div className="bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla home
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="rounded-xl bg-card border shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Cosa sono i Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet, 
                smartphone) quando visiti un sito web. I cookie permettono al sito di ricordare le tue azioni e 
                preferenze per un determinato periodo di tempo, così non devi reinserirle ogni volta che torni 
                sul sito o navighi da una pagina all&apos;altra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Come Utilizziamo i Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bonusly utilizza i cookie per:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Garantire il corretto funzionamento del sito</li>
                <li>Memorizzare le tue preferenze (tema scuro/chiaro, modalità di visualizzazione)</li>
                <li>Salvare i bonus nei preferiti (utilizzando localStorage)</li>
                <li>Analizzare l&apos;utilizzo del sito per migliorare i nostri servizi</li>
                <li>Rispettare le tue scelte riguardo ai cookie</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Tipi di Cookie Utilizzati</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Cookie Tecnici (Necessari)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. 
                Includono:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li><strong>Cookie di sessione:</strong> necessari per mantenere la sessione durante la navigazione</li>
                <li><strong>Cookie di preferenze:</strong> memorizzano le tue scelte (tema, modalità visualizzazione)</li>
                <li><strong>Cookie di sicurezza:</strong> proteggono da attacchi e abusi</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Questi cookie non richiedono il tuo consenso in quanto sono necessari per il funzionamento del sito.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Cookie Analitici</h3>
              <p className="text-muted-foreground leading-relaxed">
                Utilizziamo Google Analytics per analizzare come gli utenti utilizzano il sito. Questi cookie 
                ci aiutano a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Comprendere come gli utenti navigano sul sito</li>
                <li>Identificare le pagine più visitate</li>
                <li>Migliorare l&apos;esperienza utente</li>
                <li>Ottimizzare le prestazioni del sito</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I dati raccolti sono anonimi e aggregati. Puoi disattivare questi cookie tramite il banner 
                di consenso cookie o le impostazioni del tuo browser.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 LocalStorage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Utilizziamo anche la tecnologia localStorage del browser per memorizzare:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Lista dei bonus preferiti</li>
                <li>Preferenze di visualizzazione (griglia, tabella, lista)</li>
                <li>Dati inseriti nel calcolatore di eligibilità (solo sul tuo dispositivo)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Questi dati vengono memorizzati solo sul tuo dispositivo e non vengono trasmessi ai nostri server.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookie di Terze Parti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il sito può utilizzare servizi di terze parti che impostano cookie sul tuo dispositivo:
              </p>
              
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Utilizziamo Google Analytics per analizzare il traffico del sito. Google può utilizzare i 
                  dati raccolti per contestualizzare e personalizzare gli annunci della propria rete pubblicitaria.
                  Per maggiori informazioni, consulta la 
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Privacy Policy di Google
                  </a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Durata dei Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                I cookie possono essere:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li><strong>Cookie di sessione:</strong> vengono eliminati quando chiudi il browser</li>
                <li><strong>Cookie persistenti:</strong> rimangono sul tuo dispositivo per un periodo determinato 
                  (generalmente fino a 2 anni per i cookie analitici) o fino a quando non li elimini manualmente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Gestione dei Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Puoi gestire le tue preferenze sui cookie in diversi modi:
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.1 Banner di Consenso</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quando visiti il sito per la prima volta, vedrai un banner che ti permette di accettare o 
                rifiutare i cookie non necessari. Puoi modificare le tue preferenze in qualsiasi momento.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">6.2 Impostazioni del Browser</h3>
              <p className="text-muted-foreground leading-relaxed">
                Puoi configurare il tuo browser per accettare o rifiutare i cookie. Tuttavia, disattivare 
                completamente i cookie potrebbe limitare alcune funzionalità del sito.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Ecco come gestire i cookie nei browser più comuni:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookie e Dati Personali</h2>
              <p className="text-muted-foreground leading-relaxed">
                I cookie utilizzati dal sito non raccolgono dati personali identificativi, ad eccezione di 
                quelli necessari per il funzionamento del servizio. I dati raccolti tramite cookie analitici 
                sono anonimi e aggregati.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Per maggiori informazioni sul trattamento dei dati personali, consulta la nostra 
                <Link href="/privacy" className="text-primary hover:underline ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modifiche alla Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ci riserviamo il diritto di modificare questa Cookie Policy in qualsiasi momento per riflettere 
                cambiamenti nelle tecnologie utilizzate o nei requisiti legali. Ti consigliamo di consultare 
                periodicamente questa pagina per essere informato delle eventuali modifiche.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contatti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Per qualsiasi domanda o richiesta relativa all&apos;utilizzo dei cookie, puoi contattarci:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a href="mailto:info@bonusly.org" className="text-primary hover:underline">
                    info@bonusly.org
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


