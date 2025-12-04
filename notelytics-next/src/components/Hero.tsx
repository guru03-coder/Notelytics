"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { UploadModal } from "./UploadModal";

export function Hero() {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    return (
        <>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[128px] animate-pulse delay-1000" />
                </div>
                <div className="container relative z-10 px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50">
                            Notelytics – AI Study & <br className="hidden md:block" />
                            <span className="text-primary">Research Workspace</span>
                        </h1>

                        <Button
                            size="lg"
                            onClick={() => setUploadModalOpen(true)}
                            className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-full group"
                        >
                            Try Notelytics
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
        </>
    );
}
