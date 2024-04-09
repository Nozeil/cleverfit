import { type ReactNode } from 'react';
import type { TrainingStatus } from '@models/models';

export type Content = {
    text: string | null;
    icon: ReactNode;
};

export type TrainingStatusProps = { status: TrainingStatus };
