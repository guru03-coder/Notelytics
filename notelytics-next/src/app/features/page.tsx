"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Brain,
    FileQuestion,
    Layers,
    Zap,
    FileText,
    MessageSquare,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Brain,
        title: "AI Explanations",
        description: "Get instant, detailed explanations of complex concepts from your study materials. The AI breaks down difficult topics into easy-to-understand language."
    },
    {
        icon: FileQuestion,
        title: "Quiz Generation",
        description: "Automatically generate practice quizzes from your notes. Test your knowledge with multiple-choice questions tailored to your content."
    },
    {
        icon: Layers,
        title: "Flashcards",
        description: "Create smart flashcards instantly from your documents. Perfect for memorization and quick review sessions."
    },
    {
        icon: Zap,
        title: "Smart Summaries",
        description: "Get concise summaries of long documents. Extract key points and main ideas in seconds."
    },
    {
        icon: FileText,
        title: "PDF Support",
        description: "Upload PDFs and automatically extract text. Works with textbooks, research papers, and lecture notes."
    },
    {
        icon: MessageSquare,
        title: "Interactive Chat",
        description: "Chat with your documents using AI. Ask questions, request explanations, or explore topics in depth."
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header */}
            <div className="border-b border-white/10 bg-card/30 backdrop-blur-sm">
                <div className="container px-4 md:px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Powerful Features for
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> Smarter Studying</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Everything you need to transform your study materials into interactive learning experiences
                        </p>
                        <Link href="/workspace">
                            <Button className="bg-primary hover:bg-primary/90">
                                Try It Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="p-8 bg-card/50 border-white/10 hover:bg-card/70 hover:border-primary/30 transition-all h-full">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="container px-4 md:px-6 py-16">
                <Card className="p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Studying?</h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Join thousands of students using AI to study smarter, not harder
                    </p>
                    <Link href="/workspace">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            Get Started Free
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
