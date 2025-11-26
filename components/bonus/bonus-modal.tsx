import { Bonus } from '@/types/bonus';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ExternalLink, Euro, Calendar, Users, FileText, CheckCircle, Sparkles, Info } from 'lucide-react';

interface BonusModalProps {
  bonus: Bonus | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BonusModal({ bonus, open, onOpenChange }: BonusModalProps) {
  if (!bonus) return null;

  const getStatusVariant = (status: Bonus['status']) => {
    switch (status) {
      case 'attivo':
        return 'success';
      case 'scaduto':
        return 'destructive';
      case 'in_arrivo':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: Bonus['status']) => {
    switch (status) {
      case 'attivo':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'scaduto':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'in_arrivo':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      default:
        return '';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    const colors: Record<string, string> = {
      natalità: 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20',
      famiglia: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      educazione: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
      casa: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
      lavoro: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
      utenze: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
      sostegno_alimentare: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
      salute: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
      anziani: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
      cultura: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
    };
    return colors[categoria] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
  };

  const getImportoDisplay = () => {
    if (bonus.importo.tipo === 'fisso' && bonus.importo.valore) {
      return formatCurrency(bonus.importo.valore);
    }
    if (bonus.importo.fasce_isee && bonus.importo.fasce_isee.length > 0) {
      return (
        <div className="space-y-2">
          {bonus.importo.fasce_isee.map((fascia, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-md bg-muted/50 p-3 text-sm">
              <span className="text-muted-foreground">
                {fascia.min === null && fascia.max === null
                  ? 'Tutte le fasce'
                  : fascia.min === null
                    ? `Fino a ${formatCurrency(fascia.max as number)}`
                    : fascia.max === null
                      ? `Oltre ${formatCurrency(fascia.min)}`
                      : `${formatCurrency(fascia.min)} - ${formatCurrency(fascia.max)}`}
              </span>
              <span className="font-semibold text-foreground">
                {typeof fascia.importo === 'number' ? formatCurrency(fascia.importo) : fascia.importo}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return 'Variabile';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold leading-tight">{bonus.nome}</DialogTitle>
              <DialogDescription className="mt-2 text-base leading-relaxed">
                {bonus.descrizione}
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className={`border font-medium ${getStatusColor(bonus.status)}`}>
              {bonus.status === 'attivo' ? '✓ Attivo' : 
               bonus.status === 'scaduto' ? '✗ Scaduto' : 
               '⏳ In arrivo'}
            </Badge>
            {bonus.categoria.map((cat, idx) => (
              <Badge 
                key={idx}
                className={`border font-medium capitalize ${getCategoriaColor(cat)}`}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 pt-4">
            <section className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Euro className="h-5 w-5 text-primary" />
                Importo
              </h3>
              <div className="space-y-3">
                {typeof getImportoDisplay() === 'string' ? (
                  <div className="text-2xl font-bold text-foreground">{getImportoDisplay()}</div>
                ) : (
                  getImportoDisplay()
                )}
                {bonus.importo.note && (
                  <div className="flex gap-2 rounded-lg bg-background/50 p-3">
                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{bonus.importo.note}</p>
                  </div>
                )}
              </div>
            </section>

            {bonus.isee.richiesto && (
              <section className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Users className="h-5 w-5" />
                  Requisiti ISEE
                </h3>
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {bonus.isee.max
                      ? `ISEE massimo: ${formatCurrency(bonus.isee.max)}`
                      : bonus.isee.min
                        ? `ISEE minimo: ${formatCurrency(bonus.isee.min)}`
                        : 'ISEE richiesto'}
                  </p>
                  {bonus.isee.note && (
                    <p className="text-sm text-muted-foreground">{bonus.isee.note}</p>
                  )}
                </div>
              </section>
            )}

            <section className="rounded-xl bg-muted/30 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <CheckCircle className="h-5 w-5" />
                Requisiti
              </h3>
              <div className="space-y-3">
                {bonus.requisiti.cittadinanza && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <span className="text-sm font-medium">Cittadinanza:</span>
                      <span className="ml-2 text-sm text-muted-foreground">{bonus.requisiti.cittadinanza}</span>
                    </div>
                  </div>
                )}
                {bonus.requisiti.residenza && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <span className="text-sm font-medium">Residenza:</span>
                      <span className="ml-2 text-sm text-muted-foreground">{bonus.requisiti.residenza}</span>
                    </div>
                  </div>
                )}
                {bonus.requisiti.eta_figli && bonus.requisiti.eta_figli.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <span className="text-sm font-medium">Età figli:</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {bonus.requisiti.eta_figli.join(', ')}
                      </span>
                    </div>
                  </div>
                )}
                {bonus.requisiti.altri && bonus.requisiti.altri.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {bonus.requisiti.altri.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                        <div>
                          <span className="text-sm font-medium">{req.tipo}:</span>
                          <span className="ml-2 text-sm text-muted-foreground">{req.descrizione}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {bonus.scadenza && (
              <section className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Calendar className="h-5 w-5" />
                  Scadenza
                </h3>
                <div className="space-y-2">
                  {bonus.scadenza.data && (
                    <p className="text-sm font-medium">
                      {formatDate(bonus.scadenza.data)}
                    </p>
                  )}
                  {bonus.scadenza.note && (
                    <p className="text-sm text-muted-foreground">{bonus.scadenza.note}</p>
                  )}
                </div>
              </section>
            )}

            <section className="rounded-xl bg-muted/30 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <FileText className="h-5 w-5" />
                Come fare domanda
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Metodo:</span>
                  <span className="ml-2 text-sm text-muted-foreground">{bonus.come_fare_domanda.metodo}</span>
                </div>
                {bonus.come_fare_domanda.documenti && bonus.come_fare_domanda.documenti.length > 0 && (
                  <div>
                    <p className="mb-3 text-sm font-medium">Documenti richiesti:</p>
                    <ul className="space-y-2">
                      {bonus.come_fare_domanda.documenti.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {bonus.come_fare_domanda.note && (
                  <div className="flex gap-2 rounded-lg bg-background/50 p-3">
                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{bonus.come_fare_domanda.note}</p>
                  </div>
                )}
              </div>
            </section>

            {bonus.compatibilita && bonus.compatibilita.length > 0 && (
              <section className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-3 text-lg font-semibold">Compatibilità</h3>
                <p className="text-sm text-muted-foreground">
                  Questo bonus è cumulabile con: <span className="font-medium text-foreground">{bonus.compatibilita.join(', ')}</span>
                </p>
              </section>
            )}

            {bonus.note_aggiuntive && (
              <section className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-3 text-lg font-semibold">Note aggiuntive</h3>
                <p className="text-sm text-muted-foreground">{bonus.note_aggiuntive}</p>
              </section>
            )}

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                className="flex-1 !h-auto !py-1"
                onClick={() => window.open(bonus.link_ufficiale, '_blank')}
              >
                Vai al sito ufficiale INPS
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              {bonus.come_fare_domanda.link && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(bonus.come_fare_domanda.link, '_blank')}
                >
                  Fai domanda
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

