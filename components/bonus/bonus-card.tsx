import { Bonus } from '@/types/bonus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Euro, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';

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
    };
    return colors[categoria] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
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

  const getImportoType = () => {
    if (bonus.importo.tipo === 'fisso') return 'una tantum';
    if (bonus.importo.fasce_isee) {
      const firstImporto = bonus.importo.fasce_isee[0].importo;
      if (typeof firstImporto === 'number' && firstImporto < 300) return 'mensile';
      return 'annuale';
    }
    return '';
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/20 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Status indicator bar */}
      <div className={`absolute left-0 top-0 h-1 w-full ${
        bonus.status === 'attivo' ? 'bg-green-500' :
        bonus.status === 'scaduto' ? 'bg-red-500' :
        'bg-amber-500'
      }`} />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
            <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-tight">
              {bonus.nome}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge 
              className={`text-xs font-medium border ${getStatusColor(bonus.status)}`}
            >
              {bonus.status === 'attivo' ? '✓ Attivo' : 
               bonus.status === 'scaduto' ? '✗ Scaduto' : 
               '⏳ In arrivo'}
            </Badge>
            <Badge 
              className={`text-xs font-medium border capitalize ${getCategoriaColor(bonus.categoria)}`}
            >
              {bonus.categoria}
            </Badge>
          </div>
        </div>
      </div>

      {/* Importo prominente */}
      <div className="mb-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-4">
        <div className="flex items-baseline gap-2">
          <Euro className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-2xl font-bold text-foreground">
              {getImportoDisplay()}
            </div>
            {getImportoType() && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {getImportoType()}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
        {bonus.descrizione}
      </p>

      {/* Info chiave compatte */}
      <div className="mb-4 space-y-2">
        {bonus.isee.richiesto && (
          <div className="flex items-center gap-2 text-xs">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">ISEE:</span>
            <span className="font-medium text-foreground">
              {bonus.isee.max ? `fino a ${formatCurrency(bonus.isee.max)}` : 'richiesto'}
            </span>
          </div>
        )}

        {bonus.scadenza?.data && (
          <div className="flex items-center gap-2 text-xs">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">Scadenza:</span>
            <span className="font-medium text-foreground">{bonus.scadenza.data}</span>
          </div>
        )}

        {bonus.requisiti.eta_figli && bonus.requisiti.eta_figli.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">Età:</span>
            <span className="font-medium text-foreground">
              {bonus.requisiti.eta_figli.join(', ')}
            </span>
          </div>
        )}
      </div>

      <Button
        onClick={() => onViewDetails(bonus)}
        className="mt-auto w-full group/btn"
        variant="outline"
      >
        <span>Scopri di più</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>
  );
}

