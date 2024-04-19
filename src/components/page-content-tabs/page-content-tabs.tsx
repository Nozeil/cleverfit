import { type TabsProps, Tabs } from 'antd';
import classNames from 'classnames/bind';

import styles from './page-content-tabs.module.css';

const cx = classNames.bind(styles);

export const PageContentTabs = ({ className, ...props }: TabsProps) => (
    <Tabs
        className={cx(styles.tabs, className)}
        destroyInactiveTabPane={true}
        moreIcon={null}
        {...props}
    />
);
