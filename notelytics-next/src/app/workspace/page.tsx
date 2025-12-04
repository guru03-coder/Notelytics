"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Send,
    Loader2,
    Upload,
    ArrowLeft,
    Save,
    FileText,
    Trash2,
    Plus,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getSubject,
    saveSubject,
    createSubject,
    addDocument,
    removeDocument,
    getDocument,
    type Subject,
    type Message,
    type Document
} from "@/lib/storage";
import { FlashcardGenerator } from "@/components/FlashcardGenerator";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "@/hooks/useTranslation";

function WorkspaceContent() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const subjectId = searchParams?.get("id");

    const [subject, setSubject] = useState<Subject | null>(null);
    const [activeTab, setActiveTab] = useState<"chat" | "flashcards">("chat");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Create subject modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [subjectName, setSubjectName] = useState("");

    // Upload document modal
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFileName, setUploadFileName] = useState("");
    const [uploadContent, setUploadContent] = useState("");
    const [extracting, setExtracting] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (subjectId) {
            const loaded = getSubject(subjectId);
            if (loaded) {
                setSubject(loaded);
            }
        } else {
            setShowCreateModal(true);
        }
    }, [subjectId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [subject?.messages]);

    const handleCreateSubject = () => {
        if (!subjectName.trim()) return;

        const newSubject = createSubject(subjectName);
        saveSubject(newSubject);
        setSubject(newSubject);
        setShowCreateModal(false);
        router.push(`/workspace?id=${newSubject.id}`);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadFileName(file.name);

        if (file.type === "application/pdf") {
            setExtracting(true);
            try {
                const pdfjsLib = await import('pdfjs-dist');
                // Use local worker file from public directory
                pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }

                setUploadContent(fullText);
            } catch (error) {
                console.error('PDF extraction error:', error);
                alert('Failed to extract PDF text. Please try pasting the content manually.');
            } finally {
                setExtracting(false);
            }
        } else if (file.type.startsWith('text/')) {
            const text = await file.text();
            setUploadContent(text);
        } else {
            alert('Please upload a PDF or text file');
        }
    };

    const handleAddDocument = () => {
        if (!subject || !uploadFileName.trim() || !uploadContent.trim()) return;

        addDocument(subject.id, uploadFileName, uploadContent);
        const updated = getSubject(subject.id);
        if (updated) {
            setSubject(updated);
        }

        setUploadFileName("");
        setUploadContent("");
        setShowUploadModal(false);
    };

    const handleDeleteDocument = (documentId: string) => {
        if (!subject) return;
        if (!confirm("Delete this document?")) return;

        removeDocument(subject.id, documentId);
        const updated = getSubject(subject.id);
        if (updated) {
            setSubject(updated);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() || !subject) return;

        const userMessage: Message = { role: "user", content: message };
        const updatedSubject = {
            ...subject,
            messages: [...subject.messages, userMessage]
        };
        setSubject(updatedSubject);
        setMessage("");
        setLoading(true);

        try {
            // Combine all document contents
            const allDocuments = subject.documents.map(doc =>
                `Document: ${doc.name}\n${doc.content}`
            ).join('\n\n---\n\n');

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: message,
                    documentContent: allDocuments,
                    history: subject.messages
                })
            });

            const data = await response.json();
            const assistantMessage: Message = { role: "assistant", content: data.response };

            const finalSubject = {
                ...updatedSubject,
                messages: [...updatedSubject.messages, assistantMessage]
            };
            setSubject(finalSubject);
            saveSubject(finalSubject);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Create Subject Modal
    if (showCreateModal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md bg-card border-white/10 p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <img src="/logo.png" alt="Notelytics" className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">Create New Subject</h1>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Subject Name</label>
                            <Input
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                placeholder="e.g., Mathematics, Physics, History"
                                className="glass-input"
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateSubject()}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => router.push("/dashboard")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateSubject}
                                disabled={!subjectName.trim()}
                                className="flex-1 bg-primary hover:bg-primary/90"
                            >
                                Create Subject
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-background pt-20">
            {/* Header */}
            <div className="glass-panel p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/dashboard")}
                            className="flex-shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">{t("back")}</span>
                        </Button>
                        <div className="h-4 w-px bg-white/10" />
                        <h2 className="text-base sm:text-lg font-semibold truncate">{subject.name}</h2>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowUploadModal(true)}
                            className="flex-1 sm:flex-none"
                        >
                            <Plus className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">{t("uploadDocument")}</span>
                            <span className="sm:hidden">{t("upload")}</span>
                        </Button>
                        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                            <Save className="w-3 h-3" />
                            {t("autoSaved")}
                        </div>
                    </div>
                </div>

                {/* Documents List */}
                {subject.documents.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {subject.documents.map((doc) => (
                            <Card key={doc.id} className="px-3 py-2 glass flex items-center gap-2 group">
                                <FileText className="w-3 h-3 text-primary" />
                                <span className="text-xs">{doc.name}</span>
                                <button
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3 text-red-500 hover:text-red-400" />
                                </button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex glass-panel px-4">
                <button
                    onClick={() => setActiveTab("chat")}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "chat"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {t("chat")}
                </button>
                <button
                    onClick={() => setActiveTab("flashcards")}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "flashcards"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {t("flashcards")}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === "chat" ? (
                    <div className="h-full flex flex-col">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <AnimatePresence>
                                {subject.messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                                    >
                                        {msg.role === "assistant" && (
                                            <Avatar className="w-8 h-8 bg-primary/20 border border-primary/20 flex-shrink-0">
                                                <AvatarFallback>
                                                    <img src="/logo.png" alt="AI" className="w-5 h-5" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={`rounded-2xl p-4 max-w-[80%] ${msg.role === "user"
                                                ? "bg-primary/20 text-foreground border border-primary/20 backdrop-blur-sm"
                                                : "glass"
                                                }`}
                                        >
                                            <div className="prose prose-invert prose-sm max-w-none">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        </div>
                                        {msg.role === "user" && (
                                            <Avatar className="w-8 h-8 bg-white/10 border border-white/10 flex-shrink-0">
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {loading && (
                                <div className="flex gap-3">
                                    <Avatar className="w-8 h-8 bg-primary/20">
                                        <AvatarFallback>
                                            <img src="/logo.png" alt="AI" className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Card className="p-4 bg-card/50 border-white/10">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    </Card>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-white/10 bg-card/30 backdrop-blur-sm p-4">
                            <div className="flex gap-2">
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    placeholder={subject.documents.length > 0
                                        ? t("askAnything")
                                        : t("uploadToStart")}
                                    className="resize-none glass-input"
                                    rows={2}
                                    disabled={subject.documents.length === 0}
                                />
                                <Button
                                    onClick={sendMessage}
                                    disabled={loading || !message.trim() || subject.documents.length === 0}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Press Enter to send, Shift+Enter for new line
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto p-6">
                        <FlashcardGenerator
                            subjectId={subject.id}
                            existingFlashcards={subject.flashcards || []}
                            onUpdate={() => setSubject(getSubject(subject.id))}
                        />
                    </div>
                )
                }
            </div >

            {/* Upload Document Modal */}
            <AnimatePresence>
                {
                    showUploadModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowUploadModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-2xl"
                            >
                                <Card className="p-8 glass max-h-[80vh] overflow-y-auto">
                                    <h2 className="text-xl font-bold mb-4">Upload Document</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Document Name</label>
                                            <Input
                                                value={uploadFileName}
                                                onChange={(e) => setUploadFileName(e.target.value)}
                                                placeholder="e.g., Chapter 5 Notes"
                                                className="glass-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Upload File</label>
                                            <input
                                                type="file"
                                                accept=".pdf,.txt,.md"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                id="file-upload-modal"
                                            />
                                            <label
                                                htmlFor="file-upload-modal"
                                                className="block p-8 border-2 border-dashed border-white/20 rounded-lg hover:border-primary/50 cursor-pointer text-center transition-colors"
                                            >
                                                <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                                                <p className="text-sm text-muted-foreground">
                                                    Click to upload PDF or text file
                                                </p>
                                            </label>
                                        </div>

                                        {extracting && (
                                            <div className="flex items-center gap-2 text-sm text-primary">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Extracting text from PDF...
                                            </div>
                                        )}

                                        {uploadContent && !extracting && (
                                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                                <p className="text-sm text-green-400 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    Document extracted successfully ({uploadContent.length.toLocaleString()} characters)
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => setShowUploadModal(false)}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleAddDocument}
                                                disabled={!uploadFileName.trim() || !uploadContent.trim() || extracting}
                                                className="flex-1 bg-primary hover:bg-primary/90"
                                            >
                                                Add Document
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </div >
    );
}

export default function WorkspacePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <WorkspaceContent />
        </Suspense>
    );
}
