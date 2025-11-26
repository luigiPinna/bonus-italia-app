'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteUtil, isFavorite as isFavoriteUtil } from '@/lib/favorites';

/**
 * Hook per gestire i preferiti con reattività
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carica i preferiti al mount
  useEffect(() => {
    setFavorites(getFavorites());
    setIsHydrated(true);
  }, []);

  // Funzione per verificare se un bonus è preferito
  const isFavorite = useCallback((bonusId: string): boolean => {
    if (!isHydrated) return false;
    return favorites.includes(bonusId);
  }, [favorites, isHydrated]);

  // Funzione per toggle del preferito
  const toggleFavorite = useCallback((bonusId: string): boolean => {
    const newState = toggleFavoriteUtil(bonusId);
    setFavorites(getFavorites());
    return newState;
  }, []);

  // Funzione per ottenere il numero di preferiti
  const favoritesCount = favorites.length;

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount,
    isHydrated,
  };
}

