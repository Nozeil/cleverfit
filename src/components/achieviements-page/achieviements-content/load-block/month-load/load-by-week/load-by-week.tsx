import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { type WeekDaysData } from '@components/achieviements-page/achieviements-content/achieviement-content.types';
import { WeekDays } from '@components/achieviements-page/achieviements-content/week-days/week-days';
import { Flex } from '@components/flex/flex';
import { Button, Grid, Typography } from 'antd';

import styles from './load-by-week.module.css';

type LoadByWeekProps = {
    data: WeekDaysData;
};

const { useBreakpoint } = Grid;
const iconStyle = { fontSize: 16 };

export const LoadByWeek = ({ data }: LoadByWeekProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { md } = useBreakpoint();

    const text = `Неделя ${data[0].dm}-${data[data.length - 1].dm}`;

    const onClick = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const title = md ? (
        <Typography.Text>{text}</Typography.Text>
    ) : (
        <Button className={styles.btn} type='text' onClick={onClick}>
            <Flex justify='justifyBetween' align='alignCenter' gap='gap16'>
                <Typography.Text className={styles.btnText}>{text}</Typography.Text>
                {isOpen ? <UpOutlined style={iconStyle} /> : <DownOutlined style={iconStyle} />}
            </Flex>
        </Button>
    );

    const isData = isOpen || md;

    const weekDaysProps = isData
        ? { data, listClassName: styles.list }
        : { data: [], listClassName: styles.listEmpty };

    return (
        <WeekDays
            isReadableDays={!md}
            wrappperClassName={styles.wrapper}
            labelClassName={styles.label}
            title={title}
            {...weekDaysProps}
        />
    );
};
