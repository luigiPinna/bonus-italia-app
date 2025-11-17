import { Bonus } from '@/types/bonus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Euro, Calendar, Users } from 'lucide-react';

interface BonusCardProps {
  bonus: Bonus;
  onViewDetails: (bonus: Bonus) => void;
}

export function BonusCard({ bonus, onViewDetails }: BonusCardProps) {
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
      const min = bonus.importo.fasce_isee[0].importo;
      const max = bonus.importo.fasce_isee[bonus.importo.fasce_isee.length - 1].importo;
      return `${typeof min === 'number' ? formatCurrency(min) : min} - ${typeof max === 'number' ? formatCurrency(max) : max}`;
    }
    return 'Variabile';
  };

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-foreground">{bonus.nome}</h3>
          <Badge variant={getStatusVariant(bonus.status)}>{bonus.status}</Badge>
        </div>
        <Badge variant="default" className="ml-2 capitalize">
          {bonus.categoria}
        </Badge>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{bonus.descrizione}</p>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Euro className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">Importo:</span>
          <span className="text-muted-foreground">{getImportoDisplay()}</span>
        </div>

        {bonus.isee.richiesto && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">ISEE:</span>
            <span className="text-muted-foreground">
              {bonus.isee.max ? `fino a ${formatCurrency(bonus.isee.max)}` : 'richiesto'}
            </span>
          </div>
        )}

        {bonus.scadenza?.data && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Scadenza:</span>
            <span className="text-muted-foreground">{bonus.scadenza.data}</span>
          </div>
        )}
      </div>

      <Button
        onClick={() => onViewDetails(bonus)}
        className="mt-auto w-full"
        variant="outline"
      >
        Vedi dettagli
      </Button>
    </div>
  );
}

