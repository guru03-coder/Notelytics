import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Demo', 'Download', 'Integrations'],
    Company: ['About', 'Team', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'API', 'Support', 'Privacy', 'Terms'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'AdMob Compliance']
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="border-t border-white/5 bg-[var(--card-bg)] backdrop-blur-[var(--blur)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <span className="text-white">N</span>
              </div>
              <span className="text-[var(--text-primary)]">Notelytics</span>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              Your AI notebook for smarter studying
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-[var(--duration-micro)]"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[var(--text-primary)] mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[var(--duration-micro)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-secondary)]">
              © 2025 Notelytics. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-[var(--text-secondary)]">
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                AdMob Compliance
              </a>
            </div>
          </div>
          <p className="text-[var(--text-secondary)] text-center md:text-left mt-4">
            Notelytics is not intended for collecting PII or securing sensitive data. For educational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
