import NewsForm from "../NewsForm";

export default function CreateNewsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Create News Article</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Draft and publish a new official update.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <NewsForm />
            </div>
        </div>
    );
}
