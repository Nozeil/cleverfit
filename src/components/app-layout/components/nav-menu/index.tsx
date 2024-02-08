import { CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { LABELS } from './index.constants';

import styles from './index.module.css';
import './index.styles.css';

const { CALENDAR, WORKOUT, ACHIEVEMENTS, PROFILE } = LABELS;

const menuItems = [
    {
        label: CALENDAR,
        title: CALENDAR,
        icon: <CalendarOutlined style={{ color: 'var(--primary-light-9)' }} />,
        key: CALENDAR,
    },
    {
        label: WORKOUT,
        title: WORKOUT,
        icon: <HeartFilled style={{ color: 'var(--primary-light-9)' }} />,
        key: WORKOUT,
    },
    {
        label: ACHIEVEMENTS,
        title: ACHIEVEMENTS,
        icon: <TrophyFilled style={{ color: 'var(--primary-light-9)' }} />,
        key: ACHIEVEMENTS,
    },
    {
        label: PROFILE,
        title: PROFILE,
        icon: <IdcardOutlined style={{ color: 'var(--primary-light-9)' }} />,
        key: PROFILE,
    },
];

const NavMenu = () => {
    return <Menu className={styles.menu} items={menuItems} />;
};

export default NavMenu;
