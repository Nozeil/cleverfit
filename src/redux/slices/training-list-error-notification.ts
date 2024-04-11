import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type NotificationState = {
    isOpen: boolean;
};

const initialState: NotificationState = {
    isOpen: false,
};

export const ErrorNotificationSlice = createSlice({
    name: 'ErrorNotification',
    initialState,
    reducers: {
        openErrorNotification: (state) => {
            state.isOpen = true;
        },
        closeErrorNotification: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openErrorNotification, closeErrorNotification } = ErrorNotificationSlice.actions;
export const isErrorNotificationOpenSelector = (state: RootState) =>
    state.trainingListErrorNotification.isOpen;
export const errorNotificationReducer = ErrorNotificationSlice.reducer;
