"use client";

import { useState, useEffect } from "react";
import { getTranslation, type Language, type TranslationKey } from "@/lib/translations";

export function useTranslation() {
    const [language, setLanguage] = useState<Language>("hi");

    useEffect(() => {
        const savedLang = localStorage.getItem("app_language") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedLang = localStorage.getItem("app_language") as Language;
            if (savedLang) {
                setLanguage(savedLang);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        // Also listen for custom event
        window.addEventListener("languageChange", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("languageChange", handleStorageChange);
        };
    }, []);

    const t = (key: TranslationKey): string => {
        return getTranslation(language, key);
    };

    return { t, language };
}
