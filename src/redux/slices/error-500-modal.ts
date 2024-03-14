import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type Error500ModalState = {
    isOpen: boolean;
};

const initialState: Error500ModalState = {
    isOpen: false,
};

export const error500ModalSlice = createSlice({
    name: 'error500Modal',
    initialState,
    reducers: {
        openError500Modal: (state) => {
            state.isOpen = true;
        },
        closeError500Modal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { closeError500Modal, openError500Modal } = error500ModalSlice.actions;
export const isError500ModalOpenSelector = (state: RootState) => state.error500Modal.isOpen;
export const error500ModalReducer = error500ModalSlice.reducer;
