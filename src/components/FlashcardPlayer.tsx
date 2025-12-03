import React, { useState } from 'react';
import { RotateCcw, Check, X, Brain } from 'lucide-react';
import { Button } from './Button';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export function FlashcardPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const flashcards: Flashcard[] = [
    {
      id: 1,
      question: 'What is Supervised Learning?',
      answer: 'A type of machine learning where the algorithm learns from labeled training data, with both input and correct output provided.'
    },
    {
      id: 2,
      question: 'What is the difference between classification and regression?',
      answer: 'Classification predicts discrete categories (e.g., spam/not spam), while regression predicts continuous values (e.g., house prices).'
    },
    {
      id: 3,
      question: 'What is overfitting?',
      answer: 'When a model learns the training data too well, including noise, and performs poorly on new, unseen data.'
    }
  ];

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (difficulty: 'easy' | 'hard' | 'forgot') => {
    const newProgress = progress + (100 / flashcards.length);
    setProgress(newProgress);
    
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Session complete
      setProgress(100);
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setProgress(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[var(--text-primary)] mb-4">Adaptive Flashcards</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Spaced repetition system that adapts to your learning pace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--text-secondary)]">Session Progress</span>
            <span className="text-[var(--color-primary)]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-[var(--duration-medium)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {progress < 100 ? (
          <>
            {/* Flashcard */}
            <div
              className="perspective-1000 cursor-pointer mb-8"
              onClick={handleFlip}
            >
              <div
                className={`relative h-96 transition-transform duration-[var(--duration-large)] preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full p-8 rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border border-[var(--color-primary)]/30 backdrop-blur-[var(--blur)] flex flex-col items-center justify-center text-center">
                    <Brain size={48} className="text-[var(--color-primary)] mb-6" />
                    <h3 className="text-[var(--text-primary)] mb-4">{currentCard.question}</h3>
                    <p className="text-[var(--text-secondary)]">Click to reveal answer</p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full p-8 rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/20 border border-[var(--color-accent)]/30 backdrop-blur-[var(--blur)] flex flex-col items-center justify-center text-center">
                    <p className="text-[var(--text-primary)] mb-4">{currentCard.answer}</p>
                    <p className="text-[var(--text-secondary)]">How well did you know this?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Buttons */}
            {isFlipped && (
              <div className="flex gap-4 animate-slide-up">
                <Button
                  variant="secondary"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleResponse('forgot')}
                >
                  <X size={20} />
                  Forgot
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleResponse('hard')}
                >
                  <RotateCcw size={20} />
                  Hard
                </Button>
                <Button
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleResponse('easy')}
                >
                  <Check size={20} />
                  Know
                </Button>
              </div>
            )}

            {/* Card Counter */}
            <div className="text-center mt-4 text-[var(--text-secondary)]">
              Card {currentIndex + 1} of {flashcards.length}
            </div>
          </>
        ) : (
          <div className="text-center p-12 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--success)] to-[var(--color-primary)] flex items-center justify-center">
              <Check size={40} className="text-white" />
            </div>
            <h3 className="text-[var(--text-primary)] mb-4">Session Complete!</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              You've completed {flashcards.length} cards. Great work!
            </p>
            <Button onClick={resetSession}>
              <RotateCcw size={20} className="inline mr-2" />
              Start New Session
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up var(--duration-medium) var(--ease-micro) forwards;
        }
      `}</style>
    </section>
  );
}
