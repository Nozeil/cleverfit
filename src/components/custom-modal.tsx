import { Modal } from 'antd';
import { type ReactNode } from 'react';

interface CustomModalProps {
    open: boolean;
    children: ReactNode;
}

export const CustomModal = ({ open, children }: CustomModalProps) => {
    return (
        <Modal open={open} closable={false} centered width={540} footer={null}>
            {children}
        </Modal>
    );
};
