import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { PageContentTabs } from '@components/page-content-tabs/page-content-tabs';

import { TabChildrenWrapper } from './tab-children-wrapper/tab-children-wrapper';

import styles from './achieviements-content.module.css';

export const AchievementsContent = () => {
    const tabsItems = [
        {
            label: 'За неделю',
            key: 'week',
            children: <TabChildrenWrapper>week</TabChildrenWrapper>,
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
