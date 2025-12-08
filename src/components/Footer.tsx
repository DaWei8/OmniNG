"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-white border-t border-zinc-900">
            <div className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span>OmniNG</span>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed">
                            Empowering Nigerians with real-time data, transparency in governance, and a voice in shaping the future.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<FaTwitter className="w-5 h-5" />} label="Twitter" />
                            <SocialLink href="#" icon={<FaFacebook className="w-5 h-5" />} label="Facebook" />
                            <SocialLink href="#" icon={<FaInstagram className="w-5 h-5" />} label="Instagram" />
                            <SocialLink href="#" icon={<FaLinkedin className="w-5 h-5" />} label="LinkedIn" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <FooterLink href="/map" label="Interactive Map" />
                            <FooterLink href="/officials" label="Government Officials" />
                            <FooterLink href="/news" label="Latest News" />
                            <FooterLink href="/proposals" label="Citizen Proposals" />
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-4">
                            <FooterLink href="#" label="About Us" />
                            <FooterLink href="#" label="Methodology" />
                            <FooterLink href="#" label="Data Sources" />
                            <FooterLink href="#" label="Press Kit" />
                            <FooterLink href="#" label="Contact Support" />
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Stay Informed</h3>
                        <p className="text-zinc-400 mb-4">
                            Subscribe to our newsletter for weekly updates on governance and development.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all text-sm"
                            />
                            <button className="bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <p>&copy; {currentYear} OmniNG. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-green-700 hover:text-white transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </Link>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href} className="text-zinc-400 hover:text-green-700 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-green-700 transition-colors" />
                {label}
            </Link>
        </li>
    );
}
