import { Divider, Menu } from 'antd';
import { CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import ExitIcon from '@components/icons/exit-icon';

import { LABELS } from './index.constants';

import './index.css';

const { CALENDAR, WORKOUT, ACHIEVEMENTS, PROFILE, EXIT, DIVIDER } = LABELS;

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
    {
        icon: <Divider />,
        key: DIVIDER,
    },
    {
        label: EXIT,
        title: EXIT,
        icon: <ExitIcon width={16} height={16} />,
        key: EXIT,
    },
];

const NavMenu = () => {
    return <Menu items={menuItems} />;
};

export default NavMenu;
