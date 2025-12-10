import SolutionForm from "../SolutionForm";

export default function CreateSolutionPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">New Solution</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Propose a new solution to a community problem.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <SolutionForm />
            </div>
        </div>
    );
}
