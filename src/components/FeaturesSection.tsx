import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Brain, FileSearch, Network, Zap, Repeat, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Explanations',
      description: 'Get instant, context-aware explanations for any concept in your notes. Highlight confusing text and let AI break it down.'
    },
    {
      icon: FileSearch,
      title: 'Multi-Document QA',
      description: 'Ask questions across all your documents. AI synthesizes answers from multiple sources with proper attribution.'
    },
    {
      icon: Network,
      title: 'Concept Mapping',
      description: 'Automatically generate interactive knowledge graphs showing how concepts connect across your study materials.'
    },
    {
      icon: Repeat,
      title: 'Spaced Repetition',
      description: 'Adaptive SRS system that adjusts difficulty based on your performance. Never forget what you learned.'
    },
    {
      icon: Zap,
      title: 'Instant OCR',
      description: 'Snap photos of handwritten notes and get instant digitization and summarization powered by advanced OCR.'
    },
    {
      icon: Sparkles,
      title: 'Auto Curriculum',
      description: 'AI analyzes your notes and creates a personalized study plan with optimal learning paths and milestones.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[var(--text-primary)] mb-4">Powerful Features</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to transform how you study, all powered by advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
