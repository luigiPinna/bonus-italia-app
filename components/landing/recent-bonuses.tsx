'use client';

import { useState } from 'react';
import { Clock, Sparkles, Euro, ArrowRight, Heart } from 'lucide-react';
import { getRecentBonus } from '@/lib/data';
import { getDaysAgo, formatCurrency, cn } from '@/lib/utils';
import { Bonus } from '@/types/bonus';
import { BonusModal } from '@/components/bonus/bonus-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';

export function RecentBonuses() {
  const recentBonus = getRecentBonus(4);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();

  const handleViewDetails = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent, bonusId: string) => {
    e.stopPropagation();
    toggleFavorite(bonusId);
  };

  const getImportoDisplay = (bonus: Bonus) => {
    if (bonus.importo.tipo === 'fisso' && bonus.importo.valore) {
      return formatCurrency(bonus.importo.valore);
    }
    if (bonus.importo.fasce_isee && bonus.importo.fasce_isee.length > 0) {
      const max = bonus.importo.fasce_isee[0].importo;
      return typeof max === 'number' ? `fino a ${formatCurrency(max)}` : max;
    }
    return 'Variabile';
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400">
            <Clock className="h-4 w-4" />
            Ultimi aggiornamenti
          </div>
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Ultimi bonus aggiunti
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            I bonus piu recenti inseriti nel nostro database
          </p>
        </div>

        {/* Grid of recent bonuses */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {recentBonus.map((bonus) => {
            const favorite = isHydrated && isFavorite(bonus.id);
            return (
              <div
                key={bonus.id}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/20 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Status indicator bar */}
                <div className={`absolute left-0 top-0 h-1 w-full ${
                  bonus.status === 'attivo' ? 'bg-green-500' :
                  bonus.status === 'scaduto' ? 'bg-red-500' :
                  'bg-amber-500'
                }`} />

                {/* New badge */}
                {bonus.data_aggiunta && (
                  <Badge className="absolute right-12 top-4 bg-green-500 text-white border-0">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Nuovo - {getDaysAgo(bonus.data_aggiunta)}
                  </Badge>
                )}

                {/* Favorite button */}
                <button
                  onClick={(e) => handleFavoriteClick(e, bonus.id)}
                  className={cn(
                    'absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all',
                    'bg-background/80 backdrop-blur-sm border border-border',
                    'hover:scale-110 active:scale-95',
                    favorite
                      ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                      : 'text-muted-foreground hover:text-red-500 hover:border-red-500/50'
                  )}
                  aria-label={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                >
                  <Heart
                    className={cn(
                      'h-4 w-4 transition-all',
                      favorite && 'fill-current'
                    )}
                  />
                </button>

                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-bold text-foreground line-clamp-1 pr-24">
                      {bonus.nome}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={`text-xs font-medium border ${
                        bonus.status === 'attivo'
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
                          : bonus.status === 'scaduto'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {bonus.status === 'attivo' ? 'Attivo' :
                       bonus.status === 'scaduto' ? 'Scaduto' :
                       'In arrivo'}
                    </Badge>
                    {bonus.categoria.slice(0, 2).map((cat, idx) => (
                      <Badge
                        key={idx}
                        className="text-xs capitalize bg-muted text-muted-foreground"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <Euro className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold text-foreground">
                    {getImportoDisplay(bonus)}
                  </span>
                </div>

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-grow">
                  {bonus.descrizione}
                </p>

                <Button
                  onClick={() => handleViewDetails(bonus)}
                  className="mt-auto w-full group/btn"
                  variant="outline"
                >
                  <span>Scopri di piu</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <BonusModal
        bonus={selectedBonus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}
