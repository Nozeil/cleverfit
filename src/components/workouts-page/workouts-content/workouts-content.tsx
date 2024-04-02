import { Fragment } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { Grid, Tabs } from 'antd';

import { EmptyTrainings } from './empty-trainings/empty-trainings';

import styles from './workouts-content.module.css';

const { useBreakpoint } = Grid;

export const WorkoutsContent = () => {
    const { refresh } = useTrainingListQueryWithNotification();
    const { data: trainings } = useGetTrainingQuery();
    const { xl, sm } = useBreakpoint();

    const tabsItems = [
        {
            label: 'Мои тренировки',
            key: 'my-trainings',
            children: trainings?.length ? <div>Trainings</div> : <EmptyTrainings />,
        },
        { label: 'Совместные тренировки', key: 'joint-trainings', children: <div>Joint</div> },
        { label: 'Марафоны', key: 'marathons' },
    ];

    let tabBarGutter = 0;

    if (xl) {
        tabBarGutter = 228;
    } else if (sm) {
        tabBarGutter = 74;
    } else {
        tabBarGutter = 10;
    }

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <ContentWrapper className={styles.contentWrapper}>
                <Tabs
                    className={styles.tabs}
                    items={tabsItems}
                    destroyInactiveTabPane={true}
                    tabBarGutter={tabBarGutter}
                    moreIcon={null}
                />
            </ContentWrapper>
        </Fragment>
    );
};
