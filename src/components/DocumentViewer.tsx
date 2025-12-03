import React, { useState } from 'react';
import { FileText, Highlighter, Lightbulb, MessageSquare, X } from 'lucide-react';
import { Button } from './Button';

interface DocumentViewerProps {
  documentName: string;
  onClose: () => void;
  onExplain?: (text: string) => void;
}

export function DocumentViewer({ documentName, onClose, onExplain }: DocumentViewerProps) {
  const [selectedText, setSelectedText] = useState('');
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showResponse, setShowResponse] = useState(false);

  const sampleText = `Introduction to Machine Learning

Machine learning is a subset of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.

Key Concepts:
• Supervised Learning: Learning with labeled data
• Unsupervised Learning: Finding patterns in unlabeled data
• Reinforcement Learning: Learning through trial and error

Applications:
Machine learning is used in various fields including computer vision, natural language processing, recommendation systems, and autonomous vehicles.`;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      setSelectedText(text);
      
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setMenuPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setShowHighlightMenu(true);
      }
    } else {
      setShowHighlightMenu(false);
    }
  };

  const handleExplain = () => {
    setShowResponse(true);
    setShowHighlightMenu(false);
    onExplain?.(selectedText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[var(--bg)] border border-white/10 rounded-[var(--radius-card)] shadow-[var(--shadow-far)] overflow-hidden flex">
        {/* Document Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[var(--card-bg)] backdrop-blur-[var(--blur)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <div className="text-[var(--text-primary)]">{documentName}</div>
                <div className="text-[var(--text-secondary)]">5 pages • PDF</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div
              className="max-w-3xl mx-auto bg-white text-gray-900 p-12 rounded-lg shadow-lg"
              onMouseUp={handleTextSelection}
            >
              <div className="whitespace-pre-line">{sampleText}</div>
            </div>
          </div>

          {/* Highlight Menu */}
          {showHighlightMenu && (
            <div
              className="fixed z-50 animate-scale-in"
              style={{
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--bg)] border border-white/10 shadow-[var(--shadow-far)] backdrop-blur-[var(--blur)]">
                <button
                  onClick={handleExplain}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white hover:shadow-[0_0_20px_rgba(76,110,245,0.4)] transition-all"
                >
                  <Lightbulb size={16} />
                  Explain
                </button>
                <button className="p-2 rounded-lg bg-[var(--card-bg)] hover:bg-white/10 text-[var(--text-primary)] transition-colors">
                  <Highlighter size={16} />
                </button>
                <button className="p-2 rounded-lg bg-[var(--card-bg)] hover:bg-white/10 text-[var(--text-primary)] transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI Response Panel */}
        {showResponse && (
          <div className="w-full md:w-96 border-l border-white/5 bg-[var(--card-bg)] backdrop-blur-[var(--blur)] flex flex-col animate-slide-in-right">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[var(--text-primary)]">AI Explanation</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[var(--text-secondary)] mb-2">Selected text:</div>
                <div className="text-[var(--text-primary)]">"{selectedText}"</div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-[var(--color-primary)]" />
                  <span className="text-[var(--text-primary)]">Explanation</span>
                </div>
                <p className="text-[var(--text-secondary)] mb-4">
                  This concept refers to the fundamental approach in machine learning where the algorithm learns from examples that are already labeled with the correct answer. Think of it like studying with an answer key - the system sees both questions and answers during training.
                </p>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-[var(--success)]/20 border border-[var(--success)]/40 text-[var(--success)]">
                    Confidence: 95%
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="secondary" className="w-full">
                  Add to Study Plan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 150ms var(--ease-micro) forwards;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right var(--duration-medium) var(--ease-micro) forwards;
        }
      `}</style>
    </div>
  );
}
