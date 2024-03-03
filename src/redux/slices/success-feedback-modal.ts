import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type SuccessFeedbackModalState = {
    isOpen: boolean;
};

const initialState: SuccessFeedbackModalState = {
    isOpen: false,
};

export const successFeedbackModalSlice = createSlice({
    name: 'successFeedbackModal',
    initialState,
    reducers: {
        openSuccessFeedbackModal: (state) => {
            state.isOpen = true;
        },
        closeSuccessFeedbackModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { closeSuccessFeedbackModal, openSuccessFeedbackModal } = successFeedbackModalSlice.actions;
export const isSuccessFeedbackModalOpenSelector = (state: RootState) => state.successFeedbackModal.isOpen;
export const successFeedbackModalReducer = successFeedbackModalSlice.reducer;