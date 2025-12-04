"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, Network, Repeat, ScanText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Explanations",
            description: "Get instant, context-aware explanations for complex topics directly from your notes.",
        },
        {
            icon: FileText,
            title: "Multi-Document QA",
            description: "Ask questions across all your uploaded PDFs, slides, and handwritten notes simultaneously.",
        },
        {
            icon: Network,
            title: "Concept Mapping",
            description: "Visualize connections between topics with auto-generated interactive knowledge graphs.",
        },
        {
            icon: Repeat,
            title: "Spaced Repetition",
            description: "Smart flashcards that schedule reviews based on your performance to maximize retention.",
        },
        {
            icon: ScanText,
            title: "Instant OCR",
            description: "Turn handwritten notes and whiteboard photos into searchable, editable text instantly.",
        },
        {
            icon: GraduationCap,
            title: "Auto Curriculum",
            description: "Let AI structure your study materials into a personalized learning path.",
        },
    ];

    return (
        <section id="features" className="py-32 relative">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Powerful Features
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to master your subjects, powered by advanced AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-card/50 border-white/5 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
