"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network } from "lucide-react";

export function KnowledgeGraph() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Visualize Your Knowledge
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            See how concepts connect. Our AI automatically builds a knowledge graph from your notes, helping you identify gaps and reinforce learning.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Auto-generated from your notes",
                                "Interactive node exploration",
                                "Identify key concept clusters",
                                "Export to image or PDF",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center p-8"
                    >
                        {/* Graph Animation Placeholder */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse" />

                        <div className="relative z-10 text-center">
                            <Network className="w-24 h-24 text-primary/50 mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">Interactive Graph View</p>
                        </div>

                        {/* Orbiting Nodes */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                animate={{
                                    rotate: 360,
                                }}
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    translateX: "-50%",
                                    translateY: "-50%",
                                    transformOrigin: `${100 + i * 30}px`,
                                }}
                                transition={{
                                    duration: 5 + i * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
