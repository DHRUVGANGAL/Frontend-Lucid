import { useState, memo } from 'react';
import type { DataModel } from '../../store/types';

interface DataModelsSectionProps {
    dataModels: DataModel[];
}

type FieldBadge = 'mandatory' | 'fk' | 'enum' | 'optional';

const getFieldBadges = (field: string): FieldBadge[] => {
    const badges: FieldBadge[] = [];
    const fieldLower = field.toLowerCase();

    if (fieldLower.includes('required') || fieldLower.includes('not null') || fieldLower.includes('*')) {
        badges.push('mandatory');
    }
    if (fieldLower.includes('_id') || fieldLower.includes('fk') || fieldLower.includes('foreign')) {
        badges.push('fk');
    }
    if (fieldLower.includes('enum') || fieldLower.includes('type:')) {
        badges.push('enum');
    }
    if (fieldLower.includes('optional') || fieldLower.includes('?')) {
        badges.push('optional');
    }

    return badges;
};

const getBadgeStyles = (badge: FieldBadge) => {
    switch (badge) {
        case 'mandatory':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'fk':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'enum':
            return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'optional':
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

const DataModelCard: React.FC<{ model: DataModel; expanded: boolean }> = memo(({ model, expanded }) => {
    const displayFields = expanded ? model.fields : model.fields.slice(0, 4);

    return (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-200">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                {model.name}
                <span className="text-xs text-gray-500">({model.fields.length} fields)</span>
            </h4>

            <ul className="space-y-2" role="list" aria-label={`Fields for ${model.name}`}>
                {displayFields.map((field, index) => {
                    const badges = getFieldBadges(field);
                    const fieldName = field.split(':')[0].trim();

                    return (
                        <li key={index} className="flex items-center gap-2 flex-wrap">
                            <code className="text-xs text-gray-300 font-mono">{fieldName}</code>
                            {badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded border ${getBadgeStyles(badge)}`}
                                >
                                    {badge.toUpperCase()}
                                </span>
                            ))}
                        </li>
                    );
                })}
            </ul>

            {!expanded && model.fields.length > 4 && (
                <p className="text-xs text-gray-500 mt-2">+{model.fields.length - 4} more fields</p>
            )}
        </div>
    );
});

DataModelCard.displayName = 'DataModelCard';

const DataModelsSection: React.FC<DataModelsSectionProps> = memo(({ dataModels }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (dataModels.length === 0) {
        return (
            <section className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 text-center" aria-labelledby="data-models-title">
                <h2 id="data-models-title" className="sr-only">Data Models</h2>
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <p className="text-gray-500">No data models defined.</p>
            </section>
        );
    }

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden" aria-labelledby="data-models-title">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h2 id="data-models-title" className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                    Data Models
                    <span className="px-2 py-0.5 bg-[#FF9FFC]/20 text-[#FF9FFC] text-sm rounded-full">
                        {dataModels.length}
                    </span>
                </h2>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
                    aria-pressed={isExpanded}
                >
                    {isExpanded ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            Compact
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Expanded
                        </>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataModels.map((model, index) => (
                        <DataModelCard key={index} model={model} expanded={isExpanded} />
                    ))}
                </div>
            </div>
        </section>
    );
});

DataModelsSection.displayName = 'DataModelsSection';

export default DataModelsSection;
