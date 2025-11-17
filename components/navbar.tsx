import { Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e nome */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Bonusly</span>
              <span className="text-xs text-muted-foreground">I tuoi bonus, semplicemente</span>
            </div>
          </div>

          {/* Icona utente */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label="Account utente"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

