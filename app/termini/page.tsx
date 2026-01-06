'use client';

import { Navbar } from '@/components/navbar';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TerminiPage() {
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
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Termini di Utilizzo</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="rounded-xl bg-card border shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Accettazione dei Termini</h2>
              <p className="text-muted-foreground leading-relaxed">
                Accedendo e utilizzando il sito web bonusly.org (il &quot;Sito&quot;), accetti di essere vincolato 
                da questi Termini di Utilizzo (&quot;Termini&quot;). Se non accetti questi Termini, ti preghiamo 
                di non utilizzare il Sito.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Il Sito è gestito da Bonusly (&quot;noi&quot;, &quot;nostro&quot; o &quot;il Servizio&quot;). 
                Utilizzando il Sito, accetti di rispettare tutte le leggi e i regolamenti applicabili.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrizione del Servizio</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bonusly è una piattaforma informativa che fornisce informazioni sui bonus e incentivi disponibili 
                in Italia. Il Sito offre:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Un database consultabile di bonus e incentivi</li>
                <li>Strumenti di ricerca e filtraggio</li>
                <li>Un calcolatore di eligibilità</li>
                <li>Funzionalità per salvare bonus nei preferiti</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">Importante:</strong> Le informazioni fornite sul Sito sono 
                a scopo puramente informativo e non costituiscono consulenza legale, fiscale o finanziaria. 
                Ti invitiamo sempre a verificare le informazioni ufficiali sui siti istituzionali competenti 
                prima di fare richiesta per qualsiasi bonus.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Utilizzo del Sito</h2>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Utilizzo Consentito</h3>
              <p className="text-muted-foreground leading-relaxed">
                Puoi utilizzare il Sito per:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Consultare informazioni sui bonus disponibili</li>
                <li>Utilizzare gli strumenti di ricerca e filtraggio</li>
                <li>Utilizzare il calcolatore di eligibilità</li>
                <li>Salvare bonus nei preferiti per riferimento personale</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Utilizzo Non Consentito</h3>
              <p className="text-muted-foreground leading-relaxed">
                È vietato:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Utilizzare il Sito per scopi illegali o non autorizzati</li>
                <li>Tentare di accedere a aree non autorizzate del Sito</li>
                <li>Interferire con il funzionamento del Sito o dei server</li>
                <li>Eseguire scraping automatizzato o estrazione massiva di dati senza autorizzazione</li>
                <li>Utilizzare robot, spider o altri dispositivi automatizzati per accedere al Sito</li>
                <li>Riprodurre, duplicare o copiare il contenuto del Sito senza autorizzazione</li>
                <li>Trasmettere virus, malware o codice dannoso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Accuratezza delle Informazioni</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ci impegniamo a fornire informazioni accurate e aggiornate, tuttavia:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Non garantiamo l&apos;accuratezza, completezza o attualità di tutte le informazioni</li>
                <li>Le informazioni sui bonus possono cambiare senza preavviso</li>
                <li>Non siamo responsabili per eventuali errori o omissioni nelle informazioni</li>
                <li>Le informazioni potrebbero contenere errori tecnici o tipografici</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">Ti invitiamo sempre a verificare le informazioni ufficiali 
                sui siti istituzionali competenti prima di fare richiesta per qualsiasi bonus.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitazione di Responsabilità</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il Sito è fornito &quot;così com&apos;è&quot; senza garanzie di alcun tipo, esplicite o implicite. 
                Non garantiamo che:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Il Sito sarà sempre disponibile o privo di errori</li>
                <li>Le informazioni siano sempre accurate, complete o aggiornate</li>
                <li>Il Sito soddisfi le tue esigenze specifiche</li>
                <li>I risultati ottenuti dall&apos;utilizzo del Sito siano affidabili</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                In nessun caso saremo responsabili per danni diretti, indiretti, incidentali, speciali o 
                consequenziali derivanti dall&apos;utilizzo o dall&apos;impossibilità di utilizzare il Sito, 
                inclusi ma non limitati a perdite di dati, profitti o opportunità.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Proprietà Intellettuale</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tutti i contenuti del Sito, inclusi ma non limitati a testi, grafica, loghi, icone, immagini, 
                clip audio, download digitali e compilazioni di dati, sono di proprietà di Bonusly o dei suoi 
                fornitori di contenuti e sono protetti dalle leggi sul copyright e altre leggi sulla proprietà 
                intellettuale.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                È vietato riprodurre, distribuire, modificare, creare opere derivate, mostrare pubblicamente 
                o utilizzare commercialmente qualsiasi contenuto del Sito senza il previo consenso scritto di Bonusly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Link a Siti di Terze Parti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il Sito può contenere link a siti web di terze parti. Non siamo responsabili per il contenuto, 
                le politiche sulla privacy o le pratiche di tali siti. Ti consigliamo di leggere i termini e 
                le condizioni di qualsiasi sito di terze parti che visiti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modifiche al Servizio</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ci riserviamo il diritto di:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Modificare, sospendere o interrompere qualsiasi aspetto del Sito in qualsiasi momento</li>
                <li>Modificare o interrompere qualsiasi funzionalità senza preavviso</li>
                <li>Imporre limiti all&apos;utilizzo del Sito</li>
                <li>Rifiutare il servizio a chiunque per qualsiasi motivo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modifiche ai Termini</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche 
                entreranno in vigore dalla data di pubblicazione sul Sito. È tua responsabilità consultare 
                periodicamente questi Termini per essere informato delle eventuali modifiche.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Il continuo utilizzo del Sito dopo la pubblicazione delle modifiche costituisce accettazione 
                dei nuovi Termini.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Legge Applicabile</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questi Termini sono governati e interpretati in conformità con le leggi italiane. Qualsiasi 
                controversia derivante da o correlata a questi Termini sarà soggetta alla giurisdizione 
                esclusiva dei tribunali italiani.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Separabilità</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se una qualsiasi disposizione di questi Termini viene ritenuta non valida o inapplicabile, 
                tale disposizione sarà modificata e interpretata per raggiungere gli obiettivi di tale 
                disposizione nella misura massima possibile ai sensi della legge applicabile, e le restanti 
                disposizioni continueranno in pieno vigore ed effetto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contatti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Per qualsiasi domanda o richiesta relativa a questi Termini di Utilizzo, puoi contattarci:
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

            <section className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">⚠️ Disclaimer Importante</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le informazioni fornite su Bonusly sono a scopo puramente informativo e non costituiscono 
                consulenza legale, fiscale o finanziaria. Non siamo responsabili per eventuali decisioni 
                prese sulla base delle informazioni fornite sul Sito.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong className="text-foreground">Ti invitiamo sempre a:</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Verificare le informazioni ufficiali sui siti istituzionali competenti</li>
                <li>Consultare un professionista qualificato per consulenza specifica</li>
                <li>Leggere attentamente tutti i termini e condizioni dei bonus prima di fare richiesta</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

