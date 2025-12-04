"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Calendar as CalendarIcon,
    Plus,
    Trash2,
    Clock,
    BookOpen,
    ArrowLeft,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Exam {
    id: string;
    subject: string;
    date: string;
    time: string;
    notes: string;
    color: string;
}

const COLORS = ["#5B8EF5", "#7B5FE8", "#EC4899", "#F59E0B", "#10B981", "#EF4444"];

export default function ExamSchedulePage() {
    const router = useRouter();
    const [exams, setExams] = useState<Exam[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [newExam, setNewExam] = useState({
        subject: "",
        date: "",
        time: "",
        notes: "",
        color: COLORS[0]
    });

    useEffect(() => {
        const saved = localStorage.getItem("exam_schedule");
        if (saved) {
            setExams(JSON.parse(saved));
        }
    }, []);

    const saveExams = (updatedExams: Exam[]) => {
        setExams(updatedExams);
        localStorage.setItem("exam_schedule", JSON.stringify(updatedExams));
    };

    const addExam = () => {
        if (!newExam.subject || !newExam.date) return;

        const exam: Exam = {
            id: crypto.randomUUID(),
            ...newExam
        };

        saveExams([...exams, exam]);
        setNewExam({ subject: "", date: "", time: "", notes: "", color: COLORS[0] });
        setShowAddModal(false);
    };

    const deleteExam = (id: string) => {
        saveExams(exams.filter(e => e.id !== id));
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const getExamsForDate = (date: Date) => {
        // Format date as YYYY-MM-DD in local timezone to avoid UTC conversion issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        return exams.filter(e => e.date === dateStr);
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header */}
            <div className="border-b border-white/10 bg-card/30 backdrop-blur-sm">
                <div className="container px-4 md:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push("/dashboard")}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <div className="h-4 w-px bg-white/10" />
                            <CalendarIcon className="w-8 h-8 text-primary" />
                            <div>
                                <h1 className="text-2xl font-bold">Exam Schedule</h1>
                                <p className="text-sm text-muted-foreground">
                                    {exams.length} exam{exams.length !== 1 ? 's' : ''} scheduled
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Exam
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-card/50 border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">{monthName}</h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={previousMonth}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={nextMonth}>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                                        {day}
                                    </div>
                                ))}

                                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square" />
                                ))}

                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                    const dayExams = getExamsForDate(date);
                                    const isToday = new Date().toDateString() === date.toDateString();

                                    return (
                                        <div
                                            key={day}
                                            className={`aspect-square p-2 rounded-lg border transition-all ${isToday
                                                ? 'border-primary bg-primary/10'
                                                : 'border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="text-sm font-medium mb-1">{day}</div>
                                            <div className="space-y-1">
                                                {dayExams.slice(0, 2).map(exam => (
                                                    <div
                                                        key={exam.id}
                                                        className="text-xs px-1 py-0.5 rounded truncate"
                                                        style={{ backgroundColor: exam.color + '40', color: exam.color }}
                                                    >
                                                        {exam.subject}
                                                    </div>
                                                ))}
                                                {dayExams.length > 2 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        +{dayExams.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Upcoming Exams List */}
                    <div>
                        <Card className="p-6 bg-card/50 border-white/10">
                            <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                {exams
                                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                    .map((exam, idx) => (
                                        <motion.div
                                            key={exam.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Card className="p-4 bg-background/50 border-white/10 hover:border-primary/30 transition-all">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: exam.color }}
                                                        />
                                                        <h3 className="font-semibold">{exam.subject}</h3>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteExam(exam.id)}
                                                        className="text-red-500 hover:text-red-400"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-1 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {new Date(exam.date + 'T00:00:00').toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    {exam.time && (
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-3 h-3" />
                                                            {exam.time}
                                                        </div>
                                                    )}
                                                    {exam.notes && (
                                                        <div className="flex items-start gap-2 mt-2">
                                                            <BookOpen className="w-3 h-3 mt-0.5" />
                                                            <p className="text-xs">{exam.notes}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                {exams.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No exams scheduled yet</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Add Exam Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md"
                        >
                            <Card className="p-6 bg-card border-white/10">
                                <h2 className="text-xl font-bold mb-4">Add New Exam</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Subject</label>
                                        <Input
                                            value={newExam.subject}
                                            onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                                            placeholder="e.g., Mathematics"
                                            className="bg-background/50 border-white/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Date</label>
                                        <Input
                                            type="date"
                                            value={newExam.date}
                                            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                                            className="bg-background/50 border-white/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Time (Optional)</label>
                                        <Input
                                            type="time"
                                            value={newExam.time}
                                            onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                                            className="bg-background/50 border-white/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Color</label>
                                        <div className="flex gap-2">
                                            {COLORS.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setNewExam({ ...newExam, color })}
                                                    className={`w-8 h-8 rounded-full transition-all ${newExam.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                                                        }`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                                        <Textarea
                                            value={newExam.notes}
                                            onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                                            placeholder="Topics to review, chapters to study..."
                                            className="bg-background/50 border-white/10"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowAddModal(false)}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={addExam}
                                            disabled={!newExam.subject || !newExam.date}
                                            className="flex-1 bg-primary hover:bg-primary/90"
                                        >
                                            Add Exam
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
