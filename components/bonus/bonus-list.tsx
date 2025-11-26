'use client';

import { Bonus } from '@/types/bonus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Euro, ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/use-favorites';

interface BonusListProps {
  bonus: Bonus[];
  onViewDetails: (bonus: Bonus) => void;
}

export function BonusList({ bonus, onViewDetails }: BonusListProps) {
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent, bonusId: string) => {
    e.stopPropagation();
    toggleFavorite(bonusId);
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

  const getImportoDisplay = (bonus: Bonus) => {
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
    <div className="space-y-2">
      {bonus.map((item) => (
        <div
          key={item.id}
          className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:shadow-md hover:border-primary/50"
        >
          {/* Status indicator */}
          <div
            className={cn(
              'h-12 w-1 rounded-full flex-shrink-0',
              item.status === 'attivo'
                ? 'bg-green-500'
                : item.status === 'scaduto'
                ? 'bg-red-500'
                : 'bg-amber-500'
            )}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                    {item.nome}
                  </h3>
                  <button
                    onClick={(e) => handleFavoriteClick(e, item.id)}
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full transition-all flex-shrink-0',
                      'hover:scale-110 active:scale-95',
                      isHydrated && isFavorite(item.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-muted-foreground hover:text-red-500'
                    )}
                    aria-label={isHydrated && isFavorite(item.id) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4 transition-all',
                        isHydrated && isFavorite(item.id) && 'fill-current'
                      )}
                    />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {item.descrizione}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Euro className="h-4 w-4 text-primary" />
                <span className="font-bold text-foreground whitespace-nowrap">
                  {getImportoDisplay(item)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={cn(
                  'text-xs font-medium border',
                  getStatusColor(item.status)
                )}
              >
                {item.status === 'attivo'
                  ? '✓ Attivo'
                  : item.status === 'scaduto'
                  ? '✗ Scaduto'
                  : '⏳ In arrivo'}
              </Badge>
              {item.categoria.map((cat, idx) => (
                <Badge
                  key={idx}
                  className={cn(
                    'text-xs font-medium border capitalize',
                    getCategoriaColor(cat)
                  )}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={() => onViewDetails(item)}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 group/btn"
          >
            <span className="hidden sm:inline">Dettagli</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      ))}
    </div>
  );
}

