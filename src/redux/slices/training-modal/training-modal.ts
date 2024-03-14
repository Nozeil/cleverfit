import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type { AddExercisesAction, AddTrainingTypesAction, Exercises } from './training-modal.types';

type TrainingModalState = {
    isOpen: boolean;
    exercises: Exercises;
    trainingTypes: string[];
};

const initialState: TrainingModalState = {
    isOpen: false,
    exercises: [],
    trainingTypes: [],
};

export const trainingModalSlice = createSlice({
    name: 'trainingModal',
    initialState,
    reducers: {
        openTrainingModal: (state) => {
            state.isOpen = true;
        },
        closeTrainingModal: (state) => {
            state.isOpen = false;
        },
        addExercises: (state, action: AddExercisesAction) => {
            state.exercises = action.payload;
        },
        clearExercises: (state) => {
            state.exercises = [];
        },
        addTrainingTypes: (state, action: AddTrainingTypesAction) => {
            state.trainingTypes = action.payload;
        },
    },
});

export const {
    closeTrainingModal,
    openTrainingModal,
    addExercises,
    clearExercises,
    addTrainingTypes,
} = trainingModalSlice.actions;
export const isTrainingModalOpenSelector = (state: RootState) => state.trainingModal.isOpen;
export const exercisesSelector = (state: RootState) => state.trainingModal.exercises;
export const trainingModalSelector = (state: RootState) => state.trainingModal;
export const trainingModalReducer = trainingModalSlice.reducer;
