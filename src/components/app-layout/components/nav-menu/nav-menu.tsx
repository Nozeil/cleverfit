import { Divider, Menu } from 'antd';
import { CalendarTwoTone, HeartFilled, TrophyFilled, IdcardTwoTone } from '@ant-design/icons';
import ExitIcon from '@assets/icons/exit.svg?react';

import { LABELS, ICONS_COLOR } from './nav-menu.constants';

import styles from './nav-menu.module.css';

const { CALENDAR, WORKOUT, ACHIEVEMENTS, PROFILE, EXIT, DIVIDER } = LABELS;

const menuItems = [
    {
        label: CALENDAR,
        title: CALENDAR,
        icon: <CalendarTwoTone className={styles.icon} twoToneColor={[ICONS_COLOR, ICONS_COLOR]} />,
        key: CALENDAR,
    },
    {
        label: WORKOUT,
        title: WORKOUT,
        icon: <HeartFilled className={styles.icon} style={{ color: ICONS_COLOR }} />,
        key: WORKOUT,
    },
    {
        label: ACHIEVEMENTS,
        title: ACHIEVEMENTS,
        icon: <TrophyFilled className={styles.icon} style={{ color: ICONS_COLOR }} />,
        key: ACHIEVEMENTS,
    },
    {
        label: PROFILE,
        title: PROFILE,
        icon: <IdcardTwoTone className={styles.icon} twoToneColor={[ICONS_COLOR, ICONS_COLOR]} />,
        key: PROFILE,
    },
    {
        icon: <Divider />,
        key: DIVIDER,
    },
    {
        label: EXIT,
        title: EXIT,
        icon: (
            <ExitIcon className={styles.icon} width={16} height={16} alignmentBaseline='central' />
        ),
        key: EXIT,
    },
];

const NavMenu = () => <Menu className={styles.menu} items={menuItems} />;

export default NavMenu;