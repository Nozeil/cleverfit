import { NAV_MENU_LABELS } from '@constants/index';
import { type PayloadAction } from '@reduxjs/toolkit';

type ActiveKeys = Omit<typeof NAV_MENU_LABELS, 'DIVIDER' | 'EXIT'>;

export type SelectedKeyAction = PayloadAction<ActiveKeys[keyof ActiveKeys]>;
