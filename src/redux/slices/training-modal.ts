import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type TrainingModalState = {
    isOpen: boolean;
};

const initialState: TrainingModalState = {
    isOpen: false,
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
    },
});

export const { closeTrainingModal, openTrainingModal } =
    trainingModalSlice.actions;
export const isTrainingModalOpenSelector = (state: RootState) =>
    state.trainingModal.isOpen;
export const trainingModalReducer = trainingModalSlice.reducer;
