import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type SuccessAlertState = {
    isOpen: boolean;
};

const initialState: SuccessAlertState = {
    isOpen: false,
};

export const successAlertSlice = createSlice({
    name: 'success-alert',
    initialState,
    reducers: {
        openSuccessAlert: (state) => {
            state.isOpen = true;
        },
        closeSuccessAlert: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openSuccessAlert, closeSuccessAlert } = successAlertSlice.actions;
export const isSuccessAlertOpenSelector = (state: RootState) => state.successAlert.isOpen;

export const successAlertReducer = successAlertSlice.reducer;
