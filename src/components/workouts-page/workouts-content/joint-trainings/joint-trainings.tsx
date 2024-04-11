import { Fragment } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isJointTrainingsSearchOpenSelector } from '@redux/slices/joint-training/joint-trainings';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';

import { InvitesBox } from './invites-box/invites-box';
import { JointTrainingsCard } from './joint-trainings-card/joint-trainings-card';
import { PalsSearchBox } from './pals-search-box/pals-search-box';
import { TrainingPals } from './training-pals/training-pals';
import { MAX_TRAINING_PALS_AMOUNT } from './joint-trainings.constants';

import styles from './joint-trainings.module.css';

export const JointTrainings = () => {
    const { data: trainingPals } = useGetTrainingPalsQuery();
    const isSearch = useAppSelector(isJointTrainingsSearchOpenSelector);

    const isLessThenMaxPals = trainingPals && trainingPals.length < MAX_TRAINING_PALS_AMOUNT;

    return (
        <Flex className={styles.wrapper} direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
            {isSearch ? (
                <PalsSearchBox />
            ) : (
                <Fragment>
                    <InvitesBox />
                    {isLessThenMaxPals && <JointTrainingsCard />}
                    <TrainingPals />
                </Fragment>
            )}
        </Flex>
    );
};
