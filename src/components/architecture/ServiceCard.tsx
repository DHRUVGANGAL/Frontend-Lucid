import { memo } from 'react';
import type { ArchitectureComponent, ApiDefinition } from '../../store/types';

interface ServiceCardProps {
    component: ArchitectureComponent;
    relatedApis: ApiDefinition[];
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ component, relatedApis, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-[#FF9FFC]/50 hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9FFC]/50"
            aria-label={`View details for ${component.name}`}
        >
            <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                    {component.type}
                </span>
                {relatedApis.length > 0 && (
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">
                        {relatedApis.length} APIs
                    </span>
                )}
            </div>

            <h4 className="text-white font-medium mb-2">{component.name}</h4>

            <ul className="space-y-1" aria-label="Responsibilities">
                {component.responsibilities.slice(0, 2).map((resp, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-[#FF9FFC] mt-1 flex-shrink-0">•</span>
                        <span className="line-clamp-1">{resp}</span>
                    </li>
                ))}
                {component.responsibilities.length > 2 && (
                    <li className="text-xs text-gray-500">
                        +{component.responsibilities.length - 2} more
                    </li>
                )}
            </ul>

            <p className="text-xs text-[#FF9FFC] mt-3 flex items-center gap-1">
                Click to view details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </p>
        </button>
    );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
