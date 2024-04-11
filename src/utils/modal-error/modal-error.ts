import { type ModalFuncProps, Modal } from 'antd';

import styles from './modal-error.module.css';

export const CenteredModalError = (props?: ModalFuncProps) => {
    Modal.error({
        centered: true,
        autoFocusButton: null,
        title: 'При сохранении данных произошла ошибка',
        content: 'Придётся попробовать ещё раз',
        okText: 'Закрыть',
        okButtonProps: {
            className: styles.modalOkBtn,
        },
        maskStyle: { backgroundColor: 'var(--blue-2)' },
        ...props,
    });
};
