import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { type ReactNode } from 'react';

export const useSidePanelContent = () => {
    const { exercisesFormMode } = useAppSelector(trainingModalSelector);
    const content: { title: string; icon: ReactNode } = {
        title: 'Просмотр упражнений',
        icon: null,
    };

    if (exercisesFormMode === 'new') {
        content.title = 'Добавление упражнений';
        content.icon = <PlusOutlined />;
    } else if (exercisesFormMode === 'edit') {
        content.title = 'Редактирование';
        content.icon = <EditOutlined />;
    }

    return content;
};
