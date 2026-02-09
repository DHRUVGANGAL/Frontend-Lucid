import { useState, memo, useMemo } from 'react';
import type { Impact, FileChange } from '../../store/types';

interface ImpactAnalysisSectionProps {
    affectedComponents: string[];
    fileChanges: FileChange[];
    databaseMigrations: string[];
}

const getChangeTypeColor = (changeType: 'CREATE' | 'MODIFY' | 'DELETE') => {
    switch (changeType) {
        case 'CREATE': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        case 'MODIFY': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
};

const getChangeTypeIcon = (changeType: 'CREATE' | 'MODIFY' | 'DELETE') => {
    switch (changeType) {
        case 'CREATE':
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            );
        case 'MODIFY':
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            );
        case 'DELETE':
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            );
    }
};

// Group files by directory
const groupFilesByDirectory = (files: FileChange[]) => {
    const groups: Record<string, FileChange[]> = {};

    files.forEach(file => {
        const parts = file.path.split('/');
        const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '/';
        if (!groups[dir]) groups[dir] = [];
        groups[dir].push(file);
    });

    return groups;
};

const ImpactAnalysisSection: React.FC<ImpactAnalysisSectionProps> = memo(({
    affectedComponents,
    fileChanges,
    databaseMigrations,
}) => {
    const [showMigrations, setShowMigrations] = useState(false);

    const groupedFiles = useMemo(() => groupFilesByDirectory(fileChanges), [fileChanges]);

    const changeCounts = useMemo(() => ({
        create: fileChanges.filter(f => f.change_type === 'CREATE').length,
        modify: fileChanges.filter(f => f.change_type === 'MODIFY').length,
        delete: fileChanges.filter(f => f.change_type === 'DELETE').length,
    }), [fileChanges]);

    const isEmpty = affectedComponents.length === 0 && fileChanges.length === 0 && databaseMigrations.length === 0;

    if (isEmpty) {
        return (
            <section className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 text-center" aria-labelledby="impact-title">
                <h2 id="impact-title" className="sr-only">Impact Analysis</h2>
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-gray-500">No impact analysis available.</p>
            </section>
        );
    }

    return (
        <section className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden" aria-labelledby="impact-title">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 id="impact-title" className="text-xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Impact Analysis
                </h2>
            </div>

            <div className="p-6 space-y-6">
                {/* Affected Components Chips */}
                {affectedComponents.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                            Affected Services ({affectedComponents.length})
                        </h3>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Affected services">
                            {affectedComponents.map((component, index) => (
                                <span
                                    key={index}
                                    role="listitem"
                                    className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm rounded-full"
                                >
                                    {component}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Change Summary */}
                {fileChanges.length > 0 && (
                    <div className="flex flex-wrap gap-4 p-4 bg-gray-800/30 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span className="text-sm text-gray-300">Create: {changeCounts.create}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" />
                            <span className="text-sm text-gray-300">Modify: {changeCounts.modify}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                            <span className="text-sm text-gray-300">Delete: {changeCounts.delete}</span>
                        </div>
                    </div>
                )}

                {/* File Tree */}
                {fileChanges.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                            File Changes ({fileChanges.length})
                        </h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {Object.entries(groupedFiles).map(([dir, files]) => (
                                <div key={dir}>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                        </svg>
                                        <span className="font-mono">{dir}/</span>
                                    </div>
                                    <div className="ml-6 space-y-1">
                                        {files.map((file, index) => {
                                            const fileName = file.path.split('/').pop() || file.path;
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg"
                                                >
                                                    <span className={`p-1 rounded ${getChangeTypeColor(file.change_type)}`}>
                                                        {getChangeTypeIcon(file.change_type)}
                                                    </span>
                                                    <code className="text-sm text-white font-mono">{fileName}</code>
                                                    <span className="text-xs text-gray-500 hidden sm:block truncate" title={file.reason}>
                                                        {file.reason}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Database Migrations (Collapsible) */}
                {databaseMigrations.length > 0 && (
                    <div>
                        <button
                            onClick={() => setShowMigrations(!showMigrations)}
                            className="flex items-center justify-between w-full p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl hover:bg-purple-900/30 transition-colors"
                            aria-expanded={showMigrations}
                        >
                            <span className="flex items-center gap-2 text-purple-300 font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                                Database Migrations ({databaseMigrations.length})
                            </span>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform ${showMigrations ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showMigrations && (
                            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                                {databaseMigrations.map((migration, index) => (
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
                        )}
                    </div>
                )}
            </div>
        </section>
    );
});

ImpactAnalysisSection.displayName = 'ImpactAnalysisSection';

export default ImpactAnalysisSection;
