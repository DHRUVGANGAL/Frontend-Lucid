import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { GridScan } from './GridScan';
import { X } from 'lucide-react';

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
        console.log('Starting analysis with:', {
            files: files,
            projectDetails: projectDetails
        });
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
                    scanSoftness={2}
                    scanDuration={2.0}
                    scanDelay={2.0}
                    noiseIntensity={0.01}
                    enablePost={true}
                    bloomIntensity={0.5}
                    chromaticAberration={0.002}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-2 sm:px-6 w-full max-w-4xl">
                <div
                    className={`bg-gray-900/80 border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-12 mb-6 sm:mb-8 transition-all duration-300 cursor-pointer ${isDragging ? 'border-white bg-gray-800/80 scale-105' : 'border-[#FF9FFC] hover:border-white'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.txt,.doc"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF9FFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-bold text-white">Upload Requirements</h3>
                        <p className="text-gray-400 text-sm sm:text-base">Drag and drop your files here, or click to browse</p>
                        <p className="text-xs sm:text-sm text-gray-500">Supports PDF, DOCX, TXT files</p>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="bg-gray-900/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left">
                        <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Uploaded File</h4>
                        <div className="space-y-3">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 gap-2">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9FFC] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div className="min-w-0">
                                            <p className="text-white font-medium text-sm sm:text-base truncate">{file.name}</p>
                                            <p className="text-gray-500 text-xs sm:text-sm">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                    <button
                        onClick={handleStartAnalysis}
                        disabled={files.length === 0}
                        className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 ${files.length > 0
                            ? 'bg-[#FF9FFC] text-black hover:scale-105'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Start Analysis
                    </button>
                    <Link
                        to="/"
                        className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 border border-[#FF9FFC] rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">Project Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                            Optional: Add project details if change requirements
                        </p>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                                    Project ID (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={projectDetails.projectId}
                                    onChange={(e) => setProjectDetails(prev => ({ ...prev, projectId: e.target.value }))}
                                    placeholder="e.g., PRJ-001"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:border-[#FF9FFC] focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                                    Project Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={projectDetails.projectName}
                                    onChange={(e) => setProjectDetails(prev => ({ ...prev, projectName: e.target.value }))}
                                    placeholder="e.g., Lucid"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:border-[#FF9FFC] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                            <button
                                onClick={handleConfirmAnalysis}
                                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FF9FFC] text-black text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:scale-105 transition-all duration-300"
                            >
                                Confirm & Analyze
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-600 text-gray-300 text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:border-white hover:text-white transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAgentComponent;
