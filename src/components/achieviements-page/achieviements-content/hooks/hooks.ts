import { useMemo } from 'react';
import { ACHIEVEMENT_ACTIVE_KEYS, ACTIVE_FILTER_ALL, MOMENT_SET } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { activeFilterSelector, activeKeySelector } from '@redux/slices/achieviements/achieviements';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { calcLoadPerExercise, formatDate } from '@utils/utils';
import moment from 'moment';

import { createEmptyDay } from '../achieviements-content.utils';

const { MONTH } = ACHIEVEMENT_ACTIVE_KEYS;
const week = 7;
const month = 28;

export const useTrainingsPerPeriod = () => {
    const { data } = useGetTrainingQuery();
    const activeKey = useAppSelector(activeKeySelector);
    const activeFilter = useAppSelector(activeFilterSelector);

    const isMonth = activeKey === MONTH;
    const daysAmount = isMonth ? month : week;
    const period = daysAmount - 1;

    const endDate = moment().set(MOMENT_SET);

    const startDate = useMemo(() => {
        const start = moment().subtract(period, 'd').set(MOMENT_SET);

        if (isMonth) {
            const dayINeed = 1;
            const startDay = start.isoWeekday();

            if (startDay <= dayINeed) {
                start.isoWeekday(dayINeed);
            } else {
                start.add(1, 'w').isoWeekday(dayINeed);
            }
        }

        return start;
    }, [isMonth, period]);

    const days = useMemo(
        () =>
            new Array(daysAmount)
                .fill(null)
                .map((_, index) => createEmptyDay(startDate.clone().add(index, 'd'))),
        [daysAmount, startDate],
    );

    const dataPerPeriod = useMemo(() => {
        if (!data) {
            return [];
        }

        const trainings = data.filter(({ date }) => {
            const today = 0;
            const diff = endDate.diff(moment(date).set(MOMENT_SET), 'd');

            return diff <= period && diff >= today;
        });

        if (activeFilter.key !== ACTIVE_FILTER_ALL.KEY) {
            return trainings.filter(({ name }) => name === activeFilter.name);
        }

        return trainings;
    }, [activeFilter.key, activeFilter.name, endDate, period, data]);

    const trainingsWithSummarizedExercises = useMemo(
        () =>
            dataPerPeriod.map(({ date, name, exercises }) => {
                const { iso } = formatDate(date);

                const summarizedExercises = exercises
                    .map(({ name: exerciseName, weight, approaches, replays }) => ({
                        names: [exerciseName],
                        load: calcLoadPerExercise(weight, approaches, replays),
                        approaches,
                        replays,
                    }))
                    .reduce((acc, curr) => ({
                        names: [...acc.names, ...curr.names],
                        load: acc.load + curr.load,
                        approaches: acc.approaches + curr.approaches,
                        replays: acc.replays + curr.replays,
                    }));

                return {
                    date: iso,
                    trainingNames: [name],
                    summarizedExercises,
                };
            }),
        [dataPerPeriod],
    );

    const aggregatedTrainings = useMemo(
        () =>
            trainingsWithSummarizedExercises
                .reduce<
                    Array<{
                        date: string;
                        trainingNames: string[];
                        summarizedExercises: {
                            names: string[];
                            load: number;
                            approaches: number;
                            replays: number;
                        };
                    }>
                >((acc, curr) => {
                    const trainingIndex = acc.findIndex(
                        (loadPerTraining) => loadPerTraining.date === curr.date,
                    );

                    if (trainingIndex === -1) {
                        acc.push(curr);
                    } else {
                        const training = acc[trainingIndex];

                        acc[trainingIndex] = {
                            date: training.date,
                            trainingNames: [...training.trainingNames, ...curr.trainingNames],
                            summarizedExercises: {
                                names: [
                                    ...training.summarizedExercises.names,
                                    ...curr.summarizedExercises.names,
                                ],
                                load:
                                    training.summarizedExercises.load +
                                    curr.summarizedExercises.load,
                                approaches:
                                    training.summarizedExercises.approaches +
                                    curr.summarizedExercises.approaches,
                                replays:
                                    training.summarizedExercises.replays +
                                    curr.summarizedExercises.replays,
                            },
                        };
                    }

                    return acc;
                }, [])
                .sort((a, b) => a.date.localeCompare(b.date)),
        [trainingsWithSummarizedExercises],
    );

    const trainingsPerPeriod = useMemo(
        () =>
            days.map((day) => {
                const trainingIndex = aggregatedTrainings.findIndex(
                    (training) => training.date === day.date,
                );

                if (trainingIndex > -1) {
                    const { summarizedExercises, trainingNames } =
                        aggregatedTrainings[trainingIndex];

                    const { names: exerciseNames, load, ...exercises } = summarizedExercises;

                    return {
                        ...day,
                        trainingNames,
                        exerciseNames,
                        ...exercises,
                        load,
                        averageLoad: load ? Math.round(load / exerciseNames.length) : load,
                    };
                }

                return day;
            }),
        [days, aggregatedTrainings],
    );

    return trainingsPerPeriod;
};
