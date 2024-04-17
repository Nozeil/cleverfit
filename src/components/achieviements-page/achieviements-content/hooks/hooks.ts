import { useMemo } from 'react';
import { ACTIVE_FILTER_ALL, DATE_FORMATS, MOMENT_SET } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { activeFilterSelector } from '@redux/slices/achieviements/achieviements';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { calcLoadPerExercise, capitalizeFirstLetter, formatDate } from '@utils/utils';
import moment from 'moment';

const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);
const fourDaysLater = new Date().setDate(new Date().getDate() + 4);
// const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
const nextMonth = new Date().setDate(new Date().getDate() + 15);

const userTraining = [
    {
        _id: '1',
        name: 'Ноги',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '2',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '3',
        name: 'Силовая',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '4',
        name: 'Спина',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '5',
        name: 'Грудь',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '6',
        name: 'Ноги',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '7',
        name: 'Руки',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '8',
        name: 'Силовая',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: '9',
        name: 'Спина',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '10',
        name: 'Грудь',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '11',
        name: 'Ноги',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '12',
        name: 'Руки',
        date: fourDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '13',
        name: 'Силовая',
        date: dayBeforeToday,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '14',
        name: 'Спина',
        date: dayAfterTomorrow,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '15',
        name: 'Грудь',
        date: dayAfterTomorrow,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '16',
        name: 'Ноги',
        date: nextMonth,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '17',
        name: 'Руки',
        date: nextMonth,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '18',
        name: 'Силовая',
        date: nextMonth,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '19',
        name: 'Спина',
        date: nextMonth,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '20',
        name: 'Грудь',
        date: nextMonth,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
];

const createEmptyDay = (momentDate: moment.Moment) => {
    const sunday = 7;
    const { iso } = formatDate(momentDate);
    const dm = momentDate.format(DATE_FORMATS.DM);
    const dayOfTheWeek = momentDate.day() || sunday;
    const dayOfTheWeekReadable = capitalizeFirstLetter(momentDate.format('dddd'));

    return {
        date: iso,
        dm,
        dayOfTheWeek,
        dayOfTheWeekReadable,
        load: 0,
    };
};

/* const mockTrainings = [
    { date: '2024-04-10T00:00:00.000Z' },
    { date: '2024-04-11T00:00:00.000Z' },
    { date: '2024-04-12T00:00:00.000Z' },
    { date: '2024-04-13T00:00:00.000Z' },
    { date: '2024-04-14T00:00:00.000Z' },
    { date: '2024-04-15T00:00:00.000Z' },
    { date: '2024-04-16T00:00:00.000Z' },
    { date: '2024-04-17T00:00:00.000Z' },
    { date: '2024-04-18T00:00:00.000Z' },
    { date: '2024-04-19T00:00:00.000Z' },
]; */

export const useTrainingsPerPeriod = (daysAmount: number) => {
    const { data } = useGetTrainingQuery();
    const period = daysAmount - 1;
    const activeFilter = useAppSelector(activeFilterSelector);

    const startDate = moment().subtract(period, 'd').set(MOMENT_SET);
    const endDate = moment().set(MOMENT_SET);

    const days = useMemo(
        () =>
            new Array(daysAmount)
                .fill(null)
                .map((_, index) => createEmptyDay(startDate.clone().add(index, 'd'))),
        [daysAmount, startDate],
    );

    const dataPerPeriod = useMemo(() => {
        /* if (!data) {
            return [];
        } */

        const trainings = userTraining.filter(({ date }) => {
            const today = 0;
            const diff = endDate.diff(moment(date).set(MOMENT_SET), 'd');

            return diff <= period && diff >= today;
        });

        if (activeFilter.key !== ACTIVE_FILTER_ALL.KEY) {
            return trainings.filter(({ name }) => name === activeFilter.name);
        }

        return trainings;
    }, [activeFilter.key, activeFilter.name, endDate, period, data]);

    const trainingsWithDateAndLoad = useMemo(
        () =>
            dataPerPeriod.map(({ date, exercises }) => {
                const { iso } = formatDate(date);

                const load = exercises
                    .map(({ weight, approaches, replays }) =>
                        calcLoadPerExercise(weight, approaches, replays),
                    )
                    .reduce((acc, curr) => acc + curr);

                return {
                    date: iso,
                    load,
                };
            }),
        [dataPerPeriod],
    );

    const aggregatedTrainingsLoads = useMemo(
        () =>
            trainingsWithDateAndLoad
                .reduce<Array<{ date: string; load: number }>>((acc, curr) => {
                    const trainingIndex = acc.findIndex(
                        (loadPerTraining) => loadPerTraining.date === curr.date,
                    );

                    if (trainingIndex === -1) {
                        acc.push(curr);
                    } else {
                        const training = acc[trainingIndex];

                        acc[trainingIndex] = {
                            ...training,
                            load: training.load + curr.load,
                        };
                    }

                    return acc;
                }, [])
                .sort((a, b) => a.date.localeCompare(b.date)),
        [trainingsWithDateAndLoad],
    );

    const trainingsPerPeriod = useMemo(
        () =>
            days.map((day) => {
                const trainingIndex = aggregatedTrainingsLoads.findIndex(
                    (training) => training.date === day.date,
                );

                if (trainingIndex > -1) {
                    return { ...day, load: aggregatedTrainingsLoads[trainingIndex].load };
                }

                return day;
            }),
        [days, aggregatedTrainingsLoads],
    );

    return trainingsPerPeriod;
};
