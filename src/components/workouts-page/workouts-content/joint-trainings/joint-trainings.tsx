import { Fragment } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isJointTrainingsSearchOpenSelector } from '@redux/slices/joint-training/joint-trainings';

import { JointTrainingsCard } from './joint-trainings-card/joint-trainings-card';
import { PalsSearchBox } from './pals-search-box/pals-search-box';
import { TrainingPals } from './training-pals/training-pals';

import styles from './joint-trainings.module.css';

export const JointTrainings = () => {
    const isSearch = useAppSelector(isJointTrainingsSearchOpenSelector);

    return (
        <Flex className={styles.wrapper} direction='column' gap='gap24'>
            {isSearch ? (
                <PalsSearchBox />
            ) : (
                <Fragment>
                    <JointTrainingsCard />
                    <TrainingPals />
                </Fragment>
            )}
        </Flex>
    );
};
