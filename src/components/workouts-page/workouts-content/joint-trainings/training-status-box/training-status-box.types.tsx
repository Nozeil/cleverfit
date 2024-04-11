import { type ReactNode } from 'react';
import type { InviteStatus } from '@models/models';
import type { Nullable } from '@typings/utility';

export type Content = {
    text: Nullable<string>;
    icon: ReactNode;
};

export type TrainingStatusProps = { status: InviteStatus };
