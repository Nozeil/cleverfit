import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type CalendarSidePanelState = {
    isCalendarSidePanelOpen: boolean;
};

const initialState: CalendarSidePanelState = {
  isCalendarSidePanelOpen: false,
};

export const calendarSidePanelSlice = createSlice({
    name: 'calendarSidePanel',
    initialState,
    reducers: {
        openCalendarSidePanel: (state) => {
          state.isCalendarSidePanelOpen = true;
        },
        closeCalendarSidePanel: (state) => {
          state.isCalendarSidePanelOpen = false;
        },
        
    },
});

export const { openCalendarSidePanel, closeCalendarSidePanel } = calendarSidePanelSlice.actions;
export const isCalendarSidePanelOpenSelector = (state: RootState) => state.calendarSidePanel.isCalendarSidePanelOpen;
export const calendarSidePanelReducer = calendarSidePanelSlice.reducer;