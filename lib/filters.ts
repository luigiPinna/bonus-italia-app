import { Bonus, Filtri } from '@/types/bonus';

export const filterBySearch = (bonus: Bonus[], search: string): Bonus[] => {
  if (!search.trim()) return bonus;

  const searchLower = search.toLowerCase();
  return bonus.filter(
    (b) =>
      b.nome.toLowerCase().includes(searchLower) ||
      b.descrizione.toLowerCase().includes(searchLower) ||
      b.categoria.some((cat) => cat.toLowerCase().includes(searchLower))
  );
};

export const filterByIsee = (bonus: Bonus[], iseeFasce: string[]): Bonus[] => {
  if (iseeFasce.length === 0) return bonus;

  return bonus.filter((b) => {
    if (!b.isee.richiesto) return true;

    return iseeFasce.some((fascia) => {
      // Gestione "oltre 40000" (40000+)
      if (fascia.includes('+')) {
        const minFascia = parseInt(fascia.replace('+', ''));
        const bonusMax = b.isee.max;
        const bonusMin = b.isee.min || 0;
        
        // Se il bonus ha un max definito e è <= al minimo della fascia, non è compatibile
        // Es: bonus con max 40000 NON è compatibile con fascia "oltre 40000" (accetta solo fino a 40000)
        // Es: bonus con max 30000 NON è compatibile con fascia "oltre 40000"
        if (bonusMax !== undefined && bonusMax <= minFascia) return false;
        
        // Se il bonus ha un min definito e superiore al minimo della fascia, non accetta quella fascia
        // Es: bonus con min 50000 non accetta ISEE nella fascia "oltre 40000" (perché richiede almeno 50000)
        if (bonusMin > minFascia) return false;
        
        // Altrimenti è compatibile (bonus con max > 40000 o senza max definito)
        return true;
      }

      // Gestione fasce normali (es: "17000-25000")
      const parts = fascia.split('-');
      const minFascia = parseInt(parts[0]);
      const maxFascia = parseInt(parts[1]);
      
      const bonusMax = b.isee.max;
      const bonusMin = b.isee.min || 0;

      // Se il bonus non ha max definito, accetta tutte le fasce
      if (bonusMax === undefined) return true;

      // Il bonus è compatibile se:
      // - Il max del bonus è >= al minimo della fascia (accetta ISEE nella fascia)
      // - Il min del bonus è <= al massimo della fascia (non esclude la fascia)
      // Es: bonus con max 40000 e min 0 è compatibile con fascia "17000-25000"
      // Es: bonus con max 25000 e min 0 è compatibile con fascia "17000-25000"
      // Es: bonus con max 15000 e min 0 NON è compatibile con fascia "17000-25000"
      return bonusMax >= minFascia && bonusMin <= maxFascia;
    });
  });
};

export const filterByCategorie = (bonus: Bonus[], categorie: string[]): Bonus[] => {
  if (categorie.length === 0) return bonus;
  return bonus.filter((b) => 
    b.categoria.some((cat) => categorie.includes(cat))
  );
};

export const filterByTipologie = (bonus: Bonus[], tipologie: string[]): Bonus[] => {
  if (tipologie.length === 0) return bonus;

  return bonus.filter((b) => {
    const nomeLower = b.nome.toLowerCase();
    const descLower = b.descrizione.toLowerCase();

    let tipo: string;
    if (b.importo.tipo === 'fisso') {
      tipo = 'una_tantum';
    } else if (nomeLower.includes('mensile') || descLower.includes('mensile')) {
      tipo = 'mensile';
    } else if (nomeLower.includes('annuale') || descLower.includes('annuale') || nomeLower.includes('annuo')) {
      tipo = 'annuale';
    } else {
      tipo = 'una_tantum';
    }

    return tipologie.includes(tipo);
  });
};

export const filterByEtaFigli = (bonus: Bonus[], etaFigli: string[]): Bonus[] => {
  if (etaFigli.length === 0) return bonus;

  return bonus.filter((b) => {
    if (!b.requisiti.eta_figli) return false;
    return b.requisiti.eta_figli.some((eta) => etaFigli.includes(eta));
  });
};

export const filterByStatus = (bonus: Bonus[], status: string[]): Bonus[] => {
  if (status.length === 0) return bonus;
  return bonus.filter((b) => status.includes(b.status));
};

export const applyAllFilters = (bonus: Bonus[], filtri: Filtri): Bonus[] => {
  let filtered = bonus;

  filtered = filterBySearch(filtered, filtri.search);
  filtered = filterByIsee(filtered, filtri.isee);
  filtered = filterByCategorie(filtered, filtri.categorie);
  filtered = filterByTipologie(filtered, filtri.tipologie);
  filtered = filterByEtaFigli(filtered, filtri.eta_figli);
  filtered = filterByStatus(filtered, filtri.status);

  return filtered;
};

