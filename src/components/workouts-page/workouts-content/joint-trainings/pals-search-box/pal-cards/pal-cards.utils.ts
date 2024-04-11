import type { JointTrainingListItem } from '@models/models';

export const Sorter = (a: JointTrainingListItem, b: JointTrainingListItem) => {
    if (a.name && b.name) {
        return a.name.localeCompare(b.name);
    }

    return 0;
};
