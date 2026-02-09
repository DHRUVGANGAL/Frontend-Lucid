import type { RootState } from '../index';
import type { AnalysisResponse } from '../types';

// Select just the decision response data
export const selectDecisionResponse = (state: RootState): AnalysisResponse | null =>
    state.decision.data;

// Select loading state
export const selectDecisionLoading = (state: RootState): boolean =>
    state.decision.loading;

// Select error state
export const selectDecisionError = (state: RootState): string | null =>
    state.decision.error;

// Derived selectors for specific sections
export const selectRequirements = (state: RootState) =>
    state.decision.data?.requirements ?? null;

export const selectArchitecture = (state: RootState) =>
    state.decision.data?.architecture ?? null;

export const selectEstimation = (state: RootState) =>
    state.decision.data?.estimation ?? null;

export const selectImpact = (state: RootState) =>
    state.decision.data?.impact ?? null;

export const selectRiskLevel = (state: RootState) =>
    state.decision.data?.risk_level ?? null;

export const selectConfidenceScore = (state: RootState) =>
    state.decision.data?.confidence_score ?? null;
