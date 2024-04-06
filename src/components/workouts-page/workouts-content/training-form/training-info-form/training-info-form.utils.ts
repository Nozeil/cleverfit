import { PERIODS } from '../../trainings-table/workouts-content.constants';

export const createPeriodSelectOptions = () =>
    PERIODS.map((period, index) => ({ label: period, value: index + 1 }));
