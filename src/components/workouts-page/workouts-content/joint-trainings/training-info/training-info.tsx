import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import styles from './training-info.module.css';

type TrainingInfoProps = {
    trainingType: string;
    avgWeight: number;
};

export const TrainingInfo = ({ trainingType, avgWeight }: TrainingInfoProps) => (
    <Flex gap='gap16'>
        <Flex direction='column' gap='gap6'>
            <Typography.Text className={styles.label}>Тип тренировки:</Typography.Text>
            <Typography.Text className={styles.label}>Средняя нагрузка:</Typography.Text>
        </Flex>
        <Flex direction='column' gap='gap6'>
            <Typography.Text className={styles.value}>{trainingType}</Typography.Text>
            <Typography.Text className={styles.value}>{`${avgWeight} кг/нед`}</Typography.Text>
        </Flex>
    </Flex>
);
