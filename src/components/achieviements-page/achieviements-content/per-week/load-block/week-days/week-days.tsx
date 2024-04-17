import { useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerWeekSelector } from '@redux/slices/achieviements/achieviements';
import { Badge, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './week-days.module.css';

const cx = classNames.bind(styles);

export const WeekDays = () => {
    const trainingsPerWeek = useAppSelector(trainingsPerWeekSelector);

    const trainingsPerWeekSortedByDay = useMemo(
        () => trainingsPerWeek.slice().sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek),
        [trainingsPerWeek],
    );

    return (
        <Flex direction='column' gap='gap20'>
            <Typography.Text className={styles.loadPerDayText}>
                Средняя нагрузка по дням недели
            </Typography.Text>
            <Flex as='ul' direction='column' gap='gap6'>
                {trainingsPerWeekSortedByDay.map(
                    ({ date, dayOfTheWeek, dayOfTheWeekReadable, load }) => (
                        <Flex
                            className={styles.loadListItem}
                            key={date}
                            as='li'
                            align='alignCenter'
                            gap='gap16'
                        >
                            <Badge
                                className={cx(styles.badge, { [styles.badgeEmpty]: !load })}
                                count={dayOfTheWeek}
                            />
                            <Typography.Text className={styles.dayOfTheWeekReadable}>
                                {dayOfTheWeekReadable}
                            </Typography.Text>
                            {!!load && (
                                <Typography.Text
                                    className={styles.load}
                                >{`${load} кг`}</Typography.Text>
                            )}
                        </Flex>
                    ),
                )}
            </Flex>
        </Flex>
    );
};
