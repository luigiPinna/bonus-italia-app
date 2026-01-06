'use client';

import { Navbar } from '@/components/navbar';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="rounded-xl bg-card border shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduzione</h2>
              <p className="text-muted-foreground leading-relaxed">
                La presente Privacy Policy descrive come Bonusly (&quot;noi&quot;, &quot;nostro&quot; o &quot;il sito&quot;) 
                raccoglie, utilizza e protegge le informazioni personali degli utenti che visitano il nostro sito web 
                bonusly.org (il &quot;Servizio&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Ci impegniamo a proteggere la tua privacy e a garantire la sicurezza dei tuoi dati personali. 
                Ti invitiamo a leggere attentamente questa policy per comprendere come trattiamo le tue informazioni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Titolare del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il titolare del trattamento dei dati personali è Bonusly. Per qualsiasi domanda o richiesta 
                relativa alla privacy, puoi contattarci all&apos;indirizzo email: 
                <a href="mailto:info@bonusly.org" className="text-primary hover:underline ml-1">
                  info@bonusly.org
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Dati Raccolti</h2>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Dati di navigazione</h3>
              <p className="text-muted-foreground leading-relaxed">
                Durante la navigazione del sito, raccogliamo automaticamente alcuni dati tecnici, tra cui:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Indirizzo IP</li>
                <li>Tipo di browser e versione</li>
                <li>Sistema operativo</li>
                <li>Pagine visitate e tempo di permanenza</li>
                <li>Data e ora di accesso</li>
                <li>Riferimento URL di provenienza</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Dati forniti volontariamente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quando utilizzi il calcolatore di eligibilità o salvi bonus nei preferiti, potremmo raccogliere:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Dati inseriti nel calcolatore (ISEE, residenza, età, ecc.) - memorizzati localmente nel tuo browser</li>
                <li>Preferenze di visualizzazione e filtri selezionati</li>
                <li>Lista dei bonus salvati nei preferiti (memorizzata localmente)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Finalità del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati personali vengono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Fornire e migliorare il servizio di ricerca e consultazione dei bonus</li>
                <li>Analizzare l&apos;utilizzo del sito per migliorare l&apos;esperienza utente</li>
                <li>Garantire la sicurezza e prevenire abusi</li>
                <li>Rispettare obblighi di legge</li>
                <li>Comunicare con gli utenti quando necessario</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Base Giuridica</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il trattamento dei dati personali si basa su:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Consenso dell&apos;utente (per cookie analitici)</li>
                <li>Interesse legittimo del titolare (per dati di navigazione necessari al funzionamento del sito)</li>
                <li>Adempimento di obblighi di legge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookie e Tecnologie Simili</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il sito utilizza cookie e tecnologie simili per migliorare l&apos;esperienza utente e analizzare 
                il traffico. Per maggiori informazioni, consulta la nostra 
                <Link href="/cookie" className="text-primary hover:underline ml-1">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Conservazione dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati personali vengono conservati per il tempo necessario alle finalità per cui sono stati raccolti, 
                nel rispetto dei termini di legge applicabili. I dati di navigazione vengono generalmente conservati 
                per un periodo massimo di 24 mesi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Condivisione dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I tuoi dati personali non vengono venduti, affittati o condivisi con terze parti, ad eccezione di:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Fornitori di servizi che ci assistono nell&apos;erogazione del servizio (es. hosting, analytics)</li>
                <li>Autorità competenti quando richiesto dalla legge</li>
                <li>In caso di trasferimento aziendale o fusione</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. I Tuoi Diritti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR), hai diritto a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Accedere ai tuoi dati personali</li>
                <li>Richiedere la rettifica di dati inesatti</li>
                <li>Richiedere la cancellazione dei dati (&quot;diritto all&apos;oblio&quot;)</li>
                <li>Opporti al trattamento dei dati</li>
                <li>Richiedere la limitazione del trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>Presentare un reclamo al Garante per la Protezione dei Dati Personali</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Per esercitare questi diritti, puoi contattarci all&apos;indirizzo 
                <a href="mailto:info@bonusly.org" className="text-primary hover:underline ml-1">
                  info@bonusly.org
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Sicurezza</h2>
              <p className="text-muted-foreground leading-relaxed">
                Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali da 
                accesso non autorizzato, alterazione, divulgazione o distruzione. Tuttavia, nessun metodo di 
                trasmissione su Internet è completamente sicuro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modifiche alla Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche 
                entreranno in vigore dalla data di pubblicazione sul sito. Ti consigliamo di consultare 
                periodicamente questa pagina per essere informato delle eventuali modifiche.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contatti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Per qualsiasi domanda o richiesta relativa a questa Privacy Policy o al trattamento dei tuoi dati 
                personali, puoi contattarci:
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

