import { Divider, Menu } from 'antd';
import { CalendarTwoTone, HeartFilled, TrophyFilled, IdcardTwoTone } from '@ant-design/icons';
import ExitIcon from '@components/icons/exit';

import { LABELS, ICONS_COLOR } from './index.constants';

import './index.css';

const { CALENDAR, WORKOUT, ACHIEVEMENTS, PROFILE, EXIT, DIVIDER } = LABELS;

const menuItems = [
    {
        label: CALENDAR,
        title: CALENDAR,
        icon: <CalendarTwoTone twoToneColor={ICONS_COLOR} />,
        key: CALENDAR,
    },
    {
        label: WORKOUT,
        title: WORKOUT,
        icon: <HeartFilled style={{ color: ICONS_COLOR }} />,
        key: WORKOUT,
    },
    {
        label: ACHIEVEMENTS,
        title: ACHIEVEMENTS,
        icon: <TrophyFilled style={{ color: ICONS_COLOR }} />,
        key: ACHIEVEMENTS,
    },
    {
        label: PROFILE,
        title: PROFILE,
        icon: <IdcardTwoTone twoToneColor={ICONS_COLOR} />,
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
