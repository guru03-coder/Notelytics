import React from 'react';
import { X } from 'lucide-react';

interface FeatureWindowProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function FeatureWindow({ title, isOpen, onClose, children }: FeatureWindowProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col pb-20 md:pb-0 animate-in fade-in duration-300">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 bg-[var(--card-bg)] backdrop-blur-[var(--blur)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {children}
            </div>
        </div>
    );
}
