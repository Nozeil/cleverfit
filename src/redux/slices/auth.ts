import { type RootState } from '@redux/configure-store';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Nullable } from '@typings/utility';
import { getAccessToken } from '@utils/utils';

type AuthState = {
    token: Nullable<string>;
};

const initialState: AuthState = {
    token: getAccessToken(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<Nullable<string>>) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const authReducer = authSlice.reducer;
