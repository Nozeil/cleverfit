import { useEffect } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { PageContentTabs } from '@components/page-content-tabs/page-content-tabs';
import { ACHIEVEMENT_ACTIVE_KEYS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeKeySelector,
    setActiveKey,
    setTrainingsPerPeriod,
} from '@redux/slices/achieviements/achieviements';
import { type TabsProps } from 'antd';

import { useTrainingsPerPeriod } from './hooks/hooks';
import { TabChildren } from './tab-children/tab-children';

import styles from './achieviements-content.module.css';

const { WEEK, MONTH } = ACHIEVEMENT_ACTIVE_KEYS;

const tabsItems = [
    {
        label: 'За неделю',
        key: WEEK,
        children: <TabChildren />,
    },
    {
        label: 'За месяц',
        key: MONTH,
        children: <TabChildren />,
    },
    { label: 'За все время (PRO)', key: '', disabled: true },
];

export const AchievementsContent = () => {
    const key = useAppSelector(activeKeySelector);
    const trainingsPerPeriod = useTrainingsPerPeriod();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTrainingsPerPeriod(trainingsPerPeriod));
    }, [dispatch, trainingsPerPeriod]);

    const onChange: TabsProps['onChange'] = (activeKey) => {
        if (activeKey === WEEK || activeKey === MONTH) {
            dispatch(setActiveKey(activeKey));
        }
    };

    return (
        <ContentWrapper className={styles.contentWrapper}>
            <PageContentTabs
                className={styles.tabs}
                activeKey={key}
                items={tabsItems}
                onChange={onChange}
            />
        </ContentWrapper>
    );
};
