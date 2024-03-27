import { Flex } from '@components/flex/flex';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { enableTariffsSidePanelSubmit } from '@redux/slices/tariffs-side-panel';
import { useGetTariffListQuery } from '@services/endpoints/catalogs';
import { type RadioChangeEvent, Form, Radio } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FORM_NAME } from '../../tariffs-side-panel.constants';
import styles from '../side-panel-body.module.css';
import { RadioItem } from './radio-item/radio-item';

export const TariffSelectionForm = () => {
    const [radioValue, setRadioValue] = useState(0);
    const dispatch = useAppDispatch();

    const { data } = useGetTariffListQuery();

    const onFinish = (values) => {
        console.log('submit', values);
    };

    const onChange = (e: RadioChangeEvent) => {
        dispatch(enableTariffsSidePanelSubmit());
        setRadioValue(e.target.value);
    };

    return (
        data && (
            <Form name={FORM_NAME} onFinish={onFinish}>
                <Form.Item name='days' noStyle>
                    <Radio.Group
                        className={styles.radioGroup}
                        value={radioValue}
                        onChange={onChange}
                    >
                        <Flex
                            className={styles.tariffSelectionList}
                            direction='column'
                            gap={{ xs: 'gap4', sm: 'gap16' }}
                        >
                            {data.at(0)?.periods.map(({ text, cost, days }) => (
                                <RadioItem key={uuidv4()} text={text} cost={cost} days={days} />
                            ))}
                        </Flex>
                    </Radio.Group>
                </Form.Item>
            </Form>
        )
    );
};
