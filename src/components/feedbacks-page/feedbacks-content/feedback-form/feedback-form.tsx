import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useCreateFeedbackMutation } from '@services/api';
import { Form, Input, Rate } from 'antd';
import { useState } from 'react';

import { FORM_NAME } from '../feedback-content.constants';
import { ModalError } from '../modal-error/modal-error';
import { ModalSuccess } from '../modal-success';
import styles from './feedback-form.module.css';
import type { FeedbackFormProps, OnFinishFeedbackValues } from './feedback-form.types';

export const FeedbackForm = ({ disableSubmit, openModal, closeModal }: FeedbackFormProps) => {
    const [trigger] = useCreateFeedbackMutation();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [form] = Form.useForm();

    const rateItemName = 'rating';

    const onFieldsChange = () => {
        const hasErrors =
            form.getFieldsError().some(({ errors }) => errors.length) ||
            !form.getFieldValue(rateItemName);

        disableSubmit(hasErrors);
    };

    const onFinish = async (values: OnFinishFeedbackValues) => {
        try {
            await trigger(values).unwrap();
            setIsSuccessModalOpen(true);
            form.resetFields();
            closeModal();
        } catch {
            setIsErrorModalOpen(true);
            closeModal();
        }
    };

    const openSuccessModal = () => setIsSuccessModalOpen(false);

    const onClose = () => setIsErrorModalOpen(false);

    const onRepeat = () => {
        onClose();
        openModal();
    };

    return (
        <>
            <ModalSuccess open={isSuccessModalOpen} onClick={openSuccessModal} />
            <ModalError open={isErrorModalOpen} onClose={onClose} onRepeat={onRepeat} />
            <Form
                form={form}
                name={FORM_NAME}
                layout='vertical'
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
            >
                <Form.Item
                    className={styles.formItem}
                    name={rateItemName}
                    rules={[{ required: true, message: '' }]}
                >
                    <Rate
                        className={styles.rate}
                        character={({ index, value }) => {
                            if (index !== undefined && value !== undefined) {
                                return value > index ? <StarFilled /> : <StarOutlined />;
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item name='message' noStyle>
                    <Input.TextArea
                        placeholder='Напишите, что вам понравилось или не понравилось в нашем приложении, и как мы можем его улучшить'
                        autoSize
                        className={styles.textarea}
                        size='middle'
                    />
                </Form.Item>
            </Form>
        </>
    );
};
