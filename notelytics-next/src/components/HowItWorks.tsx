"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Highlighter, Sparkles, GraduationCap } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: Upload,
            title: "Upload Your Notes",
            description: "Drag & drop PDFs, images, or audio recordings.",
        },
        {
            icon: Highlighter,
            title: "Highlight & Ask",
            description: "Select any text to get instant clarification.",
        },
        {
            icon: Sparkles,
            title: "Get AI Explanations",
            description: "Deep dive into complex topics with AI guidance.",
        },
        {
            icon: GraduationCap,
            title: "Study & Retain",
            description: "Master the material with auto-generated quizzes.",
        },
    ];

    return (
        <section id="how-it-works" className="py-32 bg-black/20">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        How It Works
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden md:block -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-primary/5 relative group">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <step.icon className="w-8 h-8 text-primary relative z-10" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-sm font-bold text-muted-foreground">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                                <p className="text-sm text-muted-foreground max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3D Illustration Placeholder */}
                <div className="mt-20 flex justify-center">
                    <div className="w-full max-w-2xl aspect-video rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
                        <div className="text-center z-10">
                            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                <Upload className="w-10 h-10 text-primary" />
                            </div>
                            <p className="text-muted-foreground">Interactive Demo Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
