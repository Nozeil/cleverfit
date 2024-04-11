import { InviteStatus } from '@models/models';
import { PayloadAction } from '@reduxjs/toolkit';
import type { Nullable } from '@typings/utility';

export type UserInfo = {
    userId: string;
    imageSrc: Nullable<string>;
    name: Nullable<string>;
    status: InviteStatus;
};

export type SetSearchValueAction = PayloadAction<string>;
export type SetPaginationTotalAction = PayloadAction<number>;
export type SetPaginationPageAction = PayloadAction<number>;
export type SetPaginationPageSizeAction = PayloadAction<number>;
export type SetTrainingKeyAction = PayloadAction<string>;
export type SetUserInfoAction = PayloadAction<UserInfo>;
export type SetDeletedUserIdAction = PayloadAction<string>;
