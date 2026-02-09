import { useAppSelector } from '../store';
import {
    selectDecisionResponse,
    selectDecisionLoading,
    selectDecisionError
} from '../store/decision';
import DecisionPage from './DecisionPage';
import Loader from '../components/Loader';

const DecisionPageContainer: React.FC = () => {
    const decision = useAppSelector(selectDecisionResponse);
    const loading = useAppSelector(selectDecisionLoading);
    const error = useAppSelector(selectDecisionError);

    // Loading state
    if (loading) {
        return <Loader message="Loading decision analysis..." />;
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="bg-red-900/30 border border-red-500 rounded-2xl p-8 max-w-md text-center">
                    <svg
                        className="w-16 h-16 text-red-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold text-white mb-2">Error Loading Decision</h2>
                    <p className="text-red-300">{error}</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!decision) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 max-w-md text-center">
                    <svg
                        className="w-16 h-16 text-gray-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold text-white mb-2">No Decision Data</h2>
                    <p className="text-gray-400">Upload a requirements document to get started.</p>
                </div>
            </div>
        );
    }

    // Render the presentational component with decision data
    return <DecisionPage decision={decision} />;
};

export default DecisionPageContainer;
