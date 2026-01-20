'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { getPopularBonus } from '@/lib/data';
import { Bonus } from '@/types/bonus';
import { BonusCard } from '@/components/bonus/bonus-card';
import { BonusModal } from '@/components/bonus/bonus-modal';

export function PopularBonuses() {
  const popularBonus = getPopularBonus(6);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            Bonus piu richiesti
          </div>
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            I bonus piu popolari
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Scopri i bonus piu richiesti dagli italiani e verifica se hai diritto anche tu
          </p>
        </div>

        {/* Grid of popular bonuses */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularBonus.map((bonus) => (
            <BonusCard
              key={bonus.id}
              bonus={bonus}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      <BonusModal
        bonus={selectedBonus}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}
