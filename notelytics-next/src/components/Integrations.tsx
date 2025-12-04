"use client";

import React from "react";
import { Github, HardDrive, Smartphone, Lock } from "lucide-react";

export function Integrations() {
    const integrations = [
        { icon: HardDrive, name: "Google Drive" },
        { icon: Github, name: "GitHub" },
        { icon: Smartphone, name: "Mobile Apps" },
        { icon: Lock, name: "OAuth Secure" },
    ];

    return (
        <section className="py-32 bg-black/20 border-y border-white/5">
            <div className="container px-4 md:px-6 text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12">
                    Seamlessly Integrated With Your Workflow
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
                    {integrations.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <item.icon className="w-8 h-8 text-foreground" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
