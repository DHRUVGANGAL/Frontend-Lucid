import { memo, useEffect, useRef } from 'react';
import type { ArchitectureComponent, ApiDefinition } from '../../store/types';

interface ServiceDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    component: ArchitectureComponent | null;
    relatedApis: ApiDefinition[];
}

const getMethodColor = (method: string) => {
    switch (method) {
        case 'GET': return 'bg-emerald-500/20 text-emerald-400';
        case 'POST': return 'bg-blue-500/20 text-blue-400';
        case 'PUT': return 'bg-amber-500/20 text-amber-400';
        case 'DELETE': return 'bg-red-500/20 text-red-400';
        case 'PATCH': return 'bg-purple-500/20 text-purple-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
};

const ServiceDrawer: React.FC<ServiceDrawerProps> = memo(({ isOpen, onClose, component, relatedApis }) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
        if (isOpen && drawerRef.current) {
            drawerRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen || !component) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
                tabIndex={-1}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700 z-50 overflow-y-auto focus:outline-none animate-slide-in-right"
            >
                {/* Header */}
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                                {component.type}
                            </span>
                            <h2 id="drawer-title" className="text-xl font-bold text-white mt-2">
                                {component.name}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                            aria-label="Close drawer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Responsibilities */}
                    <section>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                            Responsibilities ({component.responsibilities.length})
                        </h3>
                        <ul className="space-y-2" role="list">
                            {component.responsibilities.map((resp, index) => (
                                <li
                                    key={index}
                                    className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300"
                                >
                                    {resp}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Related APIs */}
                    <section>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                            Related APIs ({relatedApis.length})
                        </h3>
                        {relatedApis.length === 0 ? (
                            <p className="text-gray-500 text-sm">No APIs associated with this service.</p>
                        ) : (
                            <ul className="space-y-2" role="list">
                                {relatedApis.map((api, index) => (
                                    <li
                                        key={index}
                                        className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 text-xs font-bold rounded ${getMethodColor(api.method)}`}>
                                                {api.method}
                                            </span>
                                            <code className="text-sm text-white font-mono">{api.path}</code>
                                        </div>
                                        <p className="text-xs text-gray-400">{api.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
});

ServiceDrawer.displayName = 'ServiceDrawer';

export default ServiceDrawer;
