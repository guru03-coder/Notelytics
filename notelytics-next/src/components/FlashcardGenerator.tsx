import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Flashcard, addFlashcards } from "@/lib/storage";
import { Brain, ChevronLeft, ChevronRight, Plus, Save, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FlashcardGeneratorProps {
    subjectId: string;
    existingFlashcards: Flashcard[];
    onUpdate: () => void;
}

export function FlashcardGenerator({ subjectId, existingFlashcards, onUpdate }: FlashcardGeneratorProps) {
    const [mode, setMode] = useState<"list" | "create" | "study">("list");
    const [pasteContent, setPasteContent] = useState("");
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const parseFlashcards = () => {
        const cards: Omit<Flashcard, "id">[] = [];
        const regex = /\*\*Question:\*\*\s*(.*?)\s*\.\.\.\s*\(Think about it!\)\s*\.\.\.\s*\*\*Answer:\*\*\s*(.*?)\s*(?:\*\*Explanation:\*\*\s*(.*?))?(?=\*\*Flashcard|\n*$)/gs;

        let match;
        while ((match = regex.exec(pasteContent)) !== null) {
            cards.push({
                question: match[1].trim(),
                answer: match[2].trim(),
                explanation: match[3]?.trim()
            });
        }

        if (cards.length > 0) {
            addFlashcards(subjectId, cards);
            setPasteContent("");
            setMode("list");
            onUpdate();
        }
    };

    if (mode === "create") {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Generate Flashcards
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setMode("list")}>Cancel</Button>
                </div>
                <Card className="p-4 glass">
                    <p className="text-sm text-muted-foreground mb-2">
                        Paste the AI-generated flashcard text below. The system will automatically parse questions, answers, and explanations.
                    </p>
                    <Textarea
                        value={pasteContent}
                        onChange={(e) => setPasteContent(e.target.value)}
                        placeholder="Paste AI output here (e.g., **Flashcard 1**...)"
                        className="min-h-[300px] font-mono text-sm glass-input"
                    />
                </Card>
                <div className="flex justify-end">
                    <Button onClick={parseFlashcards} disabled={!pasteContent.trim()}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Flashcards
                    </Button>
                </div>
            </div>
        );
    }

    if (mode === "study" && existingFlashcards.length > 0) {
        const currentCard = existingFlashcards[currentCardIndex];

        return (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto py-6 sm:py-10 px-4">
                <div className="w-full flex justify-between items-center mb-4 sm:mb-6">
                    <Button variant="ghost" size="sm" onClick={() => setMode("list")}>
                        <ChevronLeft className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Back to List</span>
                    </Button>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {currentCardIndex + 1} / {existingFlashcards.length}
                    </span>
                </div>

                <div className="relative w-full aspect-[3/2] perspective-1000">
                    <motion.div
                        className="w-full h-full relative preserve-3d cursor-pointer"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front */}
                        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center glass hover:border-primary/50 transition-colors">
                            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4">Question</h4>
                            <p className="text-lg sm:text-xl font-medium">{currentCard.question}</p>
                            <p className="absolute bottom-3 sm:bottom-4 text-xs text-muted-foreground">Click to flip</p>
                        </Card>

                        {/* Back */}
                        <Card
                            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center glass border-primary/20"
                            style={{ transform: "rotateY(180deg)" }}
                        >
                            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-primary mb-3 sm:mb-4">Answer</h4>
                            <p className="text-base sm:text-lg mb-3 sm:mb-4">{currentCard.answer}</p>
                            {currentCard.explanation && (
                                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-primary/10 rounded-lg text-xs sm:text-sm text-muted-foreground">
                                    <span className="font-semibold text-primary">Explanation: </span>
                                    {currentCard.explanation}
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>

                <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            setCurrentCardIndex(prev => Math.max(0, prev - 1));
                        }}
                        disabled={currentCardIndex === 0}
                        className="flex-1 sm:flex-none"
                    >
                        <ChevronLeft className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Previous</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            setCurrentCardIndex(prev => Math.min(existingFlashcards.length - 1, prev + 1));
                        }}
                        disabled={currentCardIndex === existingFlashcards.length - 1}
                        className="flex-1 sm:flex-none"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4 sm:ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Flashcards ({existingFlashcards.length})
                </h3>
                <div className="flex gap-2">
                    {existingFlashcards.length > 0 && (
                        <Button onClick={() => setMode("study")} variant="secondary">
                            <Brain className="w-4 h-4 mr-2" />
                            Study Now
                        </Button>
                    )}
                    <Button onClick={() => setMode("create")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Flashcards
                    </Button>
                </div>
            </div>

            {existingFlashcards.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                    <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">No flashcards yet</h4>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Ask the AI to generate flashcards from your documents, then paste them here to create a study deck.
                    </p>
                    <Button onClick={() => setMode("create")}>
                        Create Your First Deck
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {existingFlashcards.map((card, i) => (
                        <Card key={card.id} className="p-4 glass hover:border-primary/50 transition-colors cursor-pointer" onClick={() => {
                            setCurrentCardIndex(i);
                            setMode("study");
                        }}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs text-muted-foreground">Card {i + 1}</span>
                            </div>
                            <p className="font-medium line-clamp-3">{card.question}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
