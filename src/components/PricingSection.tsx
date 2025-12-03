import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from './Button';

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      icon: Sparkles,
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Notelytics',
      features: [
        '5 document uploads per month',
        'Basic AI explanations',
        '50 flashcards',
        'Limited OCR',
        'Ad-supported'
      ],
      cta: 'Get Started',
      variant: 'secondary' as const,
      popular: false
    },
    {
      name: 'Pro',
      icon: Zap,
      price: '$9.99',
      period: 'per month',
      description: 'For serious students',
      features: [
        'Unlimited document uploads',
        'Advanced AI reasoning',
        'Unlimited flashcards',
        'Full OCR & handwriting',
        'Concept maps',
        'Spaced repetition',
        'No ads'
      ],
      cta: 'Start Free Trial',
      variant: 'primary' as const,
      popular: true
    },
    {
      name: 'Teams',
      icon: Crown,
      price: '$19.99',
      period: 'per month',
      description: 'For study groups & classes',
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Shared notebooks',
        'Collaborative study plans',
        'Priority support',
        'Admin dashboard'
      ],
      cta: 'Contact Sales',
      variant: 'secondary' as const,
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[var(--text-primary)] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-[var(--radius-card)] backdrop-blur-[var(--blur)] border transition-all duration-[var(--duration-medium)] hover:translate-y-[-4px] ${
                plan.popular
                  ? 'bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border-[var(--color-primary)] shadow-[var(--shadow-far)]'
                  : 'bg-[var(--card-bg)] border-white/5 hover:border-[var(--color-primary)]/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]'
                    : 'bg-white/5'
                }`}>
                  <plan.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)]">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[var(--text-primary)]">{plan.price}</span>
                  <span className="text-[var(--text-secondary)]">{plan.period}</span>
                </div>
                <p className="text-[var(--text-secondary)] mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--success)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Ad Support Note */}
        <div className="mt-12 p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
          <p className="text-[var(--text-secondary)] text-center">
            <span className="text-[var(--text-primary)]">Free tier includes ads</span> - We use Google AdMob for respectful, privacy-focused advertising. 
            Upgrade to Pro to remove ads and unlock all features.
          </p>
        </div>
      </div>
    </section>
  );
}
