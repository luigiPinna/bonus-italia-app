'use client';

import { Bonus } from '@/types/bonus';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';

interface BonusTableProps {
  bonus: Bonus[];
  onViewDetails: (bonus: Bonus) => void;
}

export function BonusTable({ bonus, onViewDetails }: BonusTableProps) {
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
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Nome Bonus
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Importo
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Categoria
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground hidden lg:table-cell">
              ISEE
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground hidden xl:table-cell">
              Scadenza
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-foreground w-12">
              <span className="sr-only">Preferiti</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bonus.map((item) => (
            <tr
              key={item.id}
              onClick={() => onViewDetails(item)}
              className="border-b border-border bg-background transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-foreground">{item.nome}</div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {item.descrizione}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="font-semibold text-foreground">
                  {getImportoDisplay(item)}
                </div>
              </td>
              <td className="px-4 py-3">
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
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {item.categoria.slice(0, 2).map((cat, idx) => (
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
                  {item.categoria.length > 2 && (
                    <Badge className="text-xs font-medium border bg-muted text-muted-foreground">
                      +{item.categoria.length - 2}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <div className="text-sm text-foreground">
                  {item.isee.richiesto
                    ? item.isee.max
                      ? `fino a ${formatCurrency(item.isee.max)}`
                      : 'richiesto'
                    : 'non richiesto'}
                </div>
              </td>
              <td className="px-4 py-3 hidden xl:table-cell">
                <div className="text-sm text-foreground">
                  {item.scadenza?.data || '-'}
                </div>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={(e) => handleFavoriteClick(e, item.id)}
                  className={cn(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full transition-all',
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

