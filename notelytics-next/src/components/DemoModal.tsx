"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Upload, Brain } from "lucide-react";

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Watch Notelytics in Action</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-white/5 to-white/0 rounded-lg border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                            <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
                            <p className="text-muted-foreground">Demo video coming soon</p>
                        </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                            <Upload className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-semibold mb-1">Upload Notes</h4>
                            <p className="text-sm text-muted-foreground">
                                Drag & drop PDFs, images, or text files
                            </p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                            <Brain className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-semibold mb-1">AI Analysis</h4>
                            <p className="text-sm text-muted-foreground">
                                Get instant explanations and summaries
                            </p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                            <Sparkles className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-semibold mb-1">Smart Quizzes</h4>
                            <p className="text-sm text-muted-foreground">
                                Auto-generated questions to test knowledge
                            </p>
                        </div>
                    </div>

                    <Button onClick={onClose} className="w-full">
                        Got it, let's start!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
