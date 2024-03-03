import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type FeedbackModalState = {
    isOpen: boolean;
};

const initialState: FeedbackModalState = {
    isOpen: false,
};

export const feedbackModalSlice = createSlice({
    name: 'feedbackModal',
    initialState,
    reducers: {
        openFeedbackModal: (state) => {
            state.isOpen = true;
        },
        closeFeedbackModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { closeFeedbackModal, openFeedbackModal } = feedbackModalSlice.actions;
export const isFeedbackModalOpenSelector = (state: RootState) => state.feedbackModal.isOpen;
export const feedbackModalReducer = feedbackModalSlice.reducer;
