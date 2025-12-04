"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Plus,
    FileText,
    Trash2,
    Search,
    Folder,
    Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { getSubjects, deleteSubject, type Subject } from "@/lib/storage";
import { useTranslation } from "@/hooks/useTranslation";

export default function Dashboard() {
    const { t } = useTranslation();
    const router = useRouter();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = () => {
        const loaded = getSubjects();
        setSubjects(loaded.sort((a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ));
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(t("deleteConfirm"))) {
            deleteSubject(id);
            loadSubjects();
        }
    };

    const filteredSubjects = subjects.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header */}
            <div className="glass-panel sticky top-0 z-50">
                <div className="container px-4 md:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Notelytics" className="w-8 sm:w-10 h-8 sm:h-10" />
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold">{t("dashboard")}</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    {subjects.length} {subjects.length !== 1 ? t("subjects") : t("subject")}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push("/workspace")}
                            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {t("newSubject")}
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("searchSubjects")}
                            className="pl-10 glass-input"
                        />
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="container px-4 md:px-6 py-8">
                {filteredSubjects.length === 0 ? (
                    <div className="text-center py-16">
                        <Folder className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-xl font-semibold mb-2">
                            {searchQuery ? t("noSubjectsFound") : t("noSubjectsYet")}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery
                                ? t("tryDifferentSearch")
                                : t("createFirstSubject")}
                        </p>
                        {!searchQuery && (
                            <Button
                                onClick={() => router.push("/workspace")}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t("createSubject")}
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSubjects.map((subject, idx) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card
                                    onClick={() => router.push(`/workspace?id=${subject.id}`)}
                                    className="p-6 glass glass-hover cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                                <Folder className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold truncate">{subject.name}</h3>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(subject.id, e)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span>{subject.documents.length} document{subject.documents.length !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(subject.updatedAt)}</span>
                                        </div>
                                    </div>

                                    {subject.documents.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-xs text-muted-foreground mb-2">Documents:</p>
                                            <div className="space-y-1">
                                                {subject.documents.slice(0, 3).map((doc) => (
                                                    <div key={doc.id} className="text-xs text-muted-foreground truncate flex items-center gap-1">
                                                        <FileText className="w-3 h-3 flex-shrink-0" />
                                                        <span className="truncate">{doc.name}</span>
                                                    </div>
                                                ))}
                                                {subject.documents.length > 3 && (
                                                    <p className="text-xs text-muted-foreground">
                                                        +{subject.documents.length - 3} more
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
