import { useEffect } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { PageContentTabs } from '@components/page-content-tabs/page-content-tabs';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTrainingsPerWeek } from '@redux/slices/achieviements/achieviements';

import { useTrainingsPerPeriod } from './hooks/hooks';
import { ExerciseStatistics } from './per-week/exercise-statistics/exercise-statistics';
import { LoadBlock } from './per-week/load-block/load-block';
import { TabChildrenWrapper } from './tab-children-wrapper/tab-children-wrapper';

import styles from './achieviements-content.module.css';

export const AchievementsContent = () => {
    const trainingsPerLastWeek = useTrainingsPerPeriod(7);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTrainingsPerWeek(trainingsPerLastWeek));
    }, [dispatch, trainingsPerLastWeek]);

    const tabsItems = [
        {
            label: 'За неделю',
            key: 'week',
            children: (
                <TabChildrenWrapper>
                    <LoadBlock />
                    <ExerciseStatistics />
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

    return (
        <ContentWrapper className={styles.contentWrapper}>
            <PageContentTabs className={styles.tabs} items={tabsItems} />
        </ContentWrapper>
    );
};
