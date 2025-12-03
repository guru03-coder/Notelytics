import React from 'react';
import { Cloud, Github, Lock, Smartphone } from 'lucide-react';

export function IntegrationsSection() {
  const integrations = [
    {
      icon: Cloud,
      name: 'Google Drive',
      description: 'Sync your notes automatically from Drive',
      status: 'Available'
    },
    {
      icon: Github,
      name: 'GitHub',
      description: 'Import markdown notes from repositories',
      status: 'Available'
    },
    {
      icon: Smartphone,
      name: 'Mobile Apps',
      description: 'iOS and Android apps with offline mode',
      status: 'Coming Soon'
    },
    {
      icon: Lock,
      name: 'OAuth Login',
      description: 'Secure authentication with Google, GitHub',
      status: 'Available'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[var(--text-primary)] mb-4">Integrations</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Seamlessly connect with your favorite tools and platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, i) => (
            <div
              key={i}
              className="p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)] hover:border-[var(--color-primary)]/50 transition-all duration-[var(--duration-medium)] hover:shadow-[var(--shadow-near)]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mb-4">
                <integration.icon size={24} className="text-white" />
              </div>
              <h3 className="text-[var(--text-primary)] mb-2">{integration.name}</h3>
              <p className="text-[var(--text-secondary)] mb-4">{integration.description}</p>
              <div className={`inline-block px-3 py-1 rounded-full ${
                integration.status === 'Available'
                  ? 'bg-[var(--success)]/20 border border-[var(--success)]/40 text-[var(--success)]'
                  : 'bg-[var(--warning)]/20 border border-[var(--warning)]/40 text-[var(--warning)]'
              }`}>
                {integration.status}
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="p-8 rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20 backdrop-blur-[var(--blur)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
              <Lock size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[var(--text-primary)] mb-2">Privacy & Security</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Your notes are encrypted in transit and at rest. We never share your data with third parties. 
                OAuth connections are secure and can be revoked at any time.
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• End-to-end encryption for all document uploads</li>
                <li>• GDPR & CCPA compliant data handling</li>
                <li>• Optional local-only processing mode</li>
                <li>• Regular security audits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
