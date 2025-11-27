import { Bonus } from '@/types/bonus';

const REGIONI = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
  'Toscana', 'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto'
];

export interface EligibilityData {
  isee?: number;
  residenza: string;
  cittadinanza: string;
  etaRichiedente?: number;
  numeroComponenti?: number;
  figli: Array<{
    eta: string;
    disabile?: boolean;
  }>;
  presenzaDisabili?: boolean;
  statusLavorativo?: string;
  titolaritaImmobili?: boolean;
  iseeSociosanitario?: number;
  redditoComplessivo?: number;
}

// Funzione per determinare la fascia età di un figlio
function getEtaFascia(eta: number): string {
  if (eta < 0) return 'gravidanza';
  if (eta === 0) return '0-1';
  if (eta >= 1 && eta < 3) return '1-3';
  if (eta >= 3 && eta < 18) return '3-18';
  if (eta >= 18 && eta <= 21) return '18-21';
  return '';
}

// Verifica se un bonus è compatibile con i dati inseriti
export function checkEligibility(bonus: Bonus, data: EligibilityData): boolean {
  // Verifica residenza
  if (bonus.requisiti.residenza) {
    const residenzaBonus = bonus.requisiti.residenza.toLowerCase();
    
    if (residenzaBonus === 'italia' || residenzaBonus.includes('immobile in italia')) {
      // Richiede residenza in Italia - accetta qualsiasi regione italiana
      if (data.residenza === 'Italia' || REGIONI.includes(data.residenza)) {
        // OK
      } else {
        return false;
      }
    } else if (residenzaBonus.includes('regione') || residenzaBonus.includes('nella regione')) {
      // Richiede residenza in una regione specifica
      // Per ora accettiamo se la residenza è una regione (non possiamo verificare la regione specifica dal bonus)
      if (data.residenza === 'Italia') {
        // Se l'utente ha selezionato solo "Italia", non possiamo verificare la regione specifica
        // Mostriamo comunque il bonus
      }
    } else if (residenzaBonus.includes('non specificato') || residenzaBonus.includes('non specificata')) {
      // Nessun requisito di residenza
    }
  }

  // Verifica cittadinanza
  if (bonus.requisiti.cittadinanza) {
    const cittadinanzaBonus = bonus.requisiti.cittadinanza.toLowerCase();
    
    // Se il bonus non specifica requisiti di cittadinanza, accetta tutti
    if (cittadinanzaBonus.includes('non specificato')) {
      // Accetta tutti
    } else if (cittadinanzaBonus.includes('italiana')) {
      // Se richiede cittadinanza italiana, verifica che sia italiana o UE
      if (cittadinanzaBonus.includes('ue') && !['Italiana', 'UE'].includes(data.cittadinanza)) {
        return false;
      }
      if (!cittadinanzaBonus.includes('ue') && data.cittadinanza !== 'Italiana') {
        return false;
      }
    } else if (cittadinanzaBonus.includes('permesso')) {
      // Accetta italiana, UE o permesso di soggiorno
      if (!['Italiana', 'UE', 'Permesso soggiorno'].includes(data.cittadinanza)) {
        return false;
      }
    }
  }

  // Verifica ISEE
  if (bonus.isee.richiesto) {
    // Se ISEE è richiesto ma non fornito, il bonus potrebbe non essere accessibile
    // Tuttavia, alcuni bonus permettono di richiedere anche senza ISEE (con importo minimo)
    if (data.isee === undefined) {
      // Se il bonus ha una nota che indica che ISEE non è obbligatorio, accettiamo
      if (!bonus.isee.note?.toLowerCase().includes('opzionale') && 
          !bonus.isee.note?.toLowerCase().includes('non obbligatorio')) {
        // Per alcuni bonus, se ISEE non è fornito, non possiamo verificare l'eligibilità
        // ma li mostriamo comunque con un avviso
        return true; // Mostriamo comunque, l'utente verificherà
      }
    } else {
      // ISEE fornito, verifica i limiti
      if (bonus.isee.max !== undefined && data.isee > bonus.isee.max) {
        return false;
      }
      if (bonus.isee.min !== undefined && data.isee < bonus.isee.min) {
        return false;
      }
    }
  }

  // Verifica ISEE sociosanitario (per bonus specifici)
  if (bonus.isee.note?.toLowerCase().includes('sociosanitario') && data.iseeSociosanitario !== undefined) {
    if (bonus.isee.max !== undefined && data.iseeSociosanitario > bonus.isee.max) {
      return false;
    }
  }

  // Verifica età figli
  if (bonus.requisiti.eta_figli && bonus.requisiti.eta_figli.length > 0) {
    if (data.figli.length === 0) {
      return false;
    }
    
    const etaFigliBonus = bonus.requisiti.eta_figli;
    const hasMatchingChild = data.figli.some(figlio => {
      // Se il figlio è disabile, molti bonus accettano senza limiti di età
      if (figlio.disabile) {
        // Verifica se il bonus accetta disabili (spesso senza limiti di età)
        const bonusDesc = JSON.stringify(bonus.requisiti.altri || []).toLowerCase();
        if (bonusDesc.includes('disabil') || bonusDesc.includes('senza limiti')) {
          return true;
        }
        // Altrimenti verifica se l'età del figlio corrisponde
        return etaFigliBonus.includes(figlio.eta);
      }
      return etaFigliBonus.includes(figlio.eta);
    });
    
    if (!hasMatchingChild) {
      return false;
    }
  }

  // Verifica requisiti specifici
  if (bonus.requisiti.altri) {
    for (const requisito of bonus.requisiti.altri) {
      const tipo = requisito.tipo.toLowerCase();
      const desc = requisito.descrizione.toLowerCase();

      // Verifica età richiedente
      if (tipo.includes('età') && data.etaRichiedente !== undefined) {
        if (desc.includes('80') && data.etaRichiedente < 80) {
          return false;
        }
        if (desc.includes('65') && data.etaRichiedente < 65) {
          return false;
        }
        if (desc.includes('18') && desc.includes('anni') && data.etaRichiedente !== 18) {
          // Per bonus che richiedono esattamente 18 anni
          const currentYear = new Date().getFullYear();
          const birthYear = currentYear - data.etaRichiedente;
          if (birthYear !== currentYear - 18) {
            return false;
          }
        }
      }

      // Verifica disabilità
      if (tipo.includes('disabilit') || desc.includes('disabilit') || desc.includes('accompagnamento')) {
        const hasDisabile = data.presenzaDisabili || data.figli.some(f => f.disabile);
        if (!hasDisabile) {
          return false;
        }
      }

      // Verifica titolarità immobili
      if ((tipo.includes('immobile') || tipo.includes('titolarità')) && !data.titolaritaImmobili) {
        return false;
      }

      // Verifica famiglia numerosa
      if (desc.includes('famiglia numerosa') || desc.includes('almeno 4 figli')) {
        if (!data.figli || data.figli.length < 4) {
          return false;
        }
      }

      // Verifica reddito complessivo (per carta acquisti)
      if (desc.includes('reddito complessivo') && data.redditoComplessivo !== undefined) {
        const match = desc.match(/(\d+[.,]\d+)/);
        if (match) {
          const limite = parseFloat(match[1].replace(',', '.'));
          if (data.redditoComplessivo > limite) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

// Filtra i bonus in base all'eligibilità
export function filterByEligibility(bonus: Bonus[], data: EligibilityData): Bonus[] {
  return bonus.filter(b => checkEligibility(b, data));
}

