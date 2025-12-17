
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { getNewsByTitleOrId, getNewsByCategory } from '@/actions/news';
import RelatedNewsCard from '@/components/RelatedNewsCard';
import ShareButton from '@/components/ShareButton';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { id } = await params;
    const decodedName = decodeURIComponent(id);
    const newsItem = await getNewsByTitleOrId(decodedName);

    if (!newsItem) {
        notFound();
    }

    const categoryNews = await getNewsByCategory(newsItem.category, 4);

    const relatedNews = categoryNews.filter((n: any) => n.id !== newsItem.id && n.title !== newsItem.title).slice(0, 3);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/news" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-green-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>
                    <ShareButton title={newsItem.title} />
                </div>
            </div>

            <article className="max-w-4xl xl:max-w-6xl flex flex-col items-center mx-auto px-4 py-10">
                {/* Header Section */}
                <header className="mb-10 max-w-3xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                            {newsItem.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        {newsItem.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 border-y border-zinc-100 dark:border-zinc-800 py-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {newsItem.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {newsItem.readTime || '5 min read'}
                        </div>
                        <div className="font-medium text-green-700 dark:text-green-700">
                            By {newsItem.author || 'Editorial Staff'}
                        </div>
                        <div className="italic">
                            Source: {newsItem.source}
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="prose max-w-3xl prose-zinc dark:prose-invert prose-lg mb-16">
                    <p className="lead text-xl border-l-2 border-green-700 text-zinc-600 dark:text-zinc-300 font-medium">
                        {newsItem.summary}
                    </p>
                    <hr className="my-8 border-zinc-100 dark:border-zinc-800" />

                    {newsItem.content && <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />}
                </div>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="border-t max-w-5xl border-zinc-100 dark:border-zinc-800 pt-16 w-full">
                        <h3 className="text-4xl font-bold mb-8 flex items-center gap-2">
                            <Tag className="w-6 h-6 text-green-700" />
                            Related in {newsItem.category}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedNews.map((related: any) => (
                                <RelatedNewsCard key={related.id} related={related} />
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
