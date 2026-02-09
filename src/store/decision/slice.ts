import { createSlice } from '@reduxjs/toolkit';
import { startAnalysis } from '../slices/analysisSlice';
import type { AnalysisResponse, AnalysisState } from '../types';

// DecisionState is the same as AnalysisState - using AnalysisResponse as the data type
type DecisionState = AnalysisState;

const initialState: DecisionState = {
    data: null,
    loading: false,
    error: null,
};

const decisionSlice = createSlice({
    name: 'decision',
    initialState,
    reducers: {
        clearDecision: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startAnalysis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startAnalysis.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as AnalysisResponse;
                state.error = null;
            })
            .addCase(startAnalysis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An unexpected error occurred';
            });
    },
});

export const { clearDecision } = decisionSlice.actions;
export default decisionSlice.reducer;
