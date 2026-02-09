import { useState, useCallback, useMemo, useEffect, useRef, memo } from 'react';
import type { ArchitectureComponent, ApiDefinition, DataModel } from '../../store/types';
import ServiceCard from './ServiceCard';
import ServiceDrawer from './ServiceDrawer';

interface ArchitectureSectionProps {
    components: ArchitectureComponent[];
    apiDefinitions: ApiDefinition[];
    dataModels: DataModel[];
    mermaidDiagram: string;
}

const MermaidDiagram: React.FC<{ diagram: string }> = memo(({ diagram }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        const renderDiagram = async () => {
            if (!diagram) return;

            try {
                setError(null);
                setIsLoaded(false);

                const mermaid = (await import('mermaid')).default;

                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    themeVariables: {
                        primaryColor: '#FF9FFC',
                        primaryTextColor: '#fff',
                        primaryBorderColor: '#FF9FFC',
                        lineColor: '#6b7280',
                        secondaryColor: '#374151',
                        tertiaryColor: '#1f2937',
                    },
                    flowchart: {
                        htmlLabels: true,
                        curve: 'basis',
                    },
                    securityLevel: 'loose',
                });

                // Use a unique ID for each render to avoid conflicts
                const uniqueId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                const { svg } = await mermaid.render(uniqueId, diagram);

                if (isMounted) {
                    setSvgContent(svg);
                    setIsLoaded(true);
                }
            } catch (err) {
                console.error('Mermaid render error:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to render diagram');
                }
            }
        };

        renderDiagram();

        return () => {
            isMounted = false;
        };
    }, [diagram]);

    if (error) {
        return (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm">Failed to render diagram: {error}</p>
                <pre className="mt-2 text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap">{diagram}</pre>
            </div>
        );
    }

    if (!diagram) {
        return (
            <div className="p-8 text-center text-gray-500">
                No architecture diagram available.
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`bg-gray-800/50 rounded-xl p-4 overflow-x-auto transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-50'}`}
            role="img"
            aria-label="Architecture diagram"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
});

MermaidDiagram.displayName = 'MermaidDiagram';

const ArchitectureSection: React.FC<ArchitectureSectionProps> = memo(({
    components,
    apiDefinitions,
    dataModels,
    mermaidDiagram,
}) => {
    const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(null);
    const [activeTab, setActiveTab] = useState<'diagram' | 'services' | 'apis' | 'models'>('diagram');

    const handleOpenDrawer = useCallback((component: ArchitectureComponent) => {
        setSelectedComponent(component);
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setSelectedComponent(null);
    }, []);

    // Get related APIs for a component (simple name matching)
    const getRelatedApis = useCallback((componentName: string): ApiDefinition[] => {
        const nameLower = componentName.toLowerCase();
        return apiDefinitions.filter(api =>
            api.path.toLowerCase().includes(nameLower) ||
            api.description.toLowerCase().includes(nameLower)
        );
    }, [apiDefinitions]);

    const relatedApis = useMemo(() =>
        selectedComponent ? getRelatedApis(selectedComponent.name) : [],
        [selectedComponent, getRelatedApis]
    );

    const tabs = [
        { id: 'diagram' as const, label: 'Diagram', count: null },
        { id: 'services' as const, label: 'Services', count: components.length },
        { id: 'apis' as const, label: 'APIs', count: apiDefinitions.length },
        { id: 'models' as const, label: 'Data Models', count: dataModels.length },
    ];

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden" aria-labelledby="architecture-title">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 id="architecture-title" className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Architecture
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-800 bg-gray-900/30" role="tablist">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`${tab.id}-panel`}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${activeTab === tab.id
                            ? 'text-[#FF9FFC] border-[#FF9FFC] bg-[#FF9FFC]/5'
                            : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        {tab.label}
                        {tab.count !== null && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id
                                ? 'bg-[#FF9FFC]/20 text-[#FF9FFC]'
                                : 'bg-gray-700 text-gray-400'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Panels */}
            <div className="p-6">
                {/* Diagram Panel */}
                <div
                    id="diagram-panel"
                    role="tabpanel"
                    hidden={activeTab !== 'diagram'}
                    aria-labelledby="diagram-tab"
                >
                    {activeTab === 'diagram' && <MermaidDiagram diagram={mermaidDiagram} />}
                </div>

                {/* Services Panel */}
                <div
                    id="services-panel"
                    role="tabpanel"
                    hidden={activeTab !== 'services'}
                    aria-labelledby="services-tab"
                >
                    {activeTab === 'services' && (
                        components.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">No services defined.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {components.map((component, index) => (
                                    <ServiceCard
                                        key={index}
                                        component={component}
                                        relatedApis={getRelatedApis(component.name)}
                                        onClick={() => handleOpenDrawer(component)}
                                    />
                                ))}
                            </div>
                        )
                    )}
                </div>

                {/* APIs Panel */}
                <div
                    id="apis-panel"
                    role="tabpanel"
                    hidden={activeTab !== 'apis'}
                    aria-labelledby="apis-tab"
                >
                    {activeTab === 'apis' && (
                        apiDefinitions.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">No API endpoints defined.</p>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {apiDefinitions.map((api, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                                            api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                                                api.method === 'PUT' ? 'bg-amber-500/20 text-amber-400' :
                                                    api.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {api.method}
                                        </span>
                                        <code className="text-white font-mono text-sm flex-shrink-0">{api.path}</code>
                                        <span className="text-gray-500 text-xs truncate hidden sm:block">{api.description}</span>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>

                {/* Data Models Panel */}
                <div
                    id="models-panel"
                    role="tabpanel"
                    hidden={activeTab !== 'models'}
                    aria-labelledby="models-tab"
                >
                    {activeTab === 'models' && (
                        dataModels.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">No data models defined.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dataModels.map((model, index) => (
                                    <div key={index} className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                                        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                            </svg>
                                            {model.name}
                                        </h4>
                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                            {model.fields.map((field, i) => (
                                                <li key={i} className="text-xs text-gray-400 font-mono">{field}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Service Drawer */}
            <ServiceDrawer
                isOpen={selectedComponent !== null}
                onClose={handleCloseDrawer}
                component={selectedComponent}
                relatedApis={relatedApis}
            />
        </section>
    );
});

ArchitectureSection.displayName = 'ArchitectureSection';

export default ArchitectureSection;
