// TypeScript types for Redux store

export interface UploadedFileData {
    name: string;
    size: number;
    type: string;
}

export interface AnalysisRequest {
    file: File;  // Actual file for upload
    project_id?: string;
    project_name?: string;
}

// Normalized data from analysis
export interface NormalizedData {
    business_intent: string;
    explicit_requirements: string[];
    assumptions: string[];
    constraints: string[];
    ambiguities: string[];
}

// Rule results
export interface RuleResults {
    triggered_rules: string[];
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    effort_multiplier: number;
    flags: string[];
}

// Functional requirement
export interface FunctionalRequirement {
    id: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
}

// Non-functional requirement
export interface NonFunctionalRequirement {
    category: string;
    description: string;
}

// Requirements section
export interface Requirements {
    functional_requirements: FunctionalRequirement[];
    non_functional_requirements: NonFunctionalRequirement[];
    user_stories: string[];
}

// Architecture component
export interface ArchitectureComponent {
    name: string;
    type: string;
    responsibilities: string[];
}

// Data model
export interface DataModel {
    name: string;
    fields: string[];
}

// API definition
export interface ApiDefinition {
    method: string;
    path: string;
    description: string;
}

// Architecture section
export interface Architecture {
    components: ArchitectureComponent[];
    data_models: DataModel[];
    api_definitions: ApiDefinition[];
    diagram_mermaid: string;
}

// File change
export interface FileChange {
    path: string;
    change_type: 'CREATE' | 'MODIFY' | 'DELETE';
    reason: string;
}

// Impact section
export interface Impact {
    affected_components: string[];
    file_changes: FileChange[];
    database_migrations: string[];
    risk_assessment: string;
}

// Estimation breakdown
export interface EstimationBreakdown {
    task_name: string;
    hours: number;
    complexity: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Estimation section
export interface Estimation {
    total_hours: number;
    breakdown: EstimationBreakdown[];
    cost_estimate: string;
    timeline_weeks: number;
    assumptions_used: string[];
}

// Explanation section
export interface Explanation {
    overview: string;
    key_risks: string[];
    recommendation: string;
    technical_summary: string;
}

// Complete Analysis Response from API
export interface AnalysisResponse {
    project_id: string;
    decision_id: string;
    context_type: string;
    confidence_score: number;
    normalized_data: NormalizedData;
    rule_results: RuleResults;
    requirements: Requirements;
    architecture: Architecture;
    impact: Impact;
    estimation: Estimation;
    explanation: Explanation;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface AnalysisState {
    data: AnalysisResponse | null;
    loading: boolean;
    error: string | null;
}
