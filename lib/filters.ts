import { Bonus, Filtri } from '@/types/bonus';

export const filterBySearch = (bonus: Bonus[], search: string): Bonus[] => {
  if (!search.trim()) return bonus;

  const searchLower = search.toLowerCase();
  return bonus.filter(
    (b) =>
      b.nome.toLowerCase().includes(searchLower) ||
      b.descrizione.toLowerCase().includes(searchLower) ||
      b.categoria.toLowerCase().includes(searchLower)
  );
};

export const filterByIsee = (bonus: Bonus[], iseeFasce: string[]): Bonus[] => {
  if (iseeFasce.length === 0) return bonus;

  return bonus.filter((b) => {
    if (!b.isee.richiesto) return true;

    return iseeFasce.some((fascia) => {
      if (fascia.includes('+')) {
        const min = parseInt(fascia.replace('+', ''));
        const bonusMax = b.isee.max;
        return bonusMax === undefined || bonusMax >= min;
      }

      const parts = fascia.split('-');
      const min = parseInt(parts[0]);
      const max = parseInt(parts[1]);
      const bonusMax = b.isee.max;
      const bonusMin = b.isee.min || 0;

      if (bonusMax === undefined) return true;

      return bonusMax >= min && bonusMin <= max;
    });
  });
};

export const filterByCategorie = (bonus: Bonus[], categorie: string[]): Bonus[] => {
  if (categorie.length === 0) return bonus;
  return bonus.filter((b) => categorie.includes(b.categoria));
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

export const applyAllFilters = (bonus: Bonus[], filtri: Filtri): Bonus[] => {
  let filtered = bonus;

  filtered = filterBySearch(filtered, filtri.search);
  filtered = filterByIsee(filtered, filtri.isee);
  filtered = filterByCategorie(filtered, filtri.categorie);
  filtered = filterByTipologie(filtered, filtri.tipologie);
  filtered = filterByEtaFigli(filtered, filtri.eta_figli);

  return filtered;
};

