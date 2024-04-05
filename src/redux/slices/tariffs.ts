import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type TariffsState = {
    isSubmitDisabled: boolean;
    isSuccessModalOpen: boolean;
};

const initialState: TariffsState = {
    isSubmitDisabled: true,
    isSuccessModalOpen: false,
};

export const tariffsSlice = createSlice({
    name: 'tariffs',
    initialState,
    reducers: {
        enableTariffsSubmit: (state) => {
            state.isSubmitDisabled = false;
        },
        disableTariffsSubmit: (state) => {
            state.isSubmitDisabled = true;
        },
        openTariffsSuccessModal: (state) => {
            state.isSuccessModalOpen = true;
        },
        closeTariffsSuccessModal: (state) => {
            state.isSuccessModalOpen = false;
        },
    },
});

export const { enableTariffsSubmit, disableTariffsSubmit, openTariffsSuccessModal, closeTariffsSuccessModal } =
    tariffsSlice.actions;
export const selectIsTariffsSubmitDisabled = (state: RootState) => state.tariffs.isSubmitDisabled;
export const selectIsTariffsSuccessModalOpen = (state: RootState) =>
    state.tariffs.isSuccessModalOpen;
export const tariffsReducer = tariffsSlice.reducer;
