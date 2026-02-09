import React from 'react';

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Analyzing...' }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
                {/* Animated Spinner */}
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-16 h-16 rounded-full border-4 border-gray-700 animate-pulse" />
                    {/* Spinning ring */}
                    <div
                        className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-[#FF9FFC] animate-spin"
                        style={{ animationDuration: '1s' }}
                    />
                    {/* Inner glow */}
                    <div
                        className="absolute inset-2 rounded-full bg-[#FF9FFC]/20 animate-pulse"
                        style={{ animationDuration: '1.5s' }}
                    />
                </div>

                {/* Loading text */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-bold text-white animate-pulse">
                        {message}
                    </p>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-[#FF9FFC] animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
