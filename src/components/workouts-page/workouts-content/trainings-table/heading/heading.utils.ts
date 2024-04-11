import type { SortBy, TrainingsTableSortedBy } from '@typings/index';

const defaultIconColor = 'var(--character-light-disable-25)';

export const createIconStyle = (sortedBy: TrainingsTableSortedBy, sort: SortBy) => ({
    color: sortedBy === sort ? 'var(--primary-light-6)' : defaultIconColor,
});
