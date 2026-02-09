import { memo } from 'react';

interface DecisionActionsProps {
    recommendation: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    onApprove: () => void;
    onExportReport: () => void;
}

const getRiskColor = (riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (riskLevel) {
        case 'LOW': return 'text-emerald-400';
        case 'MEDIUM': return 'text-amber-400';
        case 'HIGH': return 'text-red-400';
    }
};

const DecisionActions: React.FC<DecisionActionsProps> = memo(({
    recommendation,
    riskLevel,
    onApprove,
    onExportReport,
}) => {
    return (
        <footer className="border-t border-gray-800 bg-gradient-to-b from-gray-900/80 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Recommendation Banner */}
                <div className="p-4 bg-[#FF9FFC]/10 border border-[#FF9FFC]/30 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-[#FF9FFC] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <div>
                            <p className="text-sm text-[#FF9FFC] font-medium uppercase tracking-wide mb-1">
                                Recommendation
                            </p>
                            <p className="text-white font-medium">{recommendation}</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Risk Level: <span className={`font-bold ${getRiskColor(riskLevel)}`}>{riskLevel}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                    <button
                        onClick={onExportReport}
                        className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        aria-label="Export report as PDF"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Report
                    </button>

                    <button
                        onClick={onApprove}
                        className="px-6 py-3 bg-[#FF9FFC] text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF9FFC]/25 flex items-center justify-center gap-2"
                        aria-label="Approve this decision"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve Decision
                    </button>
                </div>
            </div>
        </footer>
    );
});

DecisionActions.displayName = 'DecisionActions';

export default DecisionActions;
