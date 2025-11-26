'use client';

import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Table2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode = 'grid' | 'table' | 'list';

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={cn(
          'h-8 px-3',
          view === 'grid' && 'bg-primary text-primary-foreground'
        )}
        aria-label="Vista griglia"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Griglia</span>
      </Button>
      <Button
        variant={view === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className={cn(
          'h-8 px-3',
          view === 'table' && 'bg-primary text-primary-foreground'
        )}
        aria-label="Vista tabella"
      >
        <Table2 className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Tabella</span>
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={cn(
          'h-8 px-3',
          view === 'list' && 'bg-primary text-primary-foreground'
        )}
        aria-label="Vista lista"
      >
        <List className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Lista</span>
      </Button>
    </div>
  );
}

