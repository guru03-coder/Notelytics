import React from 'react';
import { User, Settings, CreditCard, Bell, LogOut } from 'lucide-react';
import { Button } from './Button';

export function ProfileSection() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-white">
                    JD
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">John Doe</h3>
                    <p className="text-[var(--text-secondary)]">Student • Free Plan</p>
                </div>
            </div>

            {/* Settings List */}
            <div className="rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 overflow-hidden">
                <div className="divide-y divide-white/5">
                    <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                        <User size={20} className="text-[var(--text-secondary)]" />
                        <span className="text-[var(--text-primary)]">Account Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                        <Bell size={20} className="text-[var(--text-secondary)]" />
                        <span className="text-[var(--text-primary)]">Notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                        <CreditCard size={20} className="text-[var(--text-secondary)]" />
                        <span className="text-[var(--text-primary)]">Subscription</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                        <Settings size={20} className="text-[var(--text-secondary)]" />
                        <span className="text-[var(--text-primary)]">App Preferences</span>
                    </button>
                </div>
            </div>

            <Button variant="secondary" className="w-full justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20">
                <LogOut size={20} className="mr-2" />
                Sign Out
            </Button>
        </div>
    );
}
