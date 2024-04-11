import { EXERCISES_FORM_MODES, NAV_MENU_LABELS, SORT_BY } from '@constants/index';
import { type TrainingExercise } from '@models/models';

import type { Nullable } from './utility';

type NavMenuActiveKeys = Omit<typeof NAV_MENU_LABELS, 'DIVIDER' | 'EXIT'>;

export type NavMenuSelectedKey = NavMenuActiveKeys[keyof NavMenuActiveKeys];

export type ExercisesFormValues = {
    [x: string]: Omit<TrainingExercise, 'isImplementation'> & {
        id: number;
        shouldDelete?: boolean;
        isImplementation?: boolean;
    };
};

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];

export type TrainingsTableSortedBy = Nullable<SortBy>;

export type ExercisesFormModes = (typeof EXERCISES_FORM_MODES)[keyof typeof EXERCISES_FORM_MODES];
