"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export function Flashcards() {
    const [cards, setCards] = useState([
        { id: 1, front: "What is Spaced Repetition?", back: "A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material." },
        { id: 2, front: "How does OCR work?", back: "Optical Character Recognition converts different types of documents, such as scanned paper documents, PDF files or images captured by a digital camera into editable and searchable data." },
        { id: 3, front: "What is a Knowledge Graph?", back: "A knowledge graph represents a collection of interlinked descriptions of entities – objects, events, situations or abstract concepts." },
    ]);

    const [flipped, setFlipped] = useState(false);

    const handleNext = () => {
        setFlipped(false);
        setTimeout(() => {
            setCards((prev) => {
                const newCards = [...prev];
                const first = newCards.shift();
                if (first) newCards.push(first);
                return newCards;
            });
        }, 200);
    };

    return (
        <section className="py-32 bg-black/20">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Adaptive Flashcards
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
                    Review smarter, not harder. Our AI schedules reviews exactly when you need them.
                </p>

                <div className="relative h-[400px] max-w-md mx-auto perspective-1000">
                    <AnimatePresence>
                        {cards.map((card, index) => {
                            if (index > 2) return null;
                            return (
                                <motion.div
                                    key={card.id}
                                    className="absolute inset-0 cursor-pointer"
                                    style={{ zIndex: cards.length - index }}
                                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                    animate={{
                                        scale: 1 - index * 0.05,
                                        y: index * 15,
                                        opacity: 1 - index * 0.2,
                                    }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => index === 0 && setFlipped(!flipped)}
                                >
                                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped && index === 0 ? "rotate-y-180" : ""}`}>
                                        {/* Front */}
                                        <Card className="absolute inset-0 backface-hidden flex items-center justify-center p-8 bg-card border-white/10 shadow-2xl">
                                            <h3 className="text-2xl font-semibold text-center text-foreground">
                                                {card.front}
                                            </h3>
                                            <div className="absolute bottom-4 text-xs text-muted-foreground uppercase tracking-widest">
                                                Click to Flip
                                            </div>
                                        </Card>

                                        {/* Back */}
                                        <Card className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-8 bg-primary/10 border-primary/20 shadow-2xl">
                                            <p className="text-lg text-center text-foreground/90 leading-relaxed">
                                                {card.back}
                                            </p>
                                            <div className="absolute bottom-4 text-xs text-primary uppercase tracking-widest">
                                                Answer
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <button
                    onClick={handleNext}
                    className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Next Card
                </button>
            </div>
        </section>
    );
}
