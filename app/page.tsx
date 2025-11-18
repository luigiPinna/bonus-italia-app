'use client';

import { useState, useMemo } from 'react';
import { getAllBonus } from '@/lib/data';
import { applyAllFilters } from '@/lib/filters';
import { Filtri, Bonus } from '@/types/bonus';
import { BonusCard } from '@/components/bonus/bonus-card';
import { SearchBar } from '@/components/bonus/search-bar';
import { FilterSidebar } from '@/components/bonus/filter-sidebar';
import { BonusModal } from '@/components/bonus/bonus-modal';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Filter, TrendingUp, Award, Clock } from 'lucide-react';

export default function HomePage() {
  const allBonus = getAllBonus();
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

  const filteredBonus = useMemo(
    () => applyAllFilters(allBonus, filtri),
    [allBonus, filtri]
  );

  const stats = useMemo(() => {
    const attivi = allBonus.filter(b => b.status === 'attivo').length;
    const inArrivo = allBonus.filter(b => b.status === 'in_arrivo').length;
    return { total: allBonus.length, attivi, inArrivo };
  }, [allBonus]);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar
            filtri={filtri}
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          <main className="flex-1">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1">
                <SearchBar
                  value={filtri.search}
                  onChange={(value) => handleFilterChange({ search: value })}
                />
              </div>
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

            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {filteredBonus.length === allBonus.length ? (
                    <>Tutti i <span className="text-primary font-bold">{filteredBonus.length}</span> bonus disponibili</>
                  ) : (
                    <>
                      <span className="text-primary font-bold">{filteredBonus.length}</span> di {allBonus.length} bonus
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
          </main>
        </div>

        {/* Stats cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Totale Bonus</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attivi</p>
                <p className="text-2xl font-bold text-foreground">{stats.attivi}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In arrivo</p>
                <p className="text-2xl font-bold text-foreground">{stats.inArrivo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BonusModal
        bonus={selectedBonus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

