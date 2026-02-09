import type { Explanation } from '../../store/decision';

interface ExplanationSectionProps {
    explanation: Explanation;
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({ explanation }) => {
    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Executive Summary
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Overview */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        {explanation.overview}
                    </p>
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-[#FF9FFC]/10 border border-[#FF9FFC]/30 rounded-xl">
                    <h3 className="text-sm font-medium text-[#FF9FFC] uppercase tracking-wide mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Recommendation
                    </h3>
                    <p className="text-white leading-relaxed font-medium">
                        {explanation.recommendation}
                    </p>
                </div>

                {/* Key Risks */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Key Risks ({explanation.key_risks.length})
                    </h3>
                    <div className="space-y-2">
                        {explanation.key_risks.map((risk, index) => (
                            <div
                                key={index}
                                className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg flex items-start gap-3"
                            >
                                <span className="text-red-400 font-bold text-sm flex-shrink-0">
                                    {index + 1}.
                                </span>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {risk}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Summary */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Technical Summary
                    </h3>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {explanation.technical_summary}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExplanationSection;
