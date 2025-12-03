import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

interface TopBarProps {
  onNavigate?: (section: string) => void;
}

export function TopBar({ onNavigate }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Features', 'Demo', 'Pricing', 'Download', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--card-bg)] backdrop-blur-[var(--blur)] border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-[var(--shadow-near)]">
              <span className="text-white">N</span>
            </div>
            <span className="text-[var(--text-primary)] hidden sm:block">Notelytics</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate?.(item.toLowerCase())}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[var(--duration-micro)]"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={() => onNavigate?.('demo')}>Try Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    onNavigate?.(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-left transition-colors py-3 px-2 rounded-lg hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => onNavigate?.('demo')} className="w-full">
                Try Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
