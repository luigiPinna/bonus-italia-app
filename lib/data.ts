import bonusData from '@/data/bonus.json';
import { Bonus, BonusData } from '@/types/bonus';

export const getAllBonus = (): Bonus[] => {
  const data = bonusData as BonusData;
  return data.bonus;
};

export const getBonusById = (id: string): Bonus | undefined => {
  return getAllBonus().find((bonus) => bonus.id === id);
};

export const getPopularBonus = (limit: number = 6): Bonus[] => {
  const allBonus = getAllBonus();
  return allBonus
    .filter((bonus) => bonus.popolarita !== undefined)
    .sort((a, b) => (b.popolarita ?? 0) - (a.popolarita ?? 0))
    .slice(0, limit);
};

export const getRecentBonus = (limit: number = 4): Bonus[] => {
  const allBonus = getAllBonus();
  return allBonus
    .filter((bonus) => bonus.data_aggiunta !== undefined)
    .sort((a, b) => {
      const dateA = new Date(a.data_aggiunta ?? '');
      const dateB = new Date(b.data_aggiunta ?? '');
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
};

export const getBonusCountByCategory = (categoria: string): number => {
  const allBonus = getAllBonus();
  return allBonus.filter((bonus) =>
    bonus.categoria.some(cat => cat.toLowerCase() === categoria.toLowerCase())
  ).length;
};

