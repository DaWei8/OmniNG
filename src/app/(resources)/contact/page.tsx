"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-32 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Get in <span className="text-green-500">Touch</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Have a question, suggestion, or just want to say hello? We are here to help.
                    </p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-5 -mt-20 relative z-20">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row">

                    {/* Contact Info Side */}
                    <div className="md:w-5/12 bg-zinc-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                            <div className="space-y-8">
                                <ContactItem icon={Mail} title="Email" content="support@omni-ng.ng" />
                                <ContactItem icon={Phone} title="Phone" content="+234 (0) 123 456 7890" />
                                <ContactItem icon={MapPin} title="Office" content="123 Freedom Way, Lekki, Lagos" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <h4 className="font-bold mb-4 text-zinc-400 uppercase text-xs tracking-wider">Socials</h4>
                            <div className="flex gap-4">
                                <SocialIcon label="TW" />
                                <SocialIcon label="IG" />
                                <SocialIcon label="LI" />
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-7/12 p-10 lg:p-14">
                        {formStatus === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-zinc-500">We will get back to you within 24 hours.</p>
                                <button onClick={() => setFormStatus('idle')} className="mt-8 text-green-600 font-bold hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">First Name</label>
                                        <input required type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Last Name</label>
                                        <input required type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
                                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Subject</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all">
                                        <option>General Inquiry</option>
                                        <option>Tech Support</option>
                                        <option>Partnership Proposal</option>
                                        <option>Report Data Error</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Message</label>
                                    <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"></textarea>
                                </div>

                                <button
                                    disabled={formStatus === 'submitting'}
                                    type="submit"
                                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-green-700 dark:hover:bg-green-500 hover:text-white dark:hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                    {!formStatus && <Send className="w-4 h-4" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function ContactItem({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <div className="text-xs text-zinc-500 uppercase font-bold mb-0.5">{title}</div>
                <div className="text-white font-medium">{content}</div>
            </div>
        </div>
    )
}

function SocialIcon({ label }: { label: string }) {
    return (
        <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-xs hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer">
            {label}
        </div>
    )
}
