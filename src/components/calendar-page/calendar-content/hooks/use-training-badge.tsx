import { Badge } from 'antd';

type TrainingBadgeParams = {
    type: 'legs' | 'hands' | 'strength' | 'back' | 'chest' | string;
    text: string;
    className?: string;
};

export const useTrainingBadge = ({ type, text, className }: TrainingBadgeParams) => {
    const colors: { [x: string]: string } = {
        legs: 'var(--character-light-error)',
        hands: 'var(--tranie-cyan)',
        strength: 'var(--tranie-yellow)',
        back: 'var(--tranie-orange)',
        chest: 'var(--character-light-success)',
    };

    return <Badge className={className} text={text} color={colors[type]} />;
};
