import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Form, Input, Rate } from 'antd';

import { FORM_NAME } from '../feedback-content.constants';
import styles from './feedback-form.module.css';

type FeedbackFormProps = {
    disableSubmit: (disable: boolean) => void;
};

export const FeedbackForm = ({ disableSubmit }: FeedbackFormProps) => {
    const [form] = Form.useForm();
    const rating = 'rating';

    const onFieldsChange = () => {
        const hasErrors =
            form.getFieldsError().some(({ errors }) => errors.length) ||
            !form.getFieldValue(rating);

        disableSubmit(hasErrors);
    };

    return (
        <Form
            form={form}
            name={FORM_NAME}
            layout='vertical'
            onFieldsChange={onFieldsChange}
            onFinish={(values) => console.log(values)}
        >
            <Form.Item
                className={styles.formItem}
                name={rating}
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
    );
};
