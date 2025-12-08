"use client";

import NigeriaMap from "@/components/NigeriaMap";
import { Users, TrendingUp, AlertTriangle, MessageSquare, Briefcase, FileText, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Hero Section - Full Screen Map */}
      <section className="w-full py-10">
        <div className="text-6xl xl:text-7xl xl:pt-10 text-center font-bold text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
          <h1>Democratic <span className="text-green-700 dark:text-green-700">Accountability</span></h1>
          <h2 className="text-4xl lg:text-5xl font-light text-zinc-600 dark:text-zinc-400">At Your Fingertips</h2>
        </div>
        <p className="text-lg lg:text-xl text-center text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Explore the interactive map below. Click on any state to uncover governance data, track officials, and make your voice heard.
        </p>
        <div className="w-full h-[90vh]">
          <NigeriaMap className="w-full h-full" />
        </div>

        {/* Overlay Content */}
        <div className="flex flex-col items-center justify-start pt-16 px-4">
          <div className="flex text-center max-w-4xl mx-auto pointer-events-auto flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              View National Stats
              <ChevronDown className="w-4 h-4" />
            </button>
            <Link
              href="/news"
              className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Read Latest News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section id="stats-section" className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl xl:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Real-Time Transparency Metrics</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Aggregated live data tracking political accountability across Nigeria's 36 states and Federal Capital Territory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={Users} value="4,281" label="Officials Tracked" color="green" />
            <StatCard icon={Briefcase} value="1,204" label="Promises Kept" color="blue" />
            <StatCard icon={TrendingUp} value="3.8" label="Avg Citizen Rating" color="orange" />
            <StatCard icon={MessageSquare} value="8,532" label="Community Ideas" color="purple" />
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="py-24 bg-zinc-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 ">
            <div className="custom-order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-green-100 dark:bg-green-900/20 rounded-2xl md:rounded-[3rem] -rotate-2" />
                <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl">
                  <div className="space-y-6">
                    {/* Mock Feed Item */}
                    <div className="flex gap-4 items-start pb-6 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white">New Educational Policy</h4>
                        <p className="text-sm text-zinc-500 mt-1">Lagos State Ministry of Education released new guidelines for private schools.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start pb-6 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-green-700 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white">Infrastructure Commisioned</h4>
                        <p className="text-sm text-zinc-500 mt-1">Governor Wike commissions the new Port Harcourt flyover bridge.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white">Security Update</h4>
                        <p className="text-sm text-zinc-500 mt-1">Joint Task Force operations intensified in North Central region.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-2">
              <h2 className="text-4xl xl:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Stay Ahead of the Curve</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Don't just watch the news—understand the impact. Our platform aggregates real-time data from trusted sources, categorizing it into actionable methods.
              </p>
              <ul className="space-y-4 grid grid-cols-2 mb-10">
                {['Verified Government Data', 'Citizen-Led Reporting', 'Detailed Project Tracking', 'Direct Feedback Loop'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-700 dark:text-green-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/news" className="inline-flex items-center gap-2 text-green-700 dark:text-green-700 font-bold hover:gap-3 transition-all">
                View Latest Developments <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-green-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl xl:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of concerned citizens participating in the democratic process.
            Your voice matters, and together we can build a better Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors">
              Join the Movement
            </Link>
            <Link href="/about" className="bg-transparent border border-zinc-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors">
              Who We Are
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: 'green' | 'blue' | 'orange' | 'purple' }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-700',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500',
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-700 text-center hover:shadow-xl transition-all hover:-translate-y-1">
      <div className={`w-16 h-16 ${colorClasses[color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">{value}</div>
      <div className="text-zinc-500 font-medium">{label}</div>
    </div>
  )
}
