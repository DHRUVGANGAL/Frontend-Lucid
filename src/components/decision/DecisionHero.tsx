interface DecisionHeroProps {
    projectId: string;
    decisionId: string;
    contextType: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    confidenceScore: number;
    timelineWeeks: number;
    costEstimate: string;
}

const getRiskLevelStyles = (riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (riskLevel) {
        case 'LOW':
            return {
                bg: 'bg-emerald-500/20',
                border: 'border-emerald-500',
                text: 'text-emerald-400',
                dot: 'bg-emerald-500',
            };
        case 'MEDIUM':
            return {
                bg: 'bg-amber-500/20',
                border: 'border-amber-500',
                text: 'text-amber-400',
                dot: 'bg-amber-500',
            };
        case 'HIGH':
            return {
                bg: 'bg-red-500/20',
                border: 'border-red-500',
                text: 'text-red-400',
                dot: 'bg-red-500',
            };
    }
};

const DecisionHero: React.FC<DecisionHeroProps> = ({
    projectId,
    decisionId,
    contextType,
    riskLevel,
    confidenceScore,
    timelineWeeks,
    costEstimate,
}) => {
    const riskStyles = getRiskLevelStyles(riskLevel);
    const confidencePercent = Math.round(confidenceScore * 100);

    return (
        <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Top row: Project info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#FF9FFC]/20 border border-[#FF9FFC] text-[#FF9FFC] text-xs font-medium rounded-full uppercase tracking-wide">
                        {contextType.replace('_', ' ')}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-sm font-mono">
                        Project: {projectId.slice(0, 8)}...
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                    Decision Analysis
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {/* Risk Level */}
                    <div className={`p-4 sm:p-6 rounded-xl ${riskStyles.bg} border ${riskStyles.border}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${riskStyles.dot} animate-pulse`} />
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Risk Level</span>
                        </div>
                        <p className={`text-xl sm:text-2xl font-bold ${riskStyles.text}`}>
                            {riskLevel}
                        </p>
                    </div>

                    {/* Confidence Score */}
                    <div className="p-4 sm:p-6 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Confidence</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-blue-400">
                            {confidencePercent}%
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="p-4 sm:p-6 rounded-xl bg-purple-500/10 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Timeline</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-purple-400">
                            {timelineWeeks} weeks
                        </p>
                    </div>

                    {/* Cost Estimate */}
                    <div className="p-4 sm:p-6 rounded-xl bg-[#FF9FFC]/10 border border-[#FF9FFC]/30">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Cost</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-[#FF9FFC] truncate" title={costEstimate}>
                            {costEstimate}
                        </p>
                    </div>
                </div>

                {/* Decision ID footer */}
                <p className="mt-6 text-xs text-gray-500">
                    Decision ID: <span className="font-mono">{decisionId}</span>
                </p>
            </div>
        </header>
    );
};

export default DecisionHero;
