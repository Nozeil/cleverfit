import { Fragment } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { Tabs } from 'antd';

import styles from './workouts-content.module.css';

const tabsItems = [
    {
        label: 'Мои тренировки',
        key: 'my-trainings',
        children: <div>My</div>,
    },
    { label: 'Совместные тренировки', key: 'joint-trainings', children: <div>Joint</div> },
    { label: 'Марафон', key: 'marathons' },
];

export const WorkoutsContent = () => {
    const { queryResult, refresh } = useTrainingListQueryWithNotification();

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <ContentWrapper className={styles.contentWrapper}>
                <div className={styles.tabsWrapper}>
                    <Tabs
                        className={styles.tabs}
                        items={tabsItems}
                        destroyInactiveTabPane={true}
                        centered={true}
                    />
                </div>
            </ContentWrapper>
        </Fragment>
    );
};
