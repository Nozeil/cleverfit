import { useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerPeriodSelector } from '@redux/slices/achieviements/achieviements';
import { Grid, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './exercise-statistics.module.css';

const { useBreakpoint } = Grid;

export const ExerciseStatistics = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);
    const { xs } = useBreakpoint();

    const statistics = useMemo(() => {
        const { load, approaches, replays } = trainingsPerPeriod.reduce(
            (acc, curr) => ({
                load: acc.load + curr.load,
                approaches: acc.approaches + curr.approaches,
                replays: acc.replays + curr.replays,
            }),
            { load: 0, approaches: 0, replays: 0 },
        );

        const averageLoad = load / trainingsPerPeriod.length;

        const averageLoadFixed = Number.isInteger(averageLoad)
            ? averageLoad
            : averageLoad.toFixed(1).replace('.', ',');

        return [
            {
                text: xs
                    ? 'Общая нагрузка, кг'
                    : `Общая
нагрузка, кг`,
                value: load,
            },
            {
                text: xs
                    ? 'Нагрузка в день, кг'
                    : `Нагрузка
в день, кг`,
                value: averageLoadFixed,
            },
            {
                text: xs
                    ? 'Количество повторений, раз'
                    : `Количество
повторений, раз`,
                value: replays,
            },
            {
                text: xs
                    ? 'Подходы, раз'
                    : `Подходы,
раз`,
                value: approaches,
            },
        ];
    }, [trainingsPerPeriod, xs]);

    return (
        <Flex className={styles.list} as='ul' gap={{ xs: 'gap16', sm: 'gap16', lg: 'gap24' }}>
            {statistics.map(({ text, value }) => (
                <Flex
                    key={uuidv4()}
                    className={styles.card}
                    as='li'
                    direction={{ sm: 'column' }}
                    justify={{ xs: 'justifyBetween' }}
                    align='alignCenter'
                    gap='gap4'
                >
                    <Typography.Title className={styles.title}>{value}</Typography.Title>
                    <Typography.Text className={styles.text}>{text}</Typography.Text>
                </Flex>
            ))}
        </Flex>
    );
};
