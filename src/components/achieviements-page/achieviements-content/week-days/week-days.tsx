import { type ReactNode, useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { Badge, Typography } from 'antd';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import type { WeekDaysData } from '../achieviement-content.types';

import styles from './week-days.module.css';

type WeekDaysProps = {
    title: ReactNode;
    data: WeekDaysData;
    isReadableDays: boolean;
    wrappperClassName?: string;
    listClassName?: string;
    labelClassName?: string;
    isBadgeDefaultColor?: boolean;
};

const cx = classNames.bind(styles);

export const WeekDays = ({
    title,
    data,
    isReadableDays,
    isBadgeDefaultColor,
    wrappperClassName,
    labelClassName,
    listClassName,
}: WeekDaysProps) => {
    const dataSortedByDay = useMemo(
        () => data.slice().sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek),
        [data],
    );

    return (
        <Flex className={cx(styles.wrapper, wrappperClassName)} direction='column'>
            {title}
            <Flex className={cx(styles.list, listClassName)} as='ul' direction='column' gap='gap6'>
                {dataSortedByDay.map(({ dmy, dayOfTheWeek, dayOfTheWeekReadable, info }) => (
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
                        <Typography.Text className={cx(styles.label, labelClassName)}>
                            {isReadableDays ? dayOfTheWeekReadable : dmy}
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
