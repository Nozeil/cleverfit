import { useSetMenuKey } from '@hooks/use-set-menu-key';

export const WorkoutsPage = () => {
    useSetMenuKey('Тренировки');

    return <div>Workouts</div>;
};
