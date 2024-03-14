import { Badge } from 'antd';

type TrainingBadgeParams = {
    text: string;
    className?: string;
};

export const TrainingBadge = ({ text, className }: TrainingBadgeParams) => {

    const colors: { [x: string]: string } = {
        Ноги: 'var(--character-light-error)',
        Руки: 'var(--tranie-cyan)',
        Силовая: 'var(--tranie-yellow)',
        Спина: 'var(--tranie-orange)',
        Грудь: 'var(--character-light-success)',
    };

    return <Badge className={className} text={text} color={colors[text]} />;
};
