// Storage utilities for subject persistence

export interface Message {
    role: "user" | "assistant";
    content: string;
}

export interface Document {
    id: string;
    name: string;
    content: string;
    uploadedAt: string;
}

export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    explanation?: string;
}

export interface Subject {
    id: string;
    name: string;
    documents: Document[];
    flashcards: Flashcard[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

// Legacy workspace interface for migration
interface LegacyWorkspace {
    id: string;
    name: string;
    documentContent: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = "notelytics_subjects";
const LEGACY_KEY = "notelytics_workspaces";

// Migrate old workspaces to new subject format
function migrateFromLegacy(): void {
    if (typeof window === "undefined") return;

    const legacyData = localStorage.getItem(LEGACY_KEY);
    const newData = localStorage.getItem(STORAGE_KEY);

    // Only migrate if we have legacy data and no new data
    if (legacyData && !newData) {
        try {
            const legacyWorkspaces: LegacyWorkspace[] = JSON.parse(legacyData);
            const subjects: Subject[] = legacyWorkspaces.map(workspace => ({
                id: workspace.id,
                name: workspace.name,
                documents: [{
                    id: crypto.randomUUID(),
                    name: workspace.name,
                    content: workspace.documentContent,
                    uploadedAt: workspace.createdAt
                }],
                flashcards: [],
                messages: workspace.messages,
                createdAt: workspace.createdAt,
                updatedAt: workspace.updatedAt
            }));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
            // Keep legacy data for safety, don't delete it
        } catch (error) {
            console.error("Migration failed:", error);
        }
    }
}

export function saveSubject(subject: Subject): void {
    const subjects = getSubjects();
    const existingIndex = subjects.findIndex(s => s.id === subject.id);

    subject.updatedAt = new Date().toISOString();

    if (existingIndex >= 0) {
        subjects[existingIndex] = subject;
    } else {
        subjects.push(subject);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

export function getSubjects(): Subject[] {
    if (typeof window === "undefined") return [];

    migrateFromLegacy();

    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
        const subjects: Subject[] = JSON.parse(data);
        // Ensure all subjects have flashcards array (migration for existing data)
        return subjects.map(s => ({
            ...s,
            flashcards: s.flashcards || []
        }));
    } catch {
        return [];
    }
}

export function getSubject(id: string): Subject | null {
    const subjects = getSubjects();
    return subjects.find(s => s.id === id) || null;
}

export function deleteSubject(id: string): void {
    const subjects = getSubjects();
    const filtered = subjects.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function updateSubject(id: string, updates: Partial<Subject>): void {
    const subject = getSubject(id);
    if (!subject) return;

    const updated = { ...subject, ...updates, updatedAt: new Date().toISOString() };
    saveSubject(updated);
}

export function createSubject(name: string): Subject {
    return {
        id: crypto.randomUUID(),
        name,
        documents: [],
        flashcards: [],
        messages: [
            {
                role: "assistant",
                content: `Welcome to "${name}"! Upload documents to get started. I can help you understand concepts, create quizzes, generate flashcards, or answer questions from your materials.`
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

export function addDocument(subjectId: string, name: string, content: string): void {
    const subject = getSubject(subjectId);
    if (!subject) return;

    const document: Document = {
        id: crypto.randomUUID(),
        name,
        content,
        uploadedAt: new Date().toISOString()
    };

    subject.documents.push(document);

    // Add a message about the new document
    subject.messages.push({
        role: "assistant",
        content: `I've added "${name}" to this subject. You can now ask me questions about it!`
    });

    saveSubject(subject);
}

export function removeDocument(subjectId: string, documentId: string): void {
    const subject = getSubject(subjectId);
    if (!subject) return;

    subject.documents = subject.documents.filter(d => d.id !== documentId);
    saveSubject(subject);
}

export function getDocument(subjectId: string, documentId: string): Document | null {
    const subject = getSubject(subjectId);
    if (!subject) return null;

    return subject.documents.find(d => d.id === documentId) || null;
}

export function addFlashcards(subjectId: string, flashcards: Omit<Flashcard, "id">[]): void {
    const subject = getSubject(subjectId);
    if (!subject) return;

    const newFlashcards = flashcards.map(f => ({
        ...f,
        id: crypto.randomUUID()
    }));

    subject.flashcards = [...(subject.flashcards || []), ...newFlashcards];
    saveSubject(subject);
}

// Legacy exports for backward compatibility (will be removed)
export const saveWorkspace = saveSubject;
export const getWorkspaces = getSubjects;
export const getWorkspace = getSubject;
export const deleteWorkspace = deleteSubject;
export const updateWorkspace = updateSubject;

export function createWorkspace(name: string, documentContent: string): Subject {
    const subject = createSubject(name);
    addDocument(subject.id, name, documentContent);
    return getSubject(subject.id)!;
}

export type Workspace = Subject;
