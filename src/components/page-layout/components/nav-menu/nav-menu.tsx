import { useNavigate } from 'react-router-dom';
import { CalendarTwoTone, HeartFilled, IdcardTwoTone, TrophyFilled } from '@ant-design/icons';
import ExitIcon from '@assets/icons/exit.svg?react';
import { NAV_MENU_LABELS } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useAuth } from '@hooks/use-auth';
import { useTrainingHandler } from '@hooks/use-training-handler';
import { selectedKeysSelector } from '@redux/slices/nav-menu/nav-menu';
import { useGetInvitesQuery } from '@services/endpoints/invite';
import { Badge, Grid, Menu, MenuProps } from 'antd';

import { ICONS_COLOR } from './nav-menu.constants';

import styles from './nav-menu.module.css';

const { useBreakpoint } = Grid;

const { CALENDAR, WORKOUT, ACHIEVEMENTS, PROFILE, EXIT, DIVIDER } = NAV_MENU_LABELS;

export const NavMenu = () => {
    const selectedKeys = useAppSelector(selectedKeysSelector);
    const { signout } = useAuth();
    const navigate = useNavigate();

    const { data: invites } = useGetInvitesQuery(undefined, /* { pollingInterval: 3000 } */);

    const calendarHandler = useTrainingHandler(() => navigate(ROUTES.CALENDAR));
    const workoutsHandler = useTrainingHandler(() => navigate(ROUTES.TRAINING));
    const achievementsHandler = useTrainingHandler(() => navigate(ROUTES.ACHIEVEMENTS));

    const { md } = useBreakpoint();
    const mode = md ? 'inline' : 'vertical';

    const menuItems = [
        {
            label: CALENDAR,
            title: CALENDAR,
            icon: (
                <CalendarTwoTone
                    className={styles.icon}
                    twoToneColor={[ICONS_COLOR, ICONS_COLOR]}
                />
            ),
            key: CALENDAR,
        },
        {
            label: WORKOUT,
            title: WORKOUT,
            icon: invites?.length ? (
                <Badge
                    className={styles.badge}
                    count={invites.length}
                    size='small'
                    data-test-id='notification-about-joint-training'
                >
                    <HeartFilled className={styles.icon} style={{ color: ICONS_COLOR }} />
                </Badge>
            ) : (
                <HeartFilled className={styles.icon} style={{ color: ICONS_COLOR }} />
            ),
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
            icon: (
                <IdcardTwoTone className={styles.icon} twoToneColor={[ICONS_COLOR, ICONS_COLOR]} />
            ),
            key: PROFILE,
        },
        {
            type: 'divider',
            key: DIVIDER,
        },
        {
            label: EXIT,
            title: EXIT,
            icon: (
                <ExitIcon
                    className={styles.icon}
                    width={16}
                    height={16}
                    alignmentBaseline='central'
                />
            ),
            key: EXIT,
        },
    ];

    const menuOnClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case CALENDAR:
                calendarHandler();
                break;
            case WORKOUT:
                workoutsHandler();
                break;
            case ACHIEVEMENTS:
                achievementsHandler();
                break;
            case PROFILE:
                navigate(ROUTES.PROFILE);
                break;
            case EXIT:
                signout(() => navigate(ROUTES.AUTH));
                break;
            default:
        }
    };

    return (
        <Menu
            selectedKeys={selectedKeys}
            className={styles.menu}
            mode={mode}
            items={menuItems}
            inlineIndent={16}
            onClick={menuOnClick}
        />
    );
};
