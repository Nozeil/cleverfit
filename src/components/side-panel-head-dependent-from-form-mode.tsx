import { type ReactNode } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { SidePanelHead } from '@components/side-panel-head/side-panel-head';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';

type SidePanelHeadDependentFromFormModeProps = {
    fallbackTitle: string;
    fallbackIcon: ReactNode;
    newTitle: string;
    editTitle: string;
    onClose: () => void;
};

export const SidePanelHeadDependentFromFormMode = ({
    fallbackIcon,
    fallbackTitle,
    newTitle,
    editTitle,
    onClose,
}: SidePanelHeadDependentFromFormModeProps) => {
    const formMode = useAppSelector(exercisesFormModeSelector);
    const content: { title: string; icon: ReactNode } = {
        title: fallbackTitle,
        icon: fallbackIcon,
    };

    if (formMode === 'new') {
        content.title = newTitle;
        content.icon = <PlusOutlined />;
    } else if (formMode === 'edit') {
        content.title = editTitle;
        content.icon = <EditOutlined />;
    }

    return <SidePanelHead title={content.title} icon={content.icon} onClose={onClose} />;
};
