'use client';

import { Sparkles, User, Moon, Sun, Heart, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { favoritesCount, isHydrated } = useFavorites();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-0">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e nome */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Bonusly</span>
              <span className="text-xs text-muted-foreground">La guida smart ai bonus in Italia</span>
            </div>
          </Link>

          {/* Toggle dark mode, preferiti e icona utente */}
          <div className="flex items-center gap-2">
            <Link href="/calcolatore-eligibilita">
              <Button
                variant="ghost"
                size="sm"
                className="!h-10 !px-3 !rounded-full"
                aria-label="Calcolatore eligibilità"
              >
                <Calculator className="h-5 w-5 flex-shrink-0" />
              </Button>
            </Link>
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="sm"
                className="!h-10 !px-3 !rounded-full relative"
                aria-label="I miei bonus"
              >
                <Heart className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all",
                  isHydrated && favoritesCount > 0 && "fill-current text-red-500"
                )} />
                {isHydrated && favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="!h-10 !w-10 !rounded-full !p-0 !min-w-0 flex items-center justify-center"
              aria-label="Cambia tema"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5 flex-shrink-0" />
              ) : (
                <Moon className="h-5 w-5 flex-shrink-0" />
              )}
            </Button>
            <Button
              variant="ghost"
              className="!h-10 !w-10 !rounded-full !p-0 !min-w-0 flex items-center justify-center"
              aria-label="Account utente"
            >
              <User className="h-6 w-6 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

