import { Row } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardTwoTone } from '@ant-design/icons';
import ActionCard from './ActionCard';

import type { ActionCardProps } from './index.types';

import './index.css';

const color = 'var(--primary-light-6)';
const cards: ActionCardProps[] = [
    {
        title: 'Расписать тренировки',
        buttonIcon: <HeartFilled style={{ color: color }} />,
        buttonContent: 'Тренировки',
    },
    {
        title: 'Назначить календарь',
        buttonIcon: <CalendarTwoTone twoToneColor={color} />,
        buttonContent: 'Календарь',
    },
    {
        title: 'Заполнить профиль',
        buttonIcon: <IdcardTwoTone twoToneColor={color} />,
        buttonContent: 'Профиль',
    },
];

const ActionCards = () => {
    return (
        <Row gutter={16}>
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
};

export default ActionCards;
