'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllBonus } from '@/lib/data';

export function CtaSection() {
  const totalBonus = getAllBonus().length;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 p-8 md:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Esplora tutti i {totalBonus} bonus
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-2xl text-lg text-white/90">
              Accedi alla lista completa di tutti i bonus e incentivi disponibili in Italia.
              Usa i filtri avanzati per trovare quelli giusti per la tua situazione.
            </p>

            {/* CTA Button */}
            <Link href="/esplora">
              <Button
                size="lg"
                className="rounded-full bg-white text-gray-800 hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-xl transition-all hover:shadow-2xl hover:scale-105"
              >
                <span>Esplora tutti i bonus</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Additional info */}
            <p className="mt-6 text-sm text-white/70">
              Aggiornato regolarmente con le ultime novita
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
