import { CloseOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { WIDTH_540 } from '@constants/index';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import { FORM_NAME } from '../feedback-content.constants';
import { FeedbackForm } from '../feedback-form/feedback-form';
import styles from './button-group-with-modal.module.css';

type ButtonGroupWithModalProps = {
    buttonGroupClassName?: string;
    expendButton?: boolean;
    expendBtnText?: string;
    expendOnClick?: () => void;
};

export const ButtonGroupWithModal = ({
    buttonGroupClassName,
    expendButton,
    expendBtnText,
    expendOnClick,
}: ButtonGroupWithModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Modal
                className={styles.modal}
                open={isModalOpen}
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
                        disabled={isSubmitDisabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                }
                onCancel={closeModal}
                zIndex={10}
            >
                <FeedbackForm
                    disableSubmit={(disabled) => setIsSubmitDisabled(disabled)}
                    openModal={openModal}
                    closeModal={closeModal}
                />
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

                {expendButton && (
                    <Button
                        block
                        type='link'
                        size='large'
                        onClick={expendOnClick}
                        data-test-id='all-reviews-button'
                    >
                        {expendBtnText}
                    </Button>
                )}
            </Flex>
        </>
    );
};
