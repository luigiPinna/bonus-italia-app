'use client';

import Link from 'next/link';
import { Sparkles, Heart, Calculator, Home, Shield, FileText, Cookie, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Bonusly</span>
                <span className="text-xs text-muted-foreground">La guida smart ai bonus in Italia</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Scopri tutti i bonus e incentivi disponibili in Italia. 
              Trova i bonus giusti per te con filtri avanzati e calcolatore di eligibilità.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navigazione</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/favorites" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  I miei bonus
                </Link>
              </li>
              <li>
                <Link 
                  href="/calcolatore-eligibilita" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  Calcolatore eligibilità
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Informazioni legali</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookie" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Cookie className="h-4 w-4" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/termini" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Termini di utilizzo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contatti</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@bonusly.org" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@bonusly.org
                </a>
              </li>
            </ul>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                Le informazioni fornite sono a scopo informativo. 
                Verifica sempre le condizioni ufficiali sui siti istituzionali.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Bonusly. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            Made TBD
          </p>
        </div>
      </div>
    </footer>
  );
}

