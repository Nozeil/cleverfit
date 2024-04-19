import { Column } from '@ant-design/charts';
import { ACHIEVEMENT_ACTIVE_KEYS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeKeySelector,
    trainingsPerPeriodSelector,
} from '@redux/slices/achieviements/achieviements';
import { Grid, Typography } from 'antd';

import { createConfig } from './load-chart.constants';

import styles from './load-chart.module.css';

const { useBreakpoint } = Grid;

const { WEEK } = ACHIEVEMENT_ACTIVE_KEYS;

export const LoadChart = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);
    const activeKey = useAppSelector(activeKeySelector);
    const isWeek = activeKey === WEEK;

    const { md } = useBreakpoint();

    const config = createConfig(isWeek, md);

    return (
        <div className={styles.loadChartWrapper}>
            <Column data={trainingsPerPeriod} {...config} />
            <Typography.Paragraph className={styles.text}>Нагрузка, кг</Typography.Paragraph>
        </div>
    );
};
