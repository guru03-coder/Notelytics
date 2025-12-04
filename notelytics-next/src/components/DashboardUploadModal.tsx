"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Upload,
    FileText,
    Image as ImageIcon,
    ClipboardPaste,
    Loader2,
    CheckCircle2,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    workspaceId?: string | null;
}

export function DashboardUploadModal({ isOpen, onClose, workspaceId }: DashboardUploadModalProps) {
    const [uploadType, setUploadType] = useState<"pdf" | "image" | "text" | null>(null);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [extracting, setExtracting] = useState(false);

    const extractTextFromPDF = async (file: File): Promise<string> => {
        setExtracting(true);
        try {
            // Dynamic import to avoid SSR issues
            const pdfjsLib = await import('pdfjs-dist');
            // Use local worker file from public directory
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(' ');
                fullText += pageText + '\n\n';
            }

            setExtracting(false);
            return fullText;
        } catch (error) {
            console.error('PDF extraction error:', error);
            setExtracting(false);
            throw new Error('Failed to extract text from PDF');
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "pdf" | "image") => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadType(type);

            // Auto-extract text from PDF
            if (type === "pdf") {
                try {
                    const extractedText = await extractTextFromPDF(selectedFile);
                    setText(extractedText);
                } catch (error) {
                    alert('Failed to read PDF. Please try a different file.');
                }
            }
        }
    };

    const handleProcess = async () => {
        if (!text.trim() && !file) return;

        setLoading(true);
        setProcessing(true);

        try {
            let content = text;

            // For PDF, we already have the text extracted
            // For images, we'd need OCR (future enhancement)
            if (uploadType === "image" && file) {
                content = `Image file uploaded: ${file.name}. OCR processing would extract text here.`;
            }

            await processContent(content);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to process. Please check your API key.");
            setLoading(false);
            setProcessing(false);
        }
    };

    const processContent = async (content: string) => {
        const response = await fetch("/api/gemini/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: content,
                subject: workspaceId || "general",
                fileType: uploadType || "text"
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        setResult(data);
        setLoading(false);

        setTimeout(() => {
            setProcessing(false);
        }, 1500);
    };

    const resetModal = () => {
        setUploadType(null);
        setText("");
        setFile(null);
        setResult(null);
        setProcessing(false);
        setLoading(false);
        setExtracting(false);
    };

    const handleClose = () => {
        resetModal();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <Upload className="w-6 h-6 text-primary" />
                        Upload Study Notes
                    </DialogTitle>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {!uploadType && !result && (
                        <motion.div
                            key="upload-options"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6"
                        >
                            {/* PDF Upload */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, "pdf")}
                                    className="hidden"
                                    id="pdf-upload"
                                />
                                <label
                                    htmlFor="pdf-upload"
                                    className="block p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <FileText className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                                    <h3 className="font-semibold text-center mb-2">Upload PDF</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Lecture notes, textbooks, papers
                                    </p>
                                </label>
                            </div>

                            {/* Image Upload */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, "image")}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="block p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                                    <h3 className="font-semibold text-center mb-2">Upload Image</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Handwritten notes, whiteboard
                                    </p>
                                </label>
                            </div>

                            {/* Text Paste */}
                            <button
                                onClick={() => setUploadType("text")}
                                className="p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all group"
                            >
                                <ClipboardPaste className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-center mb-2">Paste Text</h3>
                                <p className="text-sm text-muted-foreground text-center">
                                    Copy-paste your notes
                                </p>
                            </button>
                        </motion.div>
                    )}

                    {uploadType === "text" && !result && (
                        <motion.div
                            key="text-input"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4 py-4"
                        >
                            <div>
                                <label className="text-sm font-medium mb-2 block">Paste Your Notes</label>
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste your study notes here..."
                                    className="min-h-[300px] glass-input"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={resetModal} variant="outline" className="flex-1">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleProcess}
                                    disabled={!text.trim() || loading}
                                    className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Process Notes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {file && !result && (
                        <motion.div
                            key="file-preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4 py-4"
                        >
                            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                        {uploadType === "pdf" ? (
                                            <FileText className="w-6 h-6 text-primary" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-primary" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{file.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    {!extracting && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                                    {extracting && <Loader2 className="w-6 h-6 text-primary animate-spin" />}
                                </div>
                            </div>

                            {extracting && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                        <span className="text-sm">Extracting text from PDF...</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-purple-600"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                </div>
                            )}

                            {processing && !extracting && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                        <span className="text-sm">Processing with AI...</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-purple-600"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2 }}
                                        />
                                    </div>
                                </div>
                            )}

                            {text && !extracting && (
                                <div className="mt-4">
                                    <label className="text-sm font-medium mb-2 block">Extracted Text Preview</label>
                                    <Textarea
                                        value={text.substring(0, 500) + (text.length > 500 ? '...' : '')}
                                        readOnly
                                        className="min-h-[150px] glass-input text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {text.length} characters extracted
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button onClick={resetModal} variant="outline" className="flex-1">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleProcess}
                                    disabled={loading || extracting || !text}
                                    className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Process with AI
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 py-4"
                        >
                            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <div>
                                    <h4 className="font-semibold">Processing Complete!</h4>
                                    <p className="text-sm text-muted-foreground">Your notes have been analyzed</p>
                                </div>
                            </div>

                            {result.summary && (
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-primary" />
                                        Summary
                                    </h3>
                                    <p className="text-sm text-muted-foreground bg-white/5 p-4 rounded-lg">
                                        {result.summary}
                                    </p>
                                </div>
                            )}

                            {result.keyPoints && result.keyPoints.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Key Points</h3>
                                    <ul className="space-y-2">
                                        {result.keyPoints.map((point: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result.quiz && result.quiz.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Quiz Questions</h3>
                                    <div className="space-y-4">
                                        {result.quiz.map((q: any, i: number) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                <p className="font-medium mb-3">{i + 1}. {q.question}</p>
                                                <div className="space-y-2">
                                                    {q.options?.map((opt: string, j: number) => (
                                                        <div
                                                            key={j}
                                                            className={`p-2 rounded text-sm ${opt === q.answer
                                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                                : "bg-white/5 text-muted-foreground"
                                                                }`}
                                                        >
                                                            {String.fromCharCode(65 + j)}. {opt}
                                                            {opt === q.answer && " ✓"}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {result.flashcards && result.flashcards.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Flashcards</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.flashcards.map((card: any, i: number) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                <div className="text-sm font-medium text-primary mb-2">Q: {card.front}</div>
                                                <div className="text-sm text-muted-foreground">A: {card.back}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Button onClick={handleClose} variant="outline" className="flex-1">
                                    Close
                                </Button>
                                <Button className="flex-1 bg-primary hover:bg-primary/90">
                                    View in Study Viewer
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
