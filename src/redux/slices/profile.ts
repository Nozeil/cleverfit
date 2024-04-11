import { type RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfileState = {
    isSubmitDisabled: boolean;
    required: boolean;
};

const initialState: ProfileState = {
    isSubmitDisabled: true,
    required: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileRequiredTrue: (state) => {
            state.required = true;
        },
        setProfileRequiredFalse: (state) => {
            state.required = false;
        },
        disableProfileSubmit: (state) => {
            state.isSubmitDisabled = true;
        },
        enableProfileSubmit: (state) => {
            state.isSubmitDisabled = false;
        },
        setProfileSubmit: (state, action: PayloadAction<boolean>) => {
            state.isSubmitDisabled = action.payload;
        },
        setProfileStateAfterSuccess: (state) => {
            state.required = false;
            state.isSubmitDisabled = true;
        },
    },
});

export const {
    setProfileStateAfterSuccess,
    disableProfileSubmit,
    enableProfileSubmit,
    setProfileRequiredFalse,
    setProfileRequiredTrue,
    setProfileSubmit,
} = profileSlice.actions;
export const selectProfileRequired = (state: RootState) => state.profile.required;
export const selectProfileIsSubmitDisabled = (state: RootState) => state.profile.isSubmitDisabled;

export const profileReducer = profileSlice.reducer;
