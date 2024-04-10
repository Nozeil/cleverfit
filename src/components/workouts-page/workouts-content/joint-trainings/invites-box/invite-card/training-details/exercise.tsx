import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import styles from './training-details.module.css';

type ExerciseProps = {
    name: string;
    approaches: number;
    weight: number;
    replays: number;
};

export const Exercise = ({ name, approaches, replays, weight }: ExerciseProps) => {
    const weightParam = weight ? `x (${weight} кг)` : '';

    return (
        <Flex justify='justifyBetween' align='alignCenter'>
            <Typography.Paragraph className={styles.exerciseName}>{name}</Typography.Paragraph>
            <Typography.Text
                className={styles.exerciseParams}
            >{`${approaches} ${weightParam} x (${replays})`}</Typography.Text>
        </Flex>
    );
};
