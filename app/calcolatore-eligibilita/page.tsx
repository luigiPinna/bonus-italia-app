'use client';

import { useState, useMemo } from 'react';
import { getAllBonus } from '@/lib/data';
import { filterByEligibility, EligibilityData } from '@/lib/eligibility';
import { Bonus } from '@/types/bonus';
import { BonusCard } from '@/components/bonus/bonus-card';
import { BonusModal } from '@/components/bonus/bonus-modal';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, X, CheckCircle2, AlertCircle } from 'lucide-react';

const REGIONI = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
  'Toscana', 'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto'
];

const ETA_FIGLIO_OPTIONS = [
  { value: 'gravidanza', label: 'In gravidanza' },
  { value: '0-1', label: '0-1 anno' },
  { value: '1-3', label: '1-3 anni' },
  { value: '3-18', label: '3-18 anni' },
  { value: '18-21', label: '18-21 anni' },
  { value: 'disabile', label: 'Disabile (senza limiti di età)' },
];

export default function CalcolatoreEligibilitaPage() {
  const allBonus = getAllBonus();
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<EligibilityData>({
    residenza: 'Italia',
    cittadinanza: 'Italiana',
    figli: [],
  });

  const eligibleBonus = useMemo(() => {
    if (!formData.residenza || !formData.cittadinanza) {
      return [];
    }
    return filterByEligibility(allBonus, formData);
  }, [formData, allBonus]);

  const handleInputChange = (field: keyof EligibilityData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFiglio = () => {
    setFormData(prev => ({
      ...prev,
      figli: [...prev.figli, { eta: '0-1', disabile: false }]
    }));
  };

  const removeFiglio = (index: number) => {
    setFormData(prev => ({
      ...prev,
      figli: prev.figli.filter((_, i) => i !== index)
    }));
  };

  const updateFiglio = (index: number, field: 'eta' | 'disabile', value: any) => {
    setFormData(prev => ({
      ...prev,
      figli: prev.figli.map((figlio, i) => 
        i === index ? { ...figlio, [field]: value } : figlio
      )
    }));
  };

  const handleViewDetails = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      residenza: 'Italia',
      cittadinanza: 'Italiana',
      figli: [],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            
            <div>
              
              <p className="text-muted-foreground mt-1">
                Inserisci i tuoi dati per scoprire quali bonus sono compatibili con la tua situazione
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-xl bg-card border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-foreground">I tuoi dati</h2>
                
                <div className="space-y-6">
                  {/* ISEE */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      ISEE (€)
                    </label>
                    <input
                      type="number"
                      value={formData.isee || ''}
                      onChange={(e) => handleInputChange('isee', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Es: 25000"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Inserisci il tuo ISEE se disponibile
                    </p>
                  </div>

                  {/* ISEE Sociosanitario */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      ISEE Sociosanitario (€)
                    </label>
                    <input
                      type="number"
                      value={formData.iseeSociosanitario || ''}
                      onChange={(e) => handleInputChange('iseeSociosanitario', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Es: 5000"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Per bonus sanitari specifici
                    </p>
                  </div>

                  {/* Reddito Complessivo */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Reddito Complessivo (€)
                    </label>
                    <input
                      type="number"
                      value={formData.redditoComplessivo || ''}
                      onChange={(e) => handleInputChange('redditoComplessivo', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Es: 8000"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Per alcuni bonus specifici (es. Carta Acquisti)
                    </p>
                  </div>

                  {/* Residenza */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Residenza
                    </label>
                    <select
                      value={formData.residenza}
                      onChange={(e) => handleInputChange('residenza', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Italia">Italia</option>
                      {REGIONI.map(regione => (
                        <option key={regione} value={regione}>{regione}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cittadinanza */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Cittadinanza
                    </label>
                    <select
                      value={formData.cittadinanza}
                      onChange={(e) => handleInputChange('cittadinanza', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Italiana">Italiana</option>
                      <option value="UE">Cittadino UE</option>
                      <option value="Permesso soggiorno">Permesso di soggiorno</option>
                    </select>
                  </div>

                  {/* Età Richiedente */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Età Richiedente
                    </label>
                    <input
                      type="number"
                      value={formData.etaRichiedente || ''}
                      onChange={(e) => handleInputChange('etaRichiedente', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Es: 35"
                      min="0"
                      max="120"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Per bonus legati all&apos;età (es. over 80, 18 anni)
                    </p>
                  </div>

                  {/* Numero Componenti Famiglia */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Numero Componenti Famiglia
                    </label>
                    <input
                      type="number"
                      value={formData.numeroComponenti || ''}
                      onChange={(e) => handleInputChange('numeroComponenti', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Es: 4"
                      min="1"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Status Lavorativo */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Status Lavorativo
                    </label>
                    <select
                      value={formData.statusLavorativo || ''}
                      onChange={(e) => handleInputChange('statusLavorativo', e.target.value || undefined)}
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Non specificato</option>
                      <option value="dipendente">Dipendente</option>
                      <option value="autonomo">Autonomo/Partita IVA</option>
                      <option value="disoccupato">Disoccupato</option>
                      <option value="pensionato">Pensionato</option>
                      <option value="studente">Studente</option>
                    </select>
                  </div>

                  {/* Titolarità Immobili */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.titolaritaImmobili || false}
                        onChange={(e) => handleInputChange('titolaritaImmobili', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-foreground">
                        Titolarità di immobili
                      </span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Per bonus casa e ristrutturazioni
                    </p>
                  </div>

                  {/* Presenza Disabili */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.presenzaDisabili || false}
                        onChange={(e) => handleInputChange('presenzaDisabili', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-foreground">
                        Presenza di disabili in famiglia
                      </span>
                    </label>
                  </div>

                  {/* Figli */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-foreground">
                        Figli a carico
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFiglio}
                        className="h-8"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Aggiungi
                      </Button>
                    </div>

                    {formData.figli.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">
                        Nessun figlio aggiunto
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formData.figli.map((figlio, index) => (
                          <div key={index} className="flex gap-2 items-start p-3 rounded-lg border bg-muted/30">
                            <div className="flex-1 space-y-2">
                              <select
                                value={figlio.eta}
                                onChange={(e) => updateFiglio(index, 'eta', e.target.value)}
                                className="w-full px-3 py-1.5 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              >
                                {ETA_FIGLIO_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={figlio.disabile || false}
                                  onChange={(e) => updateFiglio(index, 'disabile', e.target.checked)}
                                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-xs text-foreground">Disabile</span>
                              </label>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFiglio(index)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reset Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="w-full"
                  >
                    Reset Form
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Risultati */}
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-xl bg-card border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                {eligibleBonus.length > 0 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {eligibleBonus.length} bonus compatibili
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {eligibleBonus.length === 0 
                      ? 'Inserisci i tuoi dati per vedere i bonus disponibili'
                      : `Trovati ${eligibleBonus.length} bonus su ${allBonus.length} totali`
                    }
                  </p>
                </div>
              </div>
            </div>

            {eligibleBonus.length === 0 ? (
              <div className="rounded-xl bg-muted/30 p-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calculator className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold text-foreground">
                  Nessun bonus compatibile
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Completa il form con i tuoi dati per vedere i bonus disponibili per la tua situazione
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {eligibleBonus.map((bonus) => (
                  <BonusCard
                    key={bonus.id}
                    bonus={bonus}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
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

