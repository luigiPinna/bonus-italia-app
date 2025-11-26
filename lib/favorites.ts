const FAVORITES_STORAGE_KEY = 'bonus-favorites';

/**
 * Ottiene la lista dei preferiti dal localStorage
 */
export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

/**
 * Salva la lista dei preferiti nel localStorage
 */
export function saveFavorites(favorites: string[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Errore nel salvare i preferiti:', error);
  }
}

/**
 * Aggiunge un bonus ai preferiti
 */
export function addToFavorites(bonusId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(bonusId)) {
    saveFavorites([...favorites, bonusId]);
  }
}

/**
 * Rimuove un bonus dai preferiti
 */
export function removeFromFavorites(bonusId: string): void {
  const favorites = getFavorites();
  saveFavorites(favorites.filter(id => id !== bonusId));
}

/**
 * Verifica se un bonus è nei preferiti
 */
export function isFavorite(bonusId: string): boolean {
  return getFavorites().includes(bonusId);
}

/**
 * Toggle dello stato preferito di un bonus
 */
export function toggleFavorite(bonusId: string): boolean {
  const isFav = isFavorite(bonusId);
  if (isFav) {
    removeFromFavorites(bonusId);
  } else {
    addToFavorites(bonusId);
  }
  return !isFav;
}

