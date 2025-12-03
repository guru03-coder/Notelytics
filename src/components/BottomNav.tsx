import React from 'react';
import { Home, Upload, Brain, BookOpen, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'uploads', icon: Upload, label: 'Uploads' },
    { id: 'ai', icon: Brain, label: 'AI' },
    { id: 'revise', icon: BookOpen, label: 'Revise' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--card-bg)] backdrop-blur-[var(--blur)] border-t border-white/5">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-[var(--duration-micro)] ${
                isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              <tab.icon size={24} className={isActive ? 'animate-bounce-once' : ''} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-once {
          animation: bounce-once var(--duration-medium) var(--ease-micro);
        }
      `}</style>
    </nav>
  );
}
