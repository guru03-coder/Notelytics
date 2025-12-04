"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { UploadModal } from "./UploadModal";

export function Pricing() {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    const plans = [
        {
            name: "Free",
            price: "₹0",
            description: "Perfect for getting started",
            features: ["50 AI queries/month", "Basic OCR (5 pages)", "1 Knowledge Graph", "Community Support"],
        },
        {
            name: "Pro",
            price: "₹999",
            period: "/month",
            description: "For serious students",
            popular: true,
            features: ["Unlimited AI queries", "Unlimited OCR", "Unlimited Knowledge Graphs", "Priority Support", "Advanced Study Analytics"],
        },
        {
            name: "Teams",
            price: "₹2,499",
            period: "/user/mo",
            description: "For study groups & classes",
            features: ["Everything in Pro", "Collaborative Workspaces", "Shared Knowledge Graphs", "Admin Dashboard", "SSO Integration"],
        },
    ];

    return (
        <>
            <section id="pricing" className="py-32">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Simple Pricing
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Start for free, upgrade when you need more power.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative flex flex-col ${plan.popular
                                    ? "border-primary shadow-2xl shadow-primary/20 scale-105 z-10 bg-card/80 backdrop-blur-xl"
                                    : "border-white/10 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                                    <div className="mt-4 mb-2">
                                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                        {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => setUploadModalOpen(true)}
                                        className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80"}`}
                                        variant={plan.popular ? "default" : "secondary"}
                                    >
                                        Get Started
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
        </>
    );
}
