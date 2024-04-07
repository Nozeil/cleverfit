import { TrainingResponse } from '@models/models';

export const trainingsSorter = (a: TrainingResponse, b: TrainingResponse, sort: 'asc' | 'dsc') => {
    const periodA = a.parameters.period;
    const periodB = b.parameters.period;

    if (periodA === null) {
        return sort === 'asc' ? 1 : -1;
    }

    if (periodB === null) {
        return sort === 'asc' ? -1 : 1;
    }

    return periodA - periodB;
};
