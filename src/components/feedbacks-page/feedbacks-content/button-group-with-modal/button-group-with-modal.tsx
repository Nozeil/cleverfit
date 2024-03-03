import { CloseOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { WIDTH_540 } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeFeedbackModal,
    isFeedbackModalOpenSelector,
    openFeedbackModal,
} from '@redux/slices/feedback-modal';
import { Button, Modal } from 'antd';
import { type ReactNode } from 'react';

import { FORM_NAME } from '../feedback-content.constants';
import styles from './button-group-with-modal.module.css';

type ButtonGroupWithModalProps = {
    children: ReactNode;
    disabled: boolean;
    buttonGroupClassName?: string;
    expendButton?: ReactNode;
};

export const ButtonGroupWithModal = ({
    children,
    disabled,
    buttonGroupClassName,
    expendButton,
}: ButtonGroupWithModalProps) => {
    const isOpen = useAppSelector(isFeedbackModalOpenSelector);
    const dispatch = useAppDispatch();

    const openModal = () => dispatch(openFeedbackModal());
    const closeModal = () => dispatch(closeFeedbackModal());

    return (
        <>
            <Modal
                className={styles.modal}
                open={isOpen}
                centered
                width={WIDTH_540}
                title='Ваш отзыв'
                closeIcon={<CloseOutlined style={{ fontSize: 14 }} />}
                footer={
                    <Button
                        form={FORM_NAME}
                        className={styles.btn}
                        type='primary'
                        size='large'
                        htmlType='submit'
                        disabled={disabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                }
                onCancel={closeModal}
                zIndex={10}
            >
                {children}
            </Modal>

            <Flex
                className={buttonGroupClassName}
                direction={{ sm: 'row', xs: 'column' }}
                align='alignCenter'
                gap={{ sm: 'gap8', xs: 'gap16' }}
            >
                <Button
                    block
                    className={styles.btn}
                    type='primary'
                    size='large'
                    onClick={openModal}
                    data-test-id='write-review'
                >
                    Написать отзыв
                </Button>

                {expendButton}
            </Flex>
        </>
    );
};
