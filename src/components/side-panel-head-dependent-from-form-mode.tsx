import { type ReactNode } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { SidePanelHead } from '@components/side-panel-head/side-panel-head';
import { EXERCISES_FORM_MODES } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';

type SidePanelHeadDependentFromFormModeProps = {
    fallbackTitle: string;
    fallbackIcon: ReactNode;
    onClose: () => void;
};

const { NEW, EDIT } = EXERCISES_FORM_MODES;

export const SidePanelHeadDependentFromFormMode = ({
    fallbackIcon,
    fallbackTitle,
    onClose,
}: SidePanelHeadDependentFromFormModeProps) => {
    const formMode = useAppSelector(exercisesFormModeSelector);
    const content: { title: string; icon: ReactNode } = {
        title: fallbackTitle,
        icon: fallbackIcon,
    };

    if (formMode === NEW) {
        content.title = 'Добавление упражнений';
        content.icon = <PlusOutlined />;
    } else if (formMode === EDIT) {
        content.title = 'Редактирование';
        content.icon = <EditOutlined />;
    }

    return <SidePanelHead title={content.title} icon={content.icon} onClose={onClose} />;
};
