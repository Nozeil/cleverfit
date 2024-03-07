import { CalendarTwoTone, HeartFilled, IdcardTwoTone } from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import { Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ActionCard } from './action-card';
import styles from './action-cards.module.css';
import type { ActionCardProps } from './action-cards.types';

const color = 'var(--primary-light-6)';

export const ActionCards = () => {
    const navigate = useNavigate();

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
            onClick: () => navigate(ROUTES.CALENDAR),
        },
        {
            title: 'Заполнить профиль',
            buttonIcon: <IdcardTwoTone twoToneColor={[color, color]} />,
            buttonContent: 'Профиль',
        },
    ];

    return (
        <Row className={styles.row} gutter={16}>
            {cards.map(({ title, buttonIcon, buttonContent, onClick }) => (
                <ActionCard
                    key={title}
                    title={title}
                    buttonIcon={buttonIcon}
                    buttonContent={buttonContent}
                    onClick={onClick}
                />
            ))}
        </Row>
    );
};
