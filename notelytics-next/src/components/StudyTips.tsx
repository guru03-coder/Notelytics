"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, Target, Zap, Coffee, BookOpen } from "lucide-react";

export function StudyTips() {
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const tips = [
        {
            icon: Brain,
            front: "The Pomodoro Technique",
            back: "Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break. This helps maintain focus and prevents burnout."
        },
        {
            icon: Clock,
            front: "Peak Learning Hours",
            back: "Your brain is most alert 2-3 hours after waking up. Schedule your most challenging subjects during this time for maximum retention."
        },
        {
            icon: Target,
            front: "Active Recall",
            back: "Instead of re-reading notes, test yourself. Close your book and write down everything you remember. This strengthens memory pathways."
        },
        {
            icon: Zap,
            front: "The 2-Minute Rule",
            back: "If a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up and overwhelming you later."
        },
        {
            icon: Coffee,
            front: "Hydration Matters",
            back: "Even mild dehydration can impair concentration and memory. Keep water nearby and take small sips regularly while studying."
        },
        {
            icon: BookOpen,
            front: "Teach to Learn",
            back: "Explain concepts to someone else (or even to yourself out loud). If you can teach it, you truly understand it. This reveals gaps in your knowledge."
        }
    ];

    const toggleCard = (index: number) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <section className="py-32 relative">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Study Smarter, Not Harder
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Evidence-based tips to boost your focus and retention. Click any card to reveal the tip!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tips.map((tip, index) => {
                        const isFlipped = flippedCards.has(index);
                        const Icon = tip.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="perspective-1000"
                            >
                                <div
                                    onClick={() => toggleCard(index)}
                                    className="relative h-64 cursor-pointer transform-style-3d transition-transform duration-500"
                                    style={{
                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                    }}
                                >
                                    {/* Front of card */}
                                    <Card className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 backdrop-blur-xl border border-white/20 p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:shadow-primary/20 transition-shadow">
                                        {/* Glossy overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 mb-4 mx-auto">
                                                <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                                                    <Icon className="w-8 h-8 text-primary" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                {tip.front}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">Click to reveal</p>
                                        </div>
                                    </Card>

                                    {/* Back of card */}
                                    <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-card/95 backdrop-blur-xl border border-white/20 p-8 flex items-center justify-center shadow-2xl">
                                        {/* Glossy overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 mb-4 mx-auto">
                                                <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                            </div>
                                            <p className="text-foreground leading-relaxed text-center">
                                                {tip.back}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
