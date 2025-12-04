"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState("hi");
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    // Load saved language on mount
    useEffect(() => {
        const savedLang = localStorage.getItem("app_language");
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Save language when it changes
    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("app_language", lang);
        setLangDropdownOpen(false);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event("languageChange"));
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (langDropdownOpen) setLangDropdownOpen(false);
        };
        if (langDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [langDropdownOpen]);

    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only scroll for anchor links (starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            setMobileMenuOpen(false);

            // Check if we're on the home page
            if (window.location.pathname !== '/') {
                // Navigate to home page with hash
                window.location.href = '/' + href;
            } else {
                // Already on home page, just scroll
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        } else {
            // For page links, just close the menu
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Notelytics" className="w-8 h-8" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Notelytics
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/dashboard" className="text-sm hover:text-primary transition-colors">
                        {t("dashboard")}
                    </Link>
                    <Link href="/features" className="text-sm hover:text-primary transition-colors">
                        {t("features")}
                    </Link>
                    <Link href="/pricing" className="text-sm hover:text-primary transition-colors">
                        {t("pricing")}
                    </Link>
                    <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                        {t("contact")}
                    </Link>
                    <Link href="/exam-schedule" className="text-sm hover:text-primary transition-colors">
                        {t("examSchedule")}
                    </Link>
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLangDropdownOpen(!langDropdownOpen);
                            }}
                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="uppercase font-medium">{language}</span>
                        </button>
                        <AnimatePresence>
                            {langDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full right-0 mt-2 glass rounded-lg shadow-xl overflow-hidden min-w-[140px]"
                                >
                                    {[
                                        { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
                                        { code: "en", name: "English", flag: "🇬🇧" },
                                        { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
                                        { code: "te", name: "తెలుగు", flag: "🇮🇳" },
                                        { code: "bn", name: "বাংলা", flag: "🇮🇳" },
                                        { code: "mr", name: "मराठी", flag: "🇮🇳" },
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/20 transition-colors ${language === lang.code ? "bg-primary/10 text-primary" : ""
                                                }`}
                                        >
                                            {lang.flag} {lang.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
                    >
                        {navLinks.map((link) => {
                            // Use Link component for page navigation, anchor for scroll
                            if (link.href.startsWith('#')) {
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-lg font-medium text-foreground/80 hover:text-primary py-2"
                                    >
                                        {link.name}
                                    </a>
                                );
                            } else {
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-foreground/80 hover:text-primary py-2"
                                    >
                                        {link.name}
                                    </Link>
                                );
                            }
                        })}
                        <Link href="/exam-schedule" className="text-lg font-medium text-foreground/80 hover:text-primary py-2">
                            Exam Schedule
                        </Link>
                        {/* Mobile Language Selector */}
                        <div className="border-t border-white/10 pt-4 mt-2">
                            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Language
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { code: "hi", name: "हिन्दी", short: "HI" },
                                    { code: "en", name: "English", short: "EN" },
                                    { code: "ta", name: "தமிழ்", short: "TA" },
                                    { code: "te", name: "తెలుగు", short: "TE" },
                                    { code: "bn", name: "বাংলা", short: "BN" },
                                    { code: "mr", name: "मराठी", short: "MR" },
                                ].map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLanguageChange(lang.code);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${language === lang.code
                                            ? "bg-primary/20 text-primary border border-primary/30"
                                            : "bg-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        🇮🇳 {lang.short}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
