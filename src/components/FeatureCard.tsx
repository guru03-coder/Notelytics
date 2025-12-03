import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className="group p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)] hover:border-[var(--color-primary)]/50 transition-all duration-[var(--duration-medium)] hover:shadow-[var(--shadow-near)] hover:translate-y-[-4px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-[var(--duration-medium)]">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
