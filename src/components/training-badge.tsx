import { TRAINING_COLORS } from '@constants/index';
import { Badge } from 'antd';

type TrainingBadgeParams = {
    text: string;
    className?: string;
};

export const TrainingBadge = ({ text, className }: TrainingBadgeParams) => (
    <Badge className={className} text={text} color={TRAINING_COLORS[text]} />
);
