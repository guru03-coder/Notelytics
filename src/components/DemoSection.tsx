import React, { useState } from 'react';
import { Upload, Highlighter, Lightbulb, Brain } from 'lucide-react';

export function DemoSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Upload,
      title: '1. Upload Your Notes',
      description: 'Drag and drop PDFs, images, or snap photos of handwritten notes. OCR extracts text instantly.',
      color: 'from-[var(--color-primary)]'
    },
    {
      icon: Highlighter,
      title: '2. Highlight & Ask',
      description: 'Select any confusing text. AI identifies the concept and provides context-aware help.',
      color: 'from-[var(--color-accent)]'
    },
    {
      icon: Lightbulb,
      title: '3. Get AI Explanations',
      description: 'Receive instant explanations with sources, examples, and related concepts from all your documents.',
      color: 'from-[var(--color-primary)]'
    },
    {
      icon: Brain,
      title: '4. Study & Retain',
      description: 'Auto-generated flashcards, spaced repetition, and concept maps help you master the material.',
      color: 'from-[var(--success)]'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[var(--text-primary)] mb-4">How It Works</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Transform your study workflow in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Step List */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`group cursor-pointer p-6 rounded-[var(--radius-card)] border backdrop-blur-[var(--blur)] transition-all duration-[var(--duration-medium)] ${
                  activeStep === i
                    ? 'bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border-[var(--color-primary)] shadow-[var(--shadow-near)]'
                    : 'bg-[var(--card-bg)] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-[var(--duration-medium)] ${
                      activeStep === i
                        ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] scale-110'
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}
                  >
                    <step.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="aspect-square rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border border-[var(--color-primary)]/30 backdrop-blur-[var(--blur)] overflow-hidden">
              {/* Animated mockup would go here */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${steps[activeStep].color} to-transparent flex items-center justify-center animate-pulse`}>
                    {React.createElement(steps[activeStep].icon, { size: 64, className: 'text-white' })}
                  </div>
                  <h3 className="text-[var(--text-primary)] mb-2">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Interactive demo coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-2 rounded-full transition-all duration-[var(--duration-medium)] ${
                    activeStep === i
                      ? 'w-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]'
                      : 'w-2 bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
