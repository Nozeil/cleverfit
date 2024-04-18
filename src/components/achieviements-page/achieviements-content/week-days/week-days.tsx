import { type ReactNode, useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import type { TrainingPerPeriodItem } from '@redux/slices/achieviements/achieviements.types';
import { Badge, Typography } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from './week-days.module.css';

type WeekDaysProps = {
    title: ReactNode;
    data: Array<
        Pick<TrainingPerPeriodItem, 'dayOfTheWeek' | 'dayOfTheWeekReadable'> & {
            info: string | number;
        }
    >;
    isBadgeDefaultColor?: boolean;
};

const cx = classNames.bind(styles);

export const WeekDays = ({ title, data, isBadgeDefaultColor }: WeekDaysProps) => {
    const dataSortedByDay = useMemo(
        () => data.slice().sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek),
        [data],
    );

    return (
        <Flex className={styles.wrapper} direction='column' gap='gap20'>
            {title}
            <Flex as='ul' direction='column' gap='gap6'>
                {dataSortedByDay.map(({ dayOfTheWeek, dayOfTheWeekReadable, info }) => (
                    <Flex
                        className={styles.loadListItem}
                        key={uuidv4()}
                        as='li'
                        align='alignCenter'
                        gap='gap16'
                    >
                        <Badge
                            className={cx(styles.badge, {
                                [styles.badgeBg]: !isBadgeDefaultColor,
                                [styles.badgeEmpty]: !info && !isBadgeDefaultColor,
                            })}
                            count={dayOfTheWeek}
                        />
                        <Typography.Text className={styles.dayOfTheWeekReadable}>
                            {dayOfTheWeekReadable}
                        </Typography.Text>
                        {!!info && (
                            <Typography.Text className={styles.load}>{info}</Typography.Text>
                        )}
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
