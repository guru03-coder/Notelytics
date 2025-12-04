"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Free",
        price: "₹0",
        period: "forever",
        description: "Perfect for trying out Notelytics",
        features: [
            "5 workspaces",
            "Basic AI features",
            "PDF upload",
            "Text chat",
            "Community support"
        ],
        cta: "Get Started",
        popular: false
    },
    {
        name: "Pro",
        price: "₹499",
        period: "per month",
        description: "For serious students",
        features: [
            "Unlimited workspaces",
            "Advanced AI features",
            "Priority processing",
            "Quiz generation",
            "Flashcard creation",
            "Knowledge graphs",
            "Priority support"
        ],
        cta: "Start Free Trial",
        popular: true
    },
    {
        name: "Teams",
        price: "₹1,499",
        period: "per user/month",
        description: "For study groups and institutions",
        features: [
            "Everything in Pro",
            "Shared workspaces",
            "Team collaboration",
            "Admin dashboard",
            "Usage analytics",
            "Custom integrations",
            "Dedicated support"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

export default function PricingPage() {
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
                            Simple, Transparent
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> Pricing</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the plan that's right for you. All plans include core AI features.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className={`p-8 h-full flex flex-col ${plan.popular
                                ? "bg-gradient-to-b from-primary/10 to-card/50 border-primary/30 relative"
                                : "bg-card/50 border-white/10"
                                }`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-semibold">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">/{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/workspace">
                                    <Button
                                        className={`w-full ${plan.popular
                                            ? "bg-primary hover:bg-primary/90"
                                            : "bg-white/10 hover:bg-white/20"
                                            }`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container px-4 md:px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <Card className="p-6 bg-card/50 border-white/10">
                            <h3 className="font-semibold mb-2">Can I try before I buy?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes! The Free plan gives you full access to core features. Pro plan includes a 14-day free trial.
                            </p>
                        </Card>
                        <Card className="p-6 bg-card/50 border-white/10">
                            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                            <p className="text-sm text-muted-foreground">
                                Absolutely. Cancel your subscription anytime with no questions asked.
                            </p>
                        </Card>
                        <Card className="p-6 bg-card/50 border-white/10">
                            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                            <p className="text-sm text-muted-foreground">
                                We accept all major credit cards, debit cards, UPI, and net banking.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
