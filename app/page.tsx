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
import { Filter } from 'lucide-react';

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

  const handleFilterChange = (newFilters: Partial<Filtri>) => {
    setFiltri((prev) => ({ ...prev, ...newFilters }));
  };

  const handleViewDetails = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bonus Italia</h1>
              <p className="text-sm text-muted-foreground">
                Scopri i bonus disponibili per la tua famiglia
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtri
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar
            filtri={filtri}
            onFilterChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          <main className="flex-1">
            <div className="mb-6">
              <SearchBar
                value={filtri.search}
                onChange={(value) => handleFilterChange({ search: value })}
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredBonus.length === allBonus.length
                  ? `Tutti i ${filteredBonus.length} bonus disponibili`
                  : `${filteredBonus.length} di ${allBonus.length} bonus`}
              </p>
            </div>

            {filteredBonus.length === 0 ? (
              <div className="rounded-lg border border-border bg-muted/50 p-12 text-center">
                <p className="text-lg font-medium text-foreground">
                  Nessun bonus trovato
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prova a modificare i filtri o la ricerca
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
      </div>

      <BonusModal
        bonus={selectedBonus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

