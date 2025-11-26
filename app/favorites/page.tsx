'use client';

import { useState, useMemo, useEffect } from 'react';
import { getAllBonus } from '@/lib/data';
import { applyAllFilters } from '@/lib/filters';
import { Filtri, Bonus } from '@/types/bonus';
import { BonusCard } from '@/components/bonus/bonus-card';
import { BonusTable } from '@/components/bonus/bonus-table';
import { BonusList } from '@/components/bonus/bonus-list';
import { ViewSwitcher, ViewMode } from '@/components/bonus/view-switcher';
import { SearchBar } from '@/components/bonus/search-bar';
import { FilterSidebar } from '@/components/bonus/filter-sidebar';
import { BonusModal } from '@/components/bonus/bonus-modal';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Filter, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';

export default function FavoritesPage() {
  const allBonus = getAllBonus();
  const { favorites, isHydrated } = useFavorites();
  const [filtri, setFiltri] = useState<Filtri>({
    search: '',
    isee: [],
    categorie: [],
    tipologie: [],
    eta_figli: [],
  });
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // View mode with localStorage persistence
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bonus-view-mode');
      if (saved && ['grid', 'table', 'list'].includes(saved)) {
        return saved as ViewMode;
      }
    }
    return 'grid';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bonus-view-mode', view);
    }
  }, [view]);

  // Filtra solo i bonus preferiti
  const favoriteBonus = useMemo(() => {
    if (!isHydrated) return [];
    return allBonus.filter(b => favorites.includes(b.id));
  }, [allBonus, favorites, isHydrated]);

  const filteredBonus = useMemo(
    () => applyAllFilters(favoriteBonus, filtri),
    [favoriteBonus, filtri]
  );

  const handleFilterChange = (newFilters: Partial<Filtri>) => {
    setFiltri((prev) => ({ ...prev, ...newFilters }));
  };

  const handleViewDetails = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  const hasActiveFilters = 
    filtri.isee.length > 0 ||
    filtri.categorie.length > 0 ||
    filtri.tipologie.length > 0 ||
    filtri.eta_figli.length > 0 ||
    filtri.search.length > 0;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground">Caricamento...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">I miei bonus</h1>
              <p className="text-sm text-muted-foreground">
                {favoriteBonus.length === 0
                  ? 'Nessun bonus salvato nei preferiti'
                  : `${favoriteBonus.length} ${favoriteBonus.length === 1 ? 'bonus salvato' : 'bonus salvati'}`}
              </p>
            </div>
          </div>
        </div>

        {favoriteBonus.length === 0 ? (
          <div className="rounded-xl bg-muted/30 p-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Nessun bonus nei preferiti
            </p>
            <p className="mt-2 text-sm text-muted-foreground mb-6">
            Clicca sull&apos;icona cuore sui bonus per salvarli qui
            </p>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Esplora i bonus
            </Button>
          </div>
        ) : (
          <div className="flex gap-6">
            <FilterSidebar
              filtri={filtri}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />

            <main className="flex-1">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <SearchBar
                    value={filtri.search}
                    onChange={(value) => handleFilterChange({ search: value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ViewSwitcher view={view} onViewChange={setView} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtri
                    {hasActiveFilters && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {[filtri.isee, filtri.categorie, filtri.tipologie, filtri.eta_figli].flat().length + (filtri.search ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {filteredBonus.length === favoriteBonus.length ? (
                      <>Tutti i <span className="text-primary font-bold">{filteredBonus.length}</span> bonus preferiti</>
                    ) : (
                      <>
                        <span className="text-primary font-bold">{filteredBonus.length}</span> di {favoriteBonus.length} bonus preferiti
                        {hasActiveFilters && (
                          <span className="ml-2 text-muted-foreground">
                            (filtri attivi)
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiltri({
                      search: '',
                      isee: [],
                      categorie: [],
                      tipologie: [],
                      eta_figli: [],
                    })}
                    className="text-xs"
                  >
                    Rimuovi filtri
                  </Button>
                )}
              </div>

              {filteredBonus.length === 0 ? (
                <div className="rounded-xl bg-muted/30 p-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Filter className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Nessun bonus trovato
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prova a modificare i filtri o la ricerca per trovare altri bonus
                  </p>
                </div>
              ) : (
                <>
                  {view === 'grid' && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredBonus.map((bonus) => (
                        <BonusCard
                          key={bonus.id}
                          bonus={bonus}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                  {view === 'table' && (
                    <BonusTable
                      bonus={filteredBonus}
                      onViewDetails={handleViewDetails}
                    />
                  )}
                  {view === 'list' && (
                    <BonusList
                      bonus={filteredBonus}
                      onViewDetails={handleViewDetails}
                    />
                  )}
                </>
              )}
            </main>
          </div>
        )}
      </div>

      <BonusModal
        bonus={selectedBonus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

