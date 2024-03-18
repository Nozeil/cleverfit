import { Modal, ModalProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './modal-with-shadow-md.module.css';

const cx = classNames.bind(styles);

export const ModalWithShadowMd = ({ className, ...props }: ModalProps) => (
    <Modal className={cx(styles.modal, className)} {...props} />
);
