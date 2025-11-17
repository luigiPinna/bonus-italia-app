import { Bonus } from '@/types/bonus';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ExternalLink, Euro, Calendar, Users, FileText, CheckCircle } from 'lucide-react';

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

  const getImportoDisplay = () => {
    if (bonus.importo.tipo === 'fisso' && bonus.importo.valore) {
      return formatCurrency(bonus.importo.valore);
    }
    if (bonus.importo.fasce_isee && bonus.importo.fasce_isee.length > 0) {
      return (
        <div className="space-y-1">
          {bonus.importo.fasce_isee.map((fascia, idx) => (
            <div key={idx} className="text-sm">
              {fascia.min === null && fascia.max === null
                ? 'Tutte le fasce'
                : fascia.min === null
                  ? `Fino a ${formatCurrency(fascia.max as number)}: ${typeof fascia.importo === 'number' ? formatCurrency(fascia.importo) : fascia.importo}`
                  : fascia.max === null
                    ? `Oltre ${formatCurrency(fascia.min)}: ${typeof fascia.importo === 'number' ? formatCurrency(fascia.importo) : fascia.importo}`
                    : `${formatCurrency(fascia.min)} - ${formatCurrency(fascia.max)}: ${typeof fascia.importo === 'number' ? formatCurrency(fascia.importo) : fascia.importo}`}
            </div>
          ))}
        </div>
      );
    }
    return 'Variabile';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle className="text-2xl font-bold">{bonus.nome}</DialogTitle>
        <DialogDescription className="text-base">{bonus.descrizione}</DialogDescription>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={getStatusVariant(bonus.status)}>{bonus.status}</Badge>
          <Badge variant="default" className="capitalize">
            {bonus.categoria}
          </Badge>
        </div>

        <div className="mt-6 space-y-6">
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Euro className="h-5 w-5" />
              Importo
            </h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              {typeof getImportoDisplay() === 'string' ? (
                <p className="text-lg font-medium">{getImportoDisplay()}</p>
              ) : (
                getImportoDisplay()
              )}
              {bonus.importo.note && (
                <p className="mt-2 text-sm text-muted-foreground">{bonus.importo.note}</p>
              )}
            </div>
          </section>

          {bonus.isee.richiesto && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5" />
                Requisiti ISEE
              </h3>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-sm">
                  {bonus.isee.max
                    ? `ISEE massimo: ${formatCurrency(bonus.isee.max)}`
                    : bonus.isee.min
                      ? `ISEE minimo: ${formatCurrency(bonus.isee.min)}`
                      : 'ISEE richiesto'}
                </p>
                {bonus.isee.note && (
                  <p className="mt-2 text-sm text-muted-foreground">{bonus.isee.note}</p>
                )}
              </div>
            </section>
          )}

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <CheckCircle className="h-5 w-5" />
              Requisiti
            </h3>
            <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
              {bonus.requisiti.cittadinanza && (
                <p className="text-sm">
                  <span className="font-medium">Cittadinanza:</span> {bonus.requisiti.cittadinanza}
                </p>
              )}
              {bonus.requisiti.residenza && (
                <p className="text-sm">
                  <span className="font-medium">Residenza:</span> {bonus.requisiti.residenza}
                </p>
              )}
              {bonus.requisiti.eta_figli && bonus.requisiti.eta_figli.length > 0 && (
                <p className="text-sm">
                  <span className="font-medium">Età figli:</span>{' '}
                  {bonus.requisiti.eta_figli.join(', ')}
                </p>
              )}
              {bonus.requisiti.altri && bonus.requisiti.altri.length > 0 && (
                <div className="mt-3 space-y-2">
                  {bonus.requisiti.altri.map((req, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{req.tipo}:</span> {req.descrizione}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {bonus.scadenza && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Calendar className="h-5 w-5" />
                Scadenza
              </h3>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                {bonus.scadenza.data && (
                  <p className="text-sm font-medium">
                    {formatDate(bonus.scadenza.data)}
                  </p>
                )}
                {bonus.scadenza.note && (
                  <p className="mt-2 text-sm text-muted-foreground">{bonus.scadenza.note}</p>
                )}
              </div>
            </section>
          )}

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <FileText className="h-5 w-5" />
              Come fare domanda
            </h3>
            <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm">
                <span className="font-medium">Metodo:</span> {bonus.come_fare_domanda.metodo}
              </p>
              {bonus.come_fare_domanda.documenti && bonus.come_fare_domanda.documenti.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Documenti richiesti:</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {bonus.come_fare_domanda.documenti.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
              {bonus.come_fare_domanda.note && (
                <p className="text-sm text-muted-foreground">{bonus.come_fare_domanda.note}</p>
              )}
            </div>
          </section>

          {bonus.compatibilita && bonus.compatibilita.length > 0 && (
            <section>
              <h3 className="mb-3 text-lg font-semibold">Compatibilità</h3>
              <p className="text-sm text-muted-foreground">
                Questo bonus è cumulabile con: {bonus.compatibilita.join(', ')}
              </p>
            </section>
          )}

          {bonus.note_aggiuntive && (
            <section>
              <h3 className="mb-3 text-lg font-semibold">Note aggiuntive</h3>
              <p className="text-sm text-muted-foreground">{bonus.note_aggiuntive}</p>
            </section>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1"
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
      </DialogContent>
    </Dialog>
  );
}

