import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GridScan } from './GridScan';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { startAnalysis } from '../store/slices/analysisSlice';
import { selectDecisionLoading, selectDecisionError, selectDecisionResponse } from '../store/decision';
import Loader from './Loader';

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    file: File;
}

interface ProjectDetails {
    projectId: string;
    projectName: string;
}

const AIAgentComponent: React.FC = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
        projectId: '',
        projectName: ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDecisionLoading);
    const error = useAppSelector(selectDecisionError);
    const data = useAppSelector(selectDecisionResponse);

    // Navigate to decision page on successful data
    useEffect(() => {
        if (data && !loading) {
            navigate('/decision');
        }
    }, [data, loading, navigate]);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            addFiles(selectedFiles);
        }
    };

    const addFiles = (newFiles: File[]) => {
        const validFiles = newFiles.filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ['pdf', 'docx', 'txt', 'doc'].includes(ext || '');
        });

        if (validFiles.length === 0) return;

        const file = validFiles[0];
        const uploadedFile: UploadedFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        };

        setFiles([uploadedFile]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleStartAnalysis = () => {
        setShowModal(true);
    };

    const handleConfirmAnalysis = () => {
        const file = files[0]?.file;
        if (!file) return;

        dispatch(startAnalysis({
            file: file,
            project_id: projectDetails.projectId || undefined,
            project_name: projectDetails.projectName || undefined
        }));

        setShowModal(false);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6">
            <div className="absolute inset-0 z-0">
                <GridScan
                    linesColor="#392e4e"
                    scanColor="#FF9FFC"
                    scanOpacity={0.4}
                    gridScale={0.1}
                    lineStyle="solid"
                    lineJitter={0.1}
                    scanDirection="pingpong"
                    scanGlow={0.5}
                />
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        AI Analysis Agent
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Upload your requirements document for automated analysis
                    </p>
                </div>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        relative cursor-pointer rounded-2xl border-2 border-dashed p-12
                        transition-all duration-300 ease-out
                        ${isDragging
                            ? 'border-[#FF9FFC] bg-[#FF9FFC]/10 scale-[1.02]'
                            : 'border-gray-600 hover:border-[#FF9FFC]/50 hover:bg-gray-900/50'
                        }
                    `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.txt,.doc"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FF9FFC]/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="text-white text-lg font-medium mb-2">
                            {isDragging ? 'Drop your file here' : 'Drag and drop your file'}
                        </p>
                        <p className="text-gray-500 text-sm">
                            or click to browse • PDF, DOCX, TXT, DOC
                        </p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-6 space-y-3">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-900/80 border border-gray-700 rounded-xl"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-lg bg-[#FF9FFC]/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-medium truncate">{file.name}</p>
                                        <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleStartAnalysis}
                        disabled={files.length === 0 || loading}
                        className={`
                            px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-300
                            ${files.length > 0 && !loading
                                ? 'bg-[#FF9FFC] text-black hover:scale-105 shadow-lg shadow-[#FF9FFC]/25'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        {loading ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-gray-500 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md mx-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
                        <p className="text-gray-400 text-sm mb-6">Optional - provide context for better analysis</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Project ID</label>
                                <input
                                    type="text"
                                    value={projectDetails.projectId}
                                    onChange={(e) => setProjectDetails(prev => ({ ...prev, projectId: e.target.value }))}
                                    placeholder="e.g., PRJ-001"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FF9FFC] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Project Name</label>
                                <input
                                    type="text"
                                    value={projectDetails.projectName}
                                    onChange={(e) => setProjectDetails(prev => ({ ...prev, projectName: e.target.value }))}
                                    placeholder="e.g., HealthConnect"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FF9FFC] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:border-white hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAnalysis}
                                className="flex-1 px-6 py-3 bg-[#FF9FFC] text-black font-bold rounded-xl hover:scale-105 transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && <Loader message="Analyzing your document..." />}

            {error && (
                <div className="fixed bottom-6 right-6 z-50 bg-red-900/90 border border-red-500 rounded-xl p-4 max-w-sm shadow-lg">
                    <p className="text-red-200 text-sm font-medium">Analysis Error</p>
                    <p className="text-red-300 text-xs mt-1">{error}</p>
                </div>
            )}
        </div>
    );
};

export default AIAgentComponent;
