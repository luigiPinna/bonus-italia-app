import bonusData from '@/data/bonus.json';
import { Bonus, BonusData } from '@/types/bonus';

export const getAllBonus = (): Bonus[] => {
  const data = bonusData as BonusData;
  return data.bonus;
};

export const getBonusById = (id: string): Bonus | undefined => {
  return getAllBonus().find((bonus) => bonus.id === id);
};

