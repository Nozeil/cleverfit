import { CalendarTwoTone, HeartFilled, IdcardTwoTone } from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import { useCalendarHandler } from '@hooks/useCalendarHandler';
import { Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ActionCard } from './action-card';
import styles from './action-cards.module.css';
import type { ActionCardProps } from './action-cards.types';

const color = 'var(--primary-light-6)';

export const ActionCards = () => {
    const navigate = useNavigate();
    const calendarHandler = useCalendarHandler(navigate);

    const cards: ActionCardProps[] = [
        {
            title: 'Расписать тренировки',
            buttonIcon: <HeartFilled style={{ color: color }} />,
            buttonContent: 'Тренировки',
        },
        {
            title: 'Назначить календарь',
            buttonIcon: <CalendarTwoTone twoToneColor={[color, color]} />,
            buttonContent: 'Календарь',
            testId: 'menu-button-calendar',
            onClick: () => calendarHandler(),
        },
        {
            title: 'Заполнить профиль',
            buttonIcon: <IdcardTwoTone twoToneColor={[color, color]} />,
            buttonContent: 'Профиль',
            testId: 'menu-button-profile',
            onClick: () => navigate(ROUTES.PROFILE),
        },
    ];

    return (
        <Row className={styles.row} gutter={16}>
            {cards.map(({ title, buttonIcon, buttonContent, testId, onClick }) => (
                <ActionCard
                    key={title}
                    title={title}
                    buttonIcon={buttonIcon}
                    buttonContent={buttonContent}
                    testId={testId}
                    onClick={onClick}
                />
            ))}
        </Row>
    );
};
