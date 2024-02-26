import { Row } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardTwoTone } from '@ant-design/icons';
import { ActionCard } from './action-card';

import type { ActionCardProps } from './action-cards.types';

import styles from './action-cards.module.css';

const color = 'var(--primary-light-6)';
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
    },
    {
        title: 'Заполнить профиль',
        buttonIcon: <IdcardTwoTone twoToneColor={[color, color]} />,
        buttonContent: 'Профиль',
    },
];

export const ActionCards = () => (
    <Row className={styles.row} gutter={16}>
        {cards.map((card) => (
            <ActionCard
                key={card.title}
                title={card.title}
                buttonIcon={card.buttonIcon}
                buttonContent={card.buttonContent}
            />
        ))}
    </Row>
);
