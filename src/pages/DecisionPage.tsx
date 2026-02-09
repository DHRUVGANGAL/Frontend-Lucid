import { useCallback, memo } from 'react';
import type { AnalysisResponse } from '../store/types';
import DecisionHero from '../components/decision/DecisionHero';
import RequirementsSection from '../components/requirements/RequirementsSection';
import ArchitectureSection from '../components/architecture/ArchitectureSection';
import DataModelsSection from '../components/data-models/DataModelsSection';
import ImpactAnalysisSection from '../components/impact/ImpactAnalysisSection';
import EstimationDashboard from '../components/estimation/EstimationDashboard';
import ExplanationSection from '../components/explanation/ExplanationSection';
import DecisionActions from '../components/actions/DecisionActions';
import { generateDecisionPDF } from '../utils/generateDecisionPDF';

interface DecisionPageProps {
    decision: AnalysisResponse;
}

const DecisionPage: React.FC<DecisionPageProps> = memo(({ decision }) => {
    const handleApprove = useCallback(() => {
        console.log('Decision approved:', decision.decision_id);
    }, [decision.decision_id]);

    const handleExportReport = useCallback(() => {
        generateDecisionPDF(decision);
    }, [decision]);

    return (
        <div className="min-h-screen bg-black text-white">
            <DecisionHero
                projectId={decision.project_id}
                decisionId={decision.decision_id}
                contextType={decision.context_type}
                riskLevel={decision.risk_level}
                confidenceScore={decision.confidence_score}
                timelineWeeks={decision.estimation.timeline_weeks}
                costEstimate={decision.estimation.cost_estimate}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <ExplanationSection explanation={decision.explanation} />

                <RequirementsSection
                    functionalRequirements={decision.requirements.functional_requirements}
                    nonFunctionalRequirements={decision.requirements.non_functional_requirements}
                    userStories={decision.requirements.user_stories}
                    ambiguities={decision.normalized_data.ambiguities}
                />

                <ArchitectureSection
                    components={decision.architecture.components}
                    apiDefinitions={decision.architecture.api_definitions}
                    dataModels={decision.architecture.data_models}
                    mermaidDiagram={decision.architecture.diagram_mermaid}
                />

                <DataModelsSection dataModels={decision.architecture.data_models} />

                <ImpactAnalysisSection
                    affectedComponents={decision.impact.affected_components}
                    fileChanges={decision.impact.file_changes}
                    databaseMigrations={decision.impact.database_migrations}
                />

                <EstimationDashboard
                    totalHours={decision.estimation.total_hours}
                    timelineWeeks={decision.estimation.timeline_weeks}
                    costEstimate={decision.estimation.cost_estimate}
                    breakdown={decision.estimation.breakdown}
                />
            </main>

            <DecisionActions
                recommendation={decision.explanation.recommendation}
                riskLevel={decision.risk_level}
                onApprove={handleApprove}
                onExportReport={handleExportReport}
            />
        </div>
    );
});

DecisionPage.displayName = 'DecisionPage';

export default DecisionPage;
