interface RequirementItemProps {
    id?: string;
    description: string;
    priority?: 'High' | 'Medium' | 'Low';
    category?: string;
    type: 'functional' | 'non-functional' | 'user-story' | 'ambiguity';
}

const getPriorityStyles = (priority?: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
        case 'High':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'Medium':
            return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        case 'Low':
            return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

const getTypeIcon = (type: RequirementItemProps['type']) => {
    switch (type) {
        case 'functional':
            return (
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        case 'non-functional':
            return (
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        case 'user-story':
            return (
                <svg className="w-5 h-5 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            );
        case 'ambiguity':
            return (
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
    }
};

const RequirementItem: React.FC<RequirementItemProps> = ({
    id,
    description,
    priority,
    category,
    type,
}) => {
    const isAmbiguity = type === 'ambiguity';

    return (
        <div
            className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${isAmbiguity
                    ? 'bg-amber-900/20 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(type)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {id && (
                            <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs font-mono rounded">
                                {id}
                            </span>
                        )}
                        {priority && (
                            <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getPriorityStyles(priority)}`}>
                                {priority}
                            </span>
                        )}
                        {category && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded border border-purple-500/30">
                                {category}
                            </span>
                        )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isAmbiguity ? 'text-amber-200' : 'text-gray-300'}`}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RequirementItem;
