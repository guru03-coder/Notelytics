import React from 'react';
import { Button } from './Button';
import { Play, Upload } from 'lucide-react';

interface HeroProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-20 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--card-bg)] border border-white/10 backdrop-blur-[var(--blur)] mb-6 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
          <span className="text-[var(--text-secondary)]">AI-Powered Study Assistant</span>
        </div>

        {/* Headline */}
        <h1 className="text-[var(--text-primary)] mb-6 animate-slide-up">
          Notelytics — Your AI Notebook for Smarter Studying
        </h1>

        {/* Subheadline */}
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Upload notes, highlight what confuses you, and let AI explain, quiz, and build a study plan — all in one intelligent workspace.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button size="lg" onClick={onPrimaryClick}>
            <Upload size={20} className="inline mr-2" />
            Try Notelytics — Upload Notes
          </Button>
          <Button variant="secondary" size="lg" onClick={onSecondaryClick}>
            <Play size={20} className="inline mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Feature bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {[
            'Multi-document reasoning with source-aware answers',
            'Handwritten note OCR + instant summarization',
            'Adaptive spaced repetition (SRS) with AI difficulty',
            'Concept graph & auto curriculum generation'
          ].map((feature, i) => (
            <div
              key={i}
              className="p-4 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)] hover:border-[var(--color-primary)]/50 transition-all duration-[var(--duration-medium)] hover:shadow-[var(--shadow-near)]"
            >
              <p className="text-[var(--text-secondary)]">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in var(--duration-medium) var(--ease-micro) forwards;
        }

        .animate-slide-up {
          animation: slide-up var(--duration-medium) var(--ease-micro) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
