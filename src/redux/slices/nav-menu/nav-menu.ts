import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type { SelectedKeyAction } from './nav-menu.types';

type NavMenuState = {
    selectedKeys: string[];
};

const initialState: NavMenuState = {
    selectedKeys: [],
};

export const navMenuSlice = createSlice({
    name: 'nav-menu',
    initialState,
    reducers: {
        setSelectedKey: (state, action: SelectedKeyAction) => {
            state.selectedKeys = [action.payload];
        },
        resetSelectedKeys: (state) => {
            state.selectedKeys = [];
        },
    },
});

export const { setSelectedKey, resetSelectedKeys } = navMenuSlice.actions;
export const selectedKeysSelector = (state: RootState) => state.navMenu.selectedKeys;
export const navMenuReducer = navMenuSlice.reducer;
