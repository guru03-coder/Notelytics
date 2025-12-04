"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle2, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Form submitted:", formData);
        setSubmitted(true);
        setLoading(false);

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header */}
            <div className="border-b border-white/10 bg-card/30 backdrop-blur-sm">
                <div className="container px-4 md:px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Mail className="w-16 h-16 mx-auto mb-4 text-primary" />
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Get in
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> Touch</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-card/50 border-white/10">
                            <Mail className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-2">Email Us</h3>
                            <p className="text-sm text-muted-foreground">support@notelytics.com</p>
                        </Card>

                        <Card className="p-6 bg-card/50 border-white/10">
                            <MapPin className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-semibold mb-2">Office</h3>
                            <p className="text-sm text-muted-foreground">
                                Chennai, Tamil Nadu<br />
                                India
                            </p>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 bg-card/50 border-white/10">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                                    <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground">We'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Name</label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                required
                                                className="bg-background/50 border-white/10"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Email</label>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                required
                                                className="bg-background/50 border-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Subject</label>
                                        <Input
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            required
                                            className="bg-background/50 border-white/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Message</label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more about your question or feedback..."
                                            rows={6}
                                            required
                                            className="bg-background/50 border-white/10"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary/90"
                                    >
                                        {loading ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
