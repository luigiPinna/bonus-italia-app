"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function BuyMeACoffeeButton({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const url = `https://buymeacoffee.com/luigipilave`;
  const [open, setOpen] = useState(false);

  const openExternal = () => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className={cn(
          '!h-10 !rounded-full flex items-center',
          iconOnly ? '!w-10 !p-0 !min-w-0 justify-center' : '!px-3',
          className
        )}
        aria-label="Offrimi un caffè"
      >
        <Coffee className="h-4 w-4 flex-shrink-0" />
        {!iconOnly && <span className="ml-2">Offrimi un caffè</span>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogTitle className="text-lg">
              <span className="font-bold">Supporta il progetto!</span>
            </DialogTitle>
            <DialogDescription>
              Mentre la stagione volge al termine, un enorme grazie per il supporto a Bonusly —
              significa molto per noi. Se vuoi aiutarci a far crescere il progetto, valuta una
              piccola donazione: ogni contributo aiuta ad aggiungere funzionalità e mantenere il
              servizio attivo.
            </DialogDescription>

            <div className="mt-6 flex flex-col items-center gap-3">
              <Button
                variant="default"
                onClick={openExternal}
                className="!px-6 flex items-center"
                aria-label="Vai a BuyMeACoffee"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Sostieni il progetto
              </Button>

              <Button variant="ghost" onClick={() => setOpen(false)} className="!px-4">
                Chiudi
              </Button>
            </div>
          </DialogContent>
      </Dialog>
    </>
  );
}
