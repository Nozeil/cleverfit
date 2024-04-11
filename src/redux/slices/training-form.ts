import { type RootState } from '@redux/configure-store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type TrainingFormState = {
    isSubmitDisabled: boolean;
};

const initialState: TrainingFormState = {
    isSubmitDisabled: true,
};

export const trainingFormSlice = createSlice({
    name: 'training-form',
    initialState,
    reducers: {
        setIsTrainingFormSubmitDisabled: (state, action: PayloadAction<boolean>) => {
            state.isSubmitDisabled = action.payload;
        },
    },
});

export const { setIsTrainingFormSubmitDisabled } = trainingFormSlice.actions;
export const selectIsTrainingFormSubmitDisabled = (state: RootState) =>
    state.trainingForm.isSubmitDisabled;
export const trainingFormReducer = trainingFormSlice.reducer;
