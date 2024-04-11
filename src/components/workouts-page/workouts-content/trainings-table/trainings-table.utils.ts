import { SORT_BY } from '@constants/index';
import { TrainingResponse } from '@models/models';
import type { SortBy } from '@typings/index';

const { ASC } = SORT_BY;

export const trainingsSorter = (a: TrainingResponse, b: TrainingResponse, sort: SortBy) => {
    const periodA = a.parameters.period;
    const periodB = b.parameters.period;

    if (periodA === null) {
        return sort === ASC ? -1 : 1;
    }

    if (periodB === null) {
        return sort === ASC ? 1 : -1;
    }

    return periodA - periodB;
};
