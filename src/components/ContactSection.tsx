import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from './Button';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[var(--text-primary)] mb-4">Get in Touch</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="p-8 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[var(--text-primary)] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-primary)] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send size={20} className="inline mr-2" />
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--success)] to-[var(--color-primary)] flex items-center justify-center">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-[var(--text-primary)] mb-2">Message Sent!</h3>
                <p className="text-[var(--text-secondary)]">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-8 rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20 backdrop-blur-[var(--blur)]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] mb-2">Email Us</h3>
                  <p className="text-[var(--text-secondary)]">support@notelytics.app</p>
                  <p className="text-[var(--text-secondary)]">partnerships@notelytics.app</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
              <h3 className="text-[var(--text-primary)] mb-4">Team</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Notelytics is built by a team of students and educators passionate about making learning more effective through AI.
              </p>
              <p className="text-[var(--text-secondary)]">
                This project was created for educational purposes and hackathon demonstrations.
              </p>
            </div>

            <div className="p-8 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
              <h3 className="text-[var(--text-primary)] mb-4">Legal & Compliance</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Privacy Policy</li>
                <li>• Terms of Service</li>
                <li>• Cookie Policy</li>
                <li>• AdMob Compliance Notice</li>
                <li>• GDPR & CCPA Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
