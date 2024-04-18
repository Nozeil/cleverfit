import { useEffect } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { PageContentTabs } from '@components/page-content-tabs/page-content-tabs';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTrainingsPerWeek } from '@redux/slices/achieviements/achieviements';

import { FrequentTrainingAndExercise } from './frequent-training-and-exercise/frequent-training-and-exercise';
import { useTrainingsPerPeriod } from './hooks/hooks';
import { MostCommonExercisesByDay } from './most-common-exercises-by-day/most-common-exercises-by-day';
import { ExerciseStatistics } from './per-week/exercise-statistics/exercise-statistics';
import { LoadBlock } from './per-week/load-block/load-block';
import { TabChildrenWrapper } from './tab-children-wrapper/tab-children-wrapper';

import styles from './achieviements-content.module.css';

const tabsItems = [
    {
        label: 'За неделю',
        key: 'week',
        children: (
            <TabChildrenWrapper>
                <LoadBlock />
                <ExerciseStatistics />
                <FrequentTrainingAndExercise />
                <MostCommonExercisesByDay />
            </TabChildrenWrapper>
        ),
    },
    {
        label: 'За месяц',
        key: 'month',
        children: <TabChildrenWrapper>month</TabChildrenWrapper>,
    },
    { label: 'За все время (PRO)', key: 'all', disabled: true },
];

export const AchievementsContent = () => {
    const trainingsPerLastWeek = useTrainingsPerPeriod(7);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTrainingsPerWeek(trainingsPerLastWeek));
    }, [dispatch, trainingsPerLastWeek]);

    return (
        <ContentWrapper className={styles.contentWrapper}>
            <PageContentTabs className={styles.tabs} items={tabsItems} />
        </ContentWrapper>
    );
};
