"use client";

import { useState } from 'react';
import { Share2, Link as LinkIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaXTwitter, FaInstagram, FaThreads } from 'react-icons/fa6';
import clsx from 'clsx';
import toast from 'react-hot-toast';

interface ShareButtonProps {
    title?: string;
    text?: string;
    url?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function ShareButton({ title, text, url: propUrl, className, children }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getUrl = () => {
        if (typeof window !== 'undefined') {
            return propUrl || window.location.href;
        }
        return propUrl || '';
    };

    const handleShare = (platform: string) => {
        const url = getUrl();
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text || title || 'Check this out!');

        let shareLink = '';

        switch (platform) {
            case 'whatsapp':
                shareLink = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
                break;
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'threads':
                shareLink = `https://threads.net/intent/post?text=${encodedText}%20${encodedUrl}`;
                break;
            case 'instagram':
                copyToClipboard();
                return;
            default:
                return;
        }

        window.open(shareLink, '_blank', 'width=600,height=500');
        setIsOpen(false);
    };

    const copyToClipboard = () => {
        const url = getUrl();
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={clsx(
                    !children && "p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-green-700 dark:hover:text-green-500",
                    className
                )}
                aria-label="Share"
            >
                {children || <Share2 className="w-5 h-5" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-3xl z-50 flex items-center justify-center p-4"
                        >
                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white absolute top-64 dark:bg-zinc-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/50">
                                    <h3 className="font-bold text-zinc-900 dark:text-white">Share to</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>

                                <div className="p-6 grid grid-cols-4 gap-4">
                                    <ShareOption
                                        icon={<FaWhatsapp className="w-6 h-6" />}
                                        label="WhatsApp"
                                        color="text-green-500 bg-green-50 dark:bg-green-900/20"
                                        onClick={() => handleShare('whatsapp')}
                                    />
                                    <ShareOption
                                        icon={<FaFacebookF className="w-6 h-6" />}
                                        label="Facebook"
                                        color="text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                        onClick={() => handleShare('facebook')}
                                    />
                                    <ShareOption
                                        icon={<FaXTwitter className="w-6 h-6" />}
                                        label="X"
                                        color="text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
                                        onClick={() => handleShare('twitter')}
                                    />
                                    <ShareOption
                                        icon={<FaThreads className="w-6 h-6" />}
                                        label="Threads"
                                        color="text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
                                        onClick={() => handleShare('threads')}
                                    />
                                    <ShareOption
                                        icon={<FaInstagram className="w-6 h-6" />}
                                        label="Instagram"
                                        color="text-pink-600 bg-pink-50 dark:bg-pink-900/20"
                                        onClick={() => handleShare('instagram')}
                                    />
                                </div>

                                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Copy Link
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function ShareOption({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 group"
        >
            <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", color)}>
                {icon}
            </div>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
        </button>
    )
}
