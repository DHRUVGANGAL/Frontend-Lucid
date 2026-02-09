import { useState } from 'react';
import type { FunctionalRequirement, NonFunctionalRequirement } from '../../store/decision';
import RequirementItem from './RequirementItem';

interface RequirementsSectionProps {
    functionalRequirements: FunctionalRequirement[];
    nonFunctionalRequirements: NonFunctionalRequirement[];
    userStories: string[];
    ambiguities: string[];
}

type TabType = 'functional' | 'non-functional' | 'user-stories' | 'ambiguities';

const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'functional', label: 'Functional' },
    { id: 'non-functional', label: 'Non-Functional' },
    { id: 'user-stories', label: 'User Stories' },
    { id: 'ambiguities', label: 'Ambiguities' },
];

const groupByPriority = (requirements: FunctionalRequirement[]) => {
    const groups: Record<string, FunctionalRequirement[]> = {
        High: [],
        Medium: [],
        Low: [],
    };

    requirements.forEach(req => {
        if (groups[req.priority]) {
            groups[req.priority].push(req);
        }
    });

    return groups;
};

const RequirementsSection: React.FC<RequirementsSectionProps> = ({
    functionalRequirements,
    nonFunctionalRequirements,
    userStories,
    ambiguities,
}) => {
    const [activeTab, setActiveTab] = useState<TabType>('functional');

    const tabCounts = {
        functional: functionalRequirements.length,
        'non-functional': nonFunctionalRequirements.length,
        'user-stories': userStories.length,
        ambiguities: ambiguities.length,
    };

    const groupedFunctional = groupByPriority(functionalRequirements);

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Requirements
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-800 bg-gray-900/30">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${activeTab === tab.id
                                ? 'text-[#FF9FFC] border-[#FF9FFC] bg-[#FF9FFC]/5'
                                : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        {tab.label}
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id
                                ? 'bg-[#FF9FFC]/20 text-[#FF9FFC]'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                            {tabCounts[tab.id]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Functional Requirements - Grouped by Priority */}
                {activeTab === 'functional' && (
                    <div className="space-y-6">
                        {(['High', 'Medium', 'Low'] as const).map(priority => {
                            const reqs = groupedFunctional[priority];
                            if (reqs.length === 0) return null;

                            return (
                                <div key={priority}>
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${priority === 'High' ? 'bg-red-500' :
                                                priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                            }`} />
                                        {priority} Priority ({reqs.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {reqs.map(req => (
                                            <RequirementItem
                                                key={req.id}
                                                id={req.id}
                                                description={req.description}
                                                priority={req.priority}
                                                type="functional"
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Non-Functional Requirements */}
                {activeTab === 'non-functional' && (
                    <div className="space-y-3">
                        {nonFunctionalRequirements.map((req, index) => (
                            <RequirementItem
                                key={index}
                                description={req.description}
                                category={req.category}
                                type="non-functional"
                            />
                        ))}
                    </div>
                )}

                {/* User Stories */}
                {activeTab === 'user-stories' && (
                    <div className="space-y-3">
                        {userStories.map((story, index) => (
                            <RequirementItem
                                key={index}
                                description={story}
                                type="user-story"
                            />
                        ))}
                    </div>
                )}

                {/* Ambiguities */}
                {activeTab === 'ambiguities' && (
                    <div className="space-y-3">
                        {ambiguities.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No ambiguities identified.
                            </div>
                        ) : (
                            <>
                                <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl mb-4">
                                    <p className="text-amber-200 text-sm flex items-center gap-2">
                                        <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        These items require clarification before implementation.
                                    </p>
                                </div>
                                {ambiguities.map((ambiguity, index) => (
                                    <RequirementItem
                                        key={index}
                                        description={ambiguity}
                                        type="ambiguity"
                                    />
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RequirementsSection;
