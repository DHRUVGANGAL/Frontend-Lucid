import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AnalysisRequest, AnalysisResponse } from '../types';
import { mockAnalysisResponse } from './mockAnalysisResponse';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const startAnalysis = createAsyncThunk<
    AnalysisResponse,
    AnalysisRequest,
    { rejectValue: string }
>(
    'analysis/startAnalysis',
    async (request, { rejectWithValue }) => {
        try {
            const API_URL = `${API_BASE_URL}/api/analysis`;

            const formData = new FormData();
            formData.append('file', request.file);

            if (request.project_id) {
                formData.append('project_id', request.project_id);
            }
            if (request.project_name) {
                formData.append('project_name', request.project_name);
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }

            const data: AnalysisResponse = await response.json();
            return data;

            // Using mock response to avoid expensive API calls during development
            // console.log('Using mock analysis response. Request received:', {
            //     project_id: request.project_id,
            //     project_name: request.project_name,
            //     file: request.file.name,
            // });

            // // Simulate network delay
            // await new Promise(resolve => setTimeout(resolve, 1500));

            return mockAnalysisResponse;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            return rejectWithValue(message);
        }
    }
);
