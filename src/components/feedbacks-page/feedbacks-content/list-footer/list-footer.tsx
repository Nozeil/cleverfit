import { CloseOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import { FORM_NAME } from '../feedback-content.constants';
import { FeedbackForm } from '../feedback-form/feedback-form';
import styles from './list-footer.module.css';

type ListFooterProps = {
    expendBtnText: string;
    expendOnClick: () => void;
};

export const ListFooter = ({ expendBtnText, expendOnClick }: ListFooterProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    return (
        <>
            <Modal
                className={styles.modal}
                open={isModalOpen}
                centered
                width={540}
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
                    >
                        Опубликовать
                    </Button>
                }
                onCancel={() => setIsModalOpen(false)}
            >
                <FeedbackForm disableSubmit={(disabled) => setIsSubmitDisabled(disabled)} />
            </Modal>

            <Flex
                className={styles.flex}
                direction={{ sm: 'row', xs: 'column' }}
                align='alignCenter'
                gap={{ sm: 'gap8', xs: 'gap16' }}
            >
                <Button
                    block
                    className={styles.btn}
                    type='primary'
                    size='large'
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    Написать отзыв
                </Button>
                <Button block type='link' size='large' onClick={expendOnClick}>
                    {expendBtnText}
                </Button>
            </Flex>
        </>
    );
};
