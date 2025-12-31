export type BonusStatus = 'attivo' | 'scaduto' | 'in_arrivo' | 'sperimentale' | 'in_scadenza';

export type Categoria = 'natalità' | 'famiglia' | 'educazione' | 'casa' | 'lavoro' | 'utenze' | 'sostegno_alimentare' | 'salute' | 'anziani' | 'cultura';

export type TipologiaErogazione = 'una_tantum' | 'mensile' | 'annuale';

export type FasciaIsee = {
  min: number | null;
  max: number | null;
  importo: number | string;
};

export interface Requisito {
  tipo: string;
  descrizione: string;
}

export interface Bonus {
  id: string;
  nome: string;
  categoria: Categoria[];
  status: BonusStatus;
  descrizione: string;
  importo: {
    tipo: 'fisso' | 'variabile';
    valore?: number;
    fasce_isee?: FasciaIsee[];
    note?: string;
  };
  isee: {
    richiesto: boolean;
    max?: number;
    min?: number;
    note?: string;
  };
  requisiti: {
    cittadinanza?: string;
    residenza?: string;
    eta_figli?: string[];
    altri?: Requisito[];
  };
  scadenza?: {
    data?: string;
    note?: string;
  };
  link_ufficiale: string;
  come_fare_domanda: {
    metodo: string;
    documenti?: string[];
    link?: string;
    note?: string;
  };
  compatibilita?: string[];
  note_aggiuntive?: string;
}

export interface BonusData {
  bonus: Bonus[];
  ultimo_aggiornamento: string;
}

export interface Filtri {
  search: string;
  isee: string[];
  categorie: string[];
  tipologie: string[];
  eta_figli: string[];
  status: string[];
}

