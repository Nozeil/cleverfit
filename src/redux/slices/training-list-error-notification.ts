import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type NotificationState = {
    isOpen: boolean;
};

const initialState: NotificationState = {
    isOpen: false,
};

export const TrainingListErrorNotificationSlice = createSlice({
    name: 'trainingListErrorNotification',
    initialState,
    reducers: {
        openTrainingListErrorNotification: (state) => {
            state.isOpen = true;
        },
        closeTrainingListErrorNotification: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openTrainingListErrorNotification, closeTrainingListErrorNotification } =
    TrainingListErrorNotificationSlice.actions;
export const isTrainingListErrorNotificationOpenSelector = (state: RootState) =>
    state.trainingListErrorNotification.isOpen;
export const trainingListErrorNotificationReducer = TrainingListErrorNotificationSlice.reducer;
