import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { Checkbox, Col, Form, Grid, Input, InputNumber, Row, Typography } from 'antd';

import styles from './exercise.module.css';

const { useBreakpoint } = Grid;

type ExerciseProps = {
    id: string | number;
    name?: string;
    replays?: number;
    weight?: number;
    approaches?: number;
    isImplementation?: boolean;

};

export const Exercise = ({ id, name, replays, weight, approaches,  }: ExerciseProps) => {
    const { exercisesFormMode } = useAppSelector(trainingModalSelector);
    const { xs } = useBreakpoint();

    const approachColWidth = 120;
    const gutter = { xs: 16, sm: 32 };
    const approachColFlex = xs ? approachColWidth + gutter.xs : approachColWidth + gutter.sm;

    return (
        <Row gutter={[0, 8]}>
            <Form.Item name={[id, 'id']} initialValue={id} noStyle hidden>
                <Input />
            </Form.Item>
            <Form.Item name={[id, 'name']} initialValue={name} noStyle>
                <Input
                    className={styles.input}
                    placeholder='Упражнение'
                    addonAfter={
                        exercisesFormMode === 'new' ? null : (
                            <Form.Item name={[id, 'shouldDelete']} noStyle valuePropName='checked'>
                                <Checkbox />
                            </Form.Item>
                        )
                    }
                />
            </Form.Item>
            <Row gutter={gutter} wrap={false}>
                <Col flex={`${approachColFlex}px`}>
                    <Row gutter={[0, 6]}>
                        <Typography.Text className={styles.text}>Подходы</Typography.Text>
                        <Form.Item name={[id, 'approaches']} initialValue={approaches} noStyle>
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

                                <Form.Item name={[id, 'weight']} initialValue={weight} noStyle>
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

                                <Form.Item name={[id, 'replays']} initialValue={replays} noStyle>
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
