'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, Home, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getBonusCountByCategory } from '@/lib/data';

interface QuickFilter {
  label: string;
  icon: React.ElementType;
  categoria: string;
  count: number;
}

export function HeroSection() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const quickFilters: QuickFilter[] = [
    {
      label: 'Famiglia',
      icon: Users,
      categoria: 'famiglia',
      count: getBonusCountByCategory('famiglia'),
    },
    {
      label: 'Casa',
      icon: Home,
      categoria: 'casa',
      count: getBonusCountByCategory('casa'),
    },
    {
      label: 'Lavoro',
      icon: Briefcase,
      categoria: 'lavoro',
      count: getBonusCountByCategory('lavoro'),
    },
    {
      label: 'Educazione',
      icon: GraduationCap,
      categoria: 'educazione',
      count: getBonusCountByCategory('educazione'),
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/esplora?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push('/esplora');
    }
  };

  const handleQuickFilter = (categoria: string) => {
    router.push(`/esplora?categoria=${categoria}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 dark:from-primary/80 dark:via-primary/70 dark:to-primary/60">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Trova i bonus giusti per te
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Scopri tutti i bonus e gli incentivi disponibili in Italia.
            Filtra per categoria, ISEE e trova le agevolazioni a cui hai diritto.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cerca bonus... es. asilo nido, ristrutturazione"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-14 w-full rounded-full border-0 bg-white pl-12 pr-32 text-base shadow-lg focus-visible:ring-2 focus-visible:ring-white/50"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6"
              >
                Cerca
              </Button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.categoria}
                  variant="ghost"
                  onClick={() => handleQuickFilter(filter.categoria)}
                  className="rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20 hover:text-white"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {filter.label}
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {filter.count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full text-background"
          viewBox="0 0 1440 60"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
