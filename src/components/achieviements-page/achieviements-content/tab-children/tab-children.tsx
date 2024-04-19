import { Fragment } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerPeriodSelector } from '@redux/slices/achieviements/achieviements';

import { ExerciseStatistics } from '../exercise-statistics/exercise-statistics';
import { FrequentTrainingAndExercise } from '../frequent-training-and-exercise/frequent-training-and-exercise';
import { LoadBlock } from '../load-block/load-block';
import { MostCommonExercisesByDay } from '../most-common-exercises-by-day/most-common-exercises-by-day';

import { Empty } from './empty/empty';
import { Filters } from './filters/filters';

export const TabChildren = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);

    const areEmpty = trainingsPerPeriod.every((training) => training.trainingNames.length === 0);

    let content;

    if (areEmpty) {
        content = <Empty />;
    } else {
        content = (
            <Fragment>
                <LoadBlock />
                <ExerciseStatistics />
                <FrequentTrainingAndExercise />
                <MostCommonExercisesByDay />
            </Fragment>
        );
    }

    return (
        <Flex direction='column' gap='gap24'>
            <Filters />
            {content}
        </Flex>
    );
};
