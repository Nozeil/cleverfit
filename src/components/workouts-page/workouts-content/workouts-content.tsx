import { Fragment } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { Grid, Tabs } from 'antd';

import styles from './workouts-content.module.css';

const { useBreakpoint } = Grid;

const tabsItems = [
    {
        label: 'Мои тренировки',
        key: 'my-trainings',
        children: <div>My</div>,
    },
    { label: 'Совместные тренировки', key: 'joint-trainings', children: <div>Joint</div> },
    { label: 'Марафоны', key: 'marathons' },
];

export const WorkoutsContent = () => {
    const { queryResult, refresh } = useTrainingListQueryWithNotification();
    const { xl, sm } = useBreakpoint();

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
