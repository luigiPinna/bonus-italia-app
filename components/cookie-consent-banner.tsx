'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;
type Language = 'it' | 'en';

interface Translations {
  title: string;
  description: string;
  accept: string;
  reject: string;
  learnMore: string;
}

const translations: Record<Language, Translations> = {
  it: {
    title: 'Utilizziamo i cookie',
    description: 'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, analizzare il traffico del sito e personalizzare i contenuti. Accettando, acconsenti al nostro utilizzo dei cookie.',
    accept: 'Accetta',
    reject: 'Rifiuta',
    learnMore: 'Scopri di più',
  },
  en: {
    title: 'We use cookies',
    description: 'We use cookies to improve your browsing experience, analyze site traffic, and personalize content. By accepting, you consent to our use of cookies.',
    accept: 'Accept',
    reject: 'Reject',
    learnMore: 'Learn more',
  },
};

function getLanguage(): Language {
  if (typeof window === 'undefined') return 'it';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang.startsWith('en') ? 'en' : 'it';
}

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<Language>('it');

  useEffect(() => {
    // Get language from browser
    const lang = getLanguage();
    setLanguage(lang);

    // Check if consent has been given
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
      if (savedConsent) {
        setConsent(savedConsent);
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      setConsent('accepted');
      setIsVisible(false);
    }
  };

  const handleReject = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
      setConsent('rejected');
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  const t = translations[language];

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
        'transition-all duration-300 ease-in-out'
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                {t.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.description}
              </p>
            </div>
          </div>
          
          <div className="flex shrink-0 items-center gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="text-xs"
            >
              {t.reject}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAccept}
              className="text-xs"
            >
              {t.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

