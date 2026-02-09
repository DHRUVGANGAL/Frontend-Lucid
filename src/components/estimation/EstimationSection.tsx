import type { Estimation } from '../../store/decision';

interface EstimationSectionProps {
    estimation: Estimation;
}

const EstimationSection: React.FC<EstimationSectionProps> = ({ estimation }) => {
    // Group tasks by complexity
    const tasksByComplexity = {
        HIGH: estimation.breakdown.filter(t => t.complexity === 'HIGH'),
        MEDIUM: estimation.breakdown.filter(t => t.complexity === 'MEDIUM'),
        LOW: estimation.breakdown.filter(t => t.complexity === 'LOW'),
    };

    const complexityColors = {
        HIGH: 'bg-red-500/20 text-red-400 border-red-500/30',
        MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Estimation
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-2xl font-bold text-white">{estimation.total_hours}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Total Hours</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-2xl font-bold text-[#FF9FFC]">{estimation.timeline_weeks}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Weeks</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-lg font-bold text-emerald-400 truncate" title={estimation.cost_estimate}>
                            {estimation.cost_estimate}
                        </p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Cost Estimate</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-2xl font-bold text-blue-400">{estimation.breakdown.length}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Tasks</p>
                    </div>
                </div>

                {/* Task Breakdown by Complexity */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                        Task Breakdown
                    </h3>
                    <div className="space-y-4">
                        {(['HIGH', 'MEDIUM', 'LOW'] as const).map(complexity => {
                            const tasks = tasksByComplexity[complexity];
                            if (tasks.length === 0) return null;

                            const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);

                            return (
                                <div key={complexity}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded border ${complexityColors[complexity]}`}>
                                            {complexity} ({tasks.length})
                                        </span>
                                        <span className="text-sm text-gray-400">{totalHours} hours</span>
                                    </div>
                                    <div className="space-y-2">
                                        {tasks.map((task, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg"
                                            >
                                                <span className="text-sm text-gray-300 flex-1 pr-4">
                                                    {task.task_name}
                                                </span>
                                                <span className="text-sm text-white font-medium flex-shrink-0">
                                                    {task.hours}h
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Assumptions */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Assumptions ({estimation.assumptions_used.length})
                    </h3>
                    <div className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
                        <ul className="space-y-2">
                            {estimation.assumptions_used.map((assumption, index) => (
                                <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                                    <span className="text-[#FF9FFC] mt-1 flex-shrink-0">•</span>
                                    <span>{assumption}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstimationSection;
