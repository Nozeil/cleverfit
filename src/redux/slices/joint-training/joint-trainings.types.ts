import { PayloadAction } from '@reduxjs/toolkit';

export type SetSearchValueAction = PayloadAction<string>;
export type SetPaginationTotalAction = PayloadAction<number>;
export type SetPaginationPageAction = PayloadAction<number>;
export type SetPaginationPageSizeAction = PayloadAction<number>;


