"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";

const WHATSAPP_MSG = encodeURIComponent(
    "Hello Ayanco Trade! I'd like to inquire about your products and services."
);

// Only show after user scrolls — keeps the hero area clean
const SCROLL_THRESHOLD = 600;

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Prevent annoying user if they already saw it this session
        if (typeof window !== "undefined" && sessionStorage.getItem("wa_widget_seen")) {
            return;
        }

        let idleTimer: NodeJS.Timeout;
        const resetIdle = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (!isVisible) triggerWidget();
            }, 30000); // 30s inactivity
        };

        const triggerWidget = () => {
            setIsVisible(true);
            sessionStorage.setItem("wa_widget_seen", "true");
        };

        const handleScroll = () => {
            resetIdle();
            if (window.scrollY > SCROLL_THRESHOLD && !isVisible) {
                triggerWidget();
            }
        };

        const handleInteraction = () => resetIdle();
        
        // Initial setup
        resetIdle();
        handleScroll();
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleInteraction, { passive: true });
        window.addEventListener("keydown", handleInteraction, { passive: true });
        
        return () => {
            clearTimeout(idleTimer);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };
    }, [isVisible]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white shadow-2xl shadow-black/15 border border-zinc-200 w-72 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-green-600 px-5 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">ATC</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold text-sm">Ayanco Trade Desk</p>
                                <p className="text-green-100 text-xs">Typically replies in &lt; 4 hours</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Chat bubble */}
                        <div className="p-5">
                            <div className="bg-zinc-100 rounded-xl rounded-tl-none px-4 py-3 text-sm text-zinc-700 leading-relaxed">
                                👋 Hello! Ready to discuss your trade requirements? Message us for fast sourcing quotes.
                            </div>

                            <motion.a
                                href={`${SITE.contact.whatsapp}?text=${WHATSAPP_MSG}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.97 }}
                                className="mt-4 flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                            >
                                Start Chat on WhatsApp
                                <ArrowRight size={14} />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button — scroll-gated, not time-gated */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-14 h-14 bg-green-600 hover:bg-green-500 shadow-xl shadow-green-900/30 flex items-center justify-center text-white transition-colors rounded-full"
                        aria-label="Open WhatsApp chat"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <X size={22} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <MessageCircle size={22} />
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Pulse ring */}
                        {!isOpen && (
                            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 pointer-events-none" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
