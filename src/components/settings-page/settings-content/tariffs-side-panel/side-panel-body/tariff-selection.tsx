import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import styles from './side-panel-body.module.css';
import { TariffSelectionForm } from './tariff-selection-form/tariff-selection-form';

export const TariffSelection = () => (
    <Flex direction='column' gap={{ xs: 'gap12', sm: 'gap24' }}>
        <Typography.Title className={styles.tariffSelectionTitle} level={5}>
            Стоимость тарифа
        </Typography.Title>
        <TariffSelectionForm />
    </Flex>
);
