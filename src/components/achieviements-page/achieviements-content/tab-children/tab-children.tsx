import { Flex } from '@components/flex/flex';

import { ExerciseStatistics } from '../exercise-statistics/exercise-statistics';
import { FrequentTrainingAndExercise } from '../frequent-training-and-exercise/frequent-training-and-exercise';
import { LoadBlock } from '../load-block/load-block';
import { MostCommonExercisesByDay } from '../most-common-exercises-by-day/most-common-exercises-by-day';

import { Filters } from './filters/filters';

export const TabChildren = () => (
    <Flex direction='column' gap='gap24'>
        <Filters />
        <LoadBlock />
        <ExerciseStatistics />
        <FrequentTrainingAndExercise />
        <MostCommonExercisesByDay />
    </Flex>
);
