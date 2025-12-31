'use client';

import { Filtri } from '@/types/bonus';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filtri: Filtri;
  onFilterChange: (filtri: Partial<Filtri>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ISEE_FASCE = [
  { label: 'Fino a 17.000€', value: '0-17000' },
  { label: '17.000€ - 25.000€', value: '17000-25000' },
  { label: '25.000€ - 40.000€', value: '25000-40000' },
  { label: 'Oltre 40.000€', value: '40000+' },
];

const CATEGORIE = ['natalità', 'famiglia', 'educazione', 'casa', 'lavoro', 'utenze', 'sostegno_alimentare', 'salute', 'anziani', 'cultura'];

const TIPOLOGIE = [
  { label: 'Una tantum', value: 'una_tantum' },
  { label: 'Mensile', value: 'mensile' },
  { label: 'Annuale', value: 'annuale' },
];

const ETA_FIGLI = [
  { label: 'Gravidanza', value: 'gravidanza' },
  { label: '0-1 anni', value: '0-1' },
  { label: '1-3 anni', value: '1-3' },
  { label: '3-18 anni', value: '3-18' },
  { label: '18-21 anni', value: '18-21' },
  { label: 'Disabili', value: 'disabili' },
];

const STATI = [
  { label: 'Attivi', value: 'attivo' },
  { label: 'In arrivo', value: 'in_arrivo' },
  { label: 'Scaduti', value: 'scaduto' },
  { label: 'In scadenza', value: 'in_scadenza' },
  { label: 'Sperimentali', value: 'sperimentale' },
];

export function FilterSidebar({ filtri, onFilterChange, isOpen, onToggle }: FilterSidebarProps) {
  const toggleFilter = (type: keyof Filtri, value: string) => {
    const current = filtri[type] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ [type]: updated });
  };

  const clearFilters = () => {
    onFilterChange({
      isee: [],
      categorie: [],
      tipologie: [],
      eta_figli: [],
      status: [],
    });
  };

  const hasActiveFilters =
    filtri.isee.length > 0 ||
    filtri.categorie.length > 0 ||
    filtri.tipologie.length > 0 ||
    filtri.eta_figli.length > 0 ||
    filtri.status.length > 0;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-80 transform border-r border-border bg-background p-6 transition-transform duration-300 ease-in-out lg:relative lg:z-auto lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold">Filtri</h2>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6 overflow-y-auto pb-6">
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
              Rimuovi tutti i filtri
            </Button>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold">Fasce ISEE</h3>
            <div className="space-y-2">
              {ISEE_FASCE.map((fascia) => (
                <label
                  key={fascia.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={filtri.isee.includes(fascia.value)}
                    onChange={() => toggleFilter('isee', fascia.value)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span>{fascia.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Categoria</h3>
            <div className="space-y-2">
              {CATEGORIE.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 text-sm capitalize"
                >
                  <input
                    type="checkbox"
                    checked={filtri.categorie.includes(cat)}
                    onChange={() => toggleFilter('categorie', cat)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Tipologia</h3>
            <div className="space-y-2">
              {TIPOLOGIE.map((tip) => (
                <label
                  key={tip.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={filtri.tipologie.includes(tip.value)}
                    onChange={() => toggleFilter('tipologie', tip.value)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span>{tip.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Età figli</h3>
            <div className="space-y-2">
              {ETA_FIGLI.map((eta) => (
                <label
                  key={eta.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={filtri.eta_figli.includes(eta.value)}
                    onChange={() => toggleFilter('eta_figli', eta.value)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span>{eta.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Stato</h3>
            <div className="space-y-2">
              {STATI.map((stato) => (
                <label
                  key={stato.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={filtri.status.includes(stato.value)}
                    onChange={() => toggleFilter('status', stato.value)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span>{stato.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

