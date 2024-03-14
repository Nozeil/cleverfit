import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Grid, Input, InputNumber, Row, Typography } from 'antd';

import styles from './exercise.module.css';

const { useBreakpoint } = Grid;

type ExerciseProps = {
    id: number;
};

export const Exercise = ({ id }: ExerciseProps) => {
    const { xs } = useBreakpoint();

    const approachColWidth = 120;
    const gutter = { xs: 16, sm: 32 };
    const approachColFlex = xs ? approachColWidth + gutter.xs : approachColWidth + gutter.sm;

    return (
        <Row gutter={[0, 8]}>
            <Form.Item name={[id, 'id']} initialValue={id} noStyle hidden>
                <Input />
            </Form.Item>
            <Form.Item name={[id, 'name']} noStyle>
                <Input className={styles.input} placeholder='Упражнение' />
            </Form.Item>
            <Row gutter={gutter} wrap={false}>
                <Col flex={`${approachColFlex}px`}>
                    <Row gutter={[0, 6]}>
                        <Typography.Text className={styles.text}>Подходы</Typography.Text>
                        <Form.Item name={[id, 'approaches']} noStyle>
                            <InputNumber
                                className={styles.input}
                                addonBefore={<PlusOutlined />}
                                placeholder='1'
                                min={1}
                            />
                        </Form.Item>
                    </Row>
                </Col>
                <Col flex='auto'>
                    <Row justify='end' wrap={false}>
                        <Col flex='89px'>
                            <Row gutter={[0, 6]}>
                                <Typography.Text className={styles.text}>Вес, кг</Typography.Text>

                                <Form.Item name={[id, 'weight']} noStyle>
                                    <InputNumber className={styles.input} placeholder='0' min={0} />
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

                                <Form.Item name={[id, 'replays']} noStyle>
                                    <InputNumber className={styles.input} placeholder='3' min={1} />
                                </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    );
};
