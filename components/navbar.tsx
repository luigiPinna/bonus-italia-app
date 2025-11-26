'use client';

import { Sparkles, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Bonusly</span>
              <span className="text-xs text-muted-foreground">La guida smart ai bonus per te</span>
            </div>
          </div>

          {/* Toggle dark mode e icona utente */}
          <div className="flex items-center gap-2">
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

