import { Flex } from '@components/flex/flex';

import { JointTrainingsCard } from './joint-trainings-card/joint-trainings-card';
import { TrainingPals } from './training-pals/training-pals';

import styles from './joint-trainings.module.css';

export const JointTrainings = () => (
    <Flex className={styles.wrapper} direction='column' gap='gap24'>
        <JointTrainingsCard />
        <TrainingPals />
    </Flex>
);
