import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type ErrorFeedbackModalState = {
    isOpen: boolean;
};

const initialState: ErrorFeedbackModalState = {
    isOpen: false,
};

export const errorFeedbackModalSlice = createSlice({
    name: 'errorFeedbackModal',
    initialState,
    reducers: {
        openErrorFeedbackModal: (state) => {
            state.isOpen = true;
        },
        closeErrorFeedbackModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { closeErrorFeedbackModal, openErrorFeedbackModal } = errorFeedbackModalSlice.actions;
export const isErrorFeedbackModalOpenSelector = (state: RootState) =>
    state.errorFeedbackModal.isOpen;
export const errorFeedbackModalReducer = errorFeedbackModalSlice.reducer;
