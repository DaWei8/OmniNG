import ProposalForm from "../ProposalForm";

export default function CreateProposalPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">New Proposal</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Submit a proposal on behalf of the administration.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <ProposalForm />
            </div>
        </div>
    );
}
