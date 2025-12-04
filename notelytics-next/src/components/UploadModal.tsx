"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Loader2 } from "lucide-react";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to analyze. Make sure GEMINI_API_KEY is set in .env.local");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setText(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload & Analyze Your Notes</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <input
                            type="file"
                            accept=".txt,.md"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Click to upload a text file or paste content below
                            </p>
                        </label>
                    </div>

                    {/* Text Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Notes</label>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your notes here or upload a file above..."
                            className="min-h-[200px] bg-background/50"
                        />
                    </div>

                    {/* Analyze Button */}
                    <Button
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <FileText className="w-4 h-4 mr-2" />
                                Analyze with AI
                            </>
                        )}
                    </Button>

                    {/* Results */}
                    {result && (
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            {result.explanation && (
                                <div>
                                    <h3 className="font-semibold mb-2">Explanation</h3>
                                    <p className="text-sm text-muted-foreground">{result.explanation}</p>
                                </div>
                            )}

                            {result.summary && (
                                <div>
                                    <h3 className="font-semibold mb-2">Summary</h3>
                                    <p className="text-sm text-muted-foreground">{result.summary}</p>
                                </div>
                            )}

                            {result.quiz && result.quiz.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2">Quiz Questions</h3>
                                    <div className="space-y-3">
                                        {result.quiz.map((q: any, i: number) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-lg">
                                                <p className="font-medium mb-2">{q.question}</p>
                                                <ul className="space-y-1 text-sm">
                                                    {q.options?.map((opt: string, j: number) => (
                                                        <li key={j} className={opt === q.answer ? "text-primary" : "text-muted-foreground"}>
                                                            {opt} {opt === q.answer && "✓"}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
