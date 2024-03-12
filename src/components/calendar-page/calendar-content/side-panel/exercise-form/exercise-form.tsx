import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Grid, Input, InputNumber, Row, Typography } from 'antd';

import styles from './exercise-form.module.css';

const { useBreakpoint } = Grid;

export const ExerciseForm = () => {
    const { xs } = useBreakpoint();

    const approachColWidth = 120;
    const gutter = { xs: 16, sm: 32 };
    const approachColFlex = xs ? approachColWidth + gutter.xs : approachColWidth + gutter.sm;

    return (
        <Form
            className={styles.form}
            name='exercise-form'
            size='small'
            onFinish={(values) => console.log(values)}
        >
            <Row gutter={[0, 8]}>
                <Form.Item name='name' noStyle>
                    <Input className={styles.input} placeholder='Упражнение' />
                </Form.Item>
                <Row gutter={gutter} wrap={false}>
                    <Col flex={`${approachColFlex}px`}>
                        <Row gutter={[0, 6]}>
                            <Typography.Text className={styles.text}>Подходы</Typography.Text>
                            <Form.Item name='approach' noStyle>
                                <InputNumber
                                    className={styles.input}
                                    addonBefore={<PlusOutlined />}
                                    min={1}
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col flex='auto'>
                        <Row justify='end'>
                            <Col flex='89px'>
                                <Row gutter={[0, 6]}>
                                    <Typography.Text className={styles.text}>
                                        Вес, кг
                                    </Typography.Text>

                                    <Form.Item name='weight' noStyle>
                                        <InputNumber
                                            className={styles.input}
                                            placeholder='0'
                                            min={0}
                                        />
                                    </Form.Item>
                                </Row>
                            </Col>

                            <Col>
                                <Row className={styles.xRow} align='bottom'>
                                    <Typography.Text className={styles.x} disabled>
                                        x
                                    </Typography.Text>
                                </Row>
                            </Col>

                            <Col flex='89px'>
                                <Row gutter={[0, 6]}>
                                    <Typography.Text className={styles.text}>
                                        Количество
                                    </Typography.Text>

                                    <Form.Item name='replays' noStyle>
                                        <InputNumber
                                            className={styles.input}
                                            placeholder='3'
                                            min={1}
                                        />
                                    </Form.Item>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>

            <div className={styles.btnWrapper}>
                <Button
                    className={styles.btn}
                    block
                    icon={<PlusOutlined />}
                    htmlType='submit'
                    size='middle'
                    type='link'
                >
                    Добавить еще
                </Button>
            </div>
        </Form>
    );
};
