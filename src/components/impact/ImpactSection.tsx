import type { Impact } from '../../store/decision';

interface ImpactSectionProps {
    impact: Impact;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ impact }) => {
    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Impact Analysis
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Affected Components */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Affected Components ({impact.affected_components.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {impact.affected_components.map((component, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm rounded-lg"
                            >
                                {component}
                            </span>
                        ))}
                    </div>
                </div>

                {/* File Changes */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        File Changes ({impact.file_changes.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {impact.file_changes.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                            >
                                <span className={`px-2 py-0.5 text-xs font-bold rounded flex-shrink-0 ${file.change_type === 'CREATE' ? 'bg-emerald-500/20 text-emerald-400' :
                                        file.change_type === 'MODIFY' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {file.change_type}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-white font-mono text-sm truncate" title={file.path}>
                                        {file.path}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                        {file.reason}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Database Migrations */}
                {impact.database_migrations.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                            Database Migrations ({impact.database_migrations.length})
                        </h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {impact.database_migrations.map((migration, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                                >
                                    <code className="text-xs text-purple-300 font-mono break-all">
                                        {migration}
                                    </code>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Risk Assessment */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                        Risk Assessment
                    </h3>
                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                            {impact.risk_assessment}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
