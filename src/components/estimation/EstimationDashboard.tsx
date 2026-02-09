import { useState, memo, useMemo } from 'react';
import type { Estimation, EstimationBreakdown } from '../../store/types';

interface EstimationDashboardProps {
    totalHours: number;
    timelineWeeks: number;
    costEstimate: string;
    breakdown: EstimationBreakdown[];
}

type SortBy = 'complexity' | 'hours';

const getComplexityColor = (complexity: 'Low' | 'Medium' | 'High') => {
    switch (complexity) {
        case 'High': return { bg: 'bg-red-500', text: 'text-red-400', badge: 'bg-red-500/20 text-red-400 border-red-500/30' };
        case 'Medium': return { bg: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
        case 'Low': return { bg: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
};

const EstimationDashboard: React.FC<EstimationDashboardProps> = memo(({
    totalHours,
    timelineWeeks,
    costEstimate,
    breakdown,
}) => {
    const [sortBy, setSortBy] = useState<SortBy>('complexity');

    const sortedBreakdown = useMemo(() => {
        return [...breakdown].sort((a, b) => {
            if (sortBy === 'hours') {
                return b.hours - a.hours;
            }
            // Sort by complexity
            const order = { High: 0, Medium: 1, Low: 2 };
            return order[a.complexity] - order[b.complexity];
        });
    }, [breakdown, sortBy]);

    const maxHours = useMemo(() =>
        Math.max(...breakdown.map(b => b.hours), 1),
        [breakdown]
    );

    const complexityStats = useMemo(() => ({
        high: breakdown.filter(b => b.complexity === 'High').length,
        medium: breakdown.filter(b => b.complexity === 'Medium').length,
        low: breakdown.filter(b => b.complexity === 'Low').length,
    }), [breakdown]);

    if (breakdown.length === 0) {
        return (
            <section className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 text-center" aria-labelledby="estimation-title">
                <h2 id="estimation-title" className="sr-only">Estimation</h2>
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No estimation data available.</p>
            </section>
        );
    }

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden" aria-labelledby="estimation-title">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 id="estimation-title" className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Estimation Dashboard
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-3xl font-bold text-white">{totalHours}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Total Hours</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-3xl font-bold text-[#FF9FFC]">{timelineWeeks}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Weeks</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-xl font-bold text-emerald-400 truncate" title={costEstimate}>{costEstimate}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Cost Estimate</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-400">{breakdown.length}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Tasks</p>
                    </div>
                </div>

                {/* Complexity Distribution */}
                <div className="flex flex-wrap gap-4 p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                        <span className="text-sm text-gray-300">High: {complexityStats.high}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" />
                        <span className="text-sm text-gray-300">Medium: {complexityStats.medium}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="text-sm text-gray-300">Low: {complexityStats.low}</span>
                    </div>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Sort by:</span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setSortBy('complexity')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${sortBy === 'complexity'
                                ? 'bg-[#FF9FFC]/20 text-[#FF9FFC]'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            aria-pressed={sortBy === 'complexity'}
                        >
                            Complexity
                        </button>
                        <button
                            onClick={() => setSortBy('hours')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${sortBy === 'hours'
                                ? 'bg-[#FF9FFC]/20 text-[#FF9FFC]'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            aria-pressed={sortBy === 'hours'}
                        >
                            Hours
                        </button>
                    </div>
                </div>

                {/* Task Breakdown with Progress Bars */}
                <div className="space-y-3 max-h-80 overflow-y-auto" role="list" aria-label="Task breakdown">
                    {sortedBreakdown.map((task, index) => {
                        const colors = getComplexityColor(task.complexity);
                        const percentage = (task.hours / maxHours) * 100;

                        return (
                            <div key={index} role="listitem" className="p-3 bg-gray-800/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white font-medium flex-1 pr-4">{task.task_name}</span>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded border ${colors.badge}`}>
                                            {task.complexity}
                                        </span>
                                        <span className="text-sm text-white font-bold min-w-[40px] text-right">
                                            {task.hours}h
                                        </span>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${colors.bg} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                        role="progressbar"
                                        aria-valuenow={task.hours}
                                        aria-valuemax={maxHours}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

EstimationDashboard.displayName = 'EstimationDashboard';

export default EstimationDashboard;
