import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type TariffsSidePanelState = {
    isSubmitDisabled: boolean;
};

const initialState: TariffsSidePanelState = {
    isSubmitDisabled: true,
};

export const tariffsSidePanelSlice = createSlice({
    name: 'tariffsSidePanel',
    initialState,
    reducers: {
        enableTariffsSidePanelSubmit: (state) => {
            state.isSubmitDisabled = false;
        },
    },
});

export const { enableTariffsSidePanelSubmit } = tariffsSidePanelSlice.actions;
export const selectIsSubmitDisabledTariffsSidePanel = (state: RootState) =>
    state.tariffsSidePanel.isSubmitDisabled;
export const tariffsSidePanelReducer = tariffsSidePanelSlice.reducer;
