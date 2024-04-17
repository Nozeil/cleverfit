import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import { WeekDays } from './week-days/week-days';
import { WeekLoadChart } from './week-load-chart/week-load-chart';

import styles from './load-block.module.css';

export const LoadBlock = () => (
    <Flex
        className={styles.loadBlock}
        direction={{ xs: 'column', sm: 'column', xl: 'row' }}
        align={{ xl: 'alignCenter' }}
        gap={{ xs: 'gap24', sm: 'gap24', xl: 'gap150' }}
    >
        <Flex className={styles.loadChartWrapper} direction='column' align='alignCenter'>
            <WeekLoadChart />
            <Typography.Text className={styles.text}>Нагрузка, кг</Typography.Text>
        </Flex>
        <WeekDays />
    </Flex>
);
