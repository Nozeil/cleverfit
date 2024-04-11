import { TrainingStatus } from '@models/models';
import { PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
    userId: string;
    imageSrc: string | null;
    name: string | null;
    status: TrainingStatus;
};

export type SetSearchValueAction = PayloadAction<string>;
export type SetPaginationTotalAction = PayloadAction<number>;
export type SetPaginationPageAction = PayloadAction<number>;
export type SetPaginationPageSizeAction = PayloadAction<number>;
export type SetTrainingKeyAction = PayloadAction<string>;
export type SetUserInfoAction = PayloadAction<UserInfo>;
export type SetDeletedUserIdAction = PayloadAction<string>;
