import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type SiderState = {
    collapsed: boolean;
};

const initialState: SiderState = {
    collapsed: false,
};

export const siderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        toogleCollapsed: (state) => {
            state.collapsed = !state.collapsed;
        },
    },
});

export const { toogleCollapsed } = siderSlice.actions;
export const selectSider = (state: RootState) => state.sider.collapsed;
export const siderReducer = siderSlice.reducer;
