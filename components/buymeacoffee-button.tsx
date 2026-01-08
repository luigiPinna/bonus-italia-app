"use client";

import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BuyMeACoffeeButton({ className }: { className?: string }) {
  const url = `https://buymeacoffee.com/luigipilave`;

  const open = () => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={open}
      className={cn('!h-10 !px-3 !rounded-full flex items-center', className)}
      aria-label="Offrimi un caffè"
    >
      <Coffee className="h-4 w-4 mr-2" />
      Offrimi un caffè
    </Button>
  );
}
