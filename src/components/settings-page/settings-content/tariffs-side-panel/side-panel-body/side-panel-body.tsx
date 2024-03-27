import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import { ComparisonList } from './comparison-list/comparison-list';
import styles from './side-panel-body.module.css';
import { TariffSelection } from './tariff-selection';

export const SidePanelBody = () => (
    <Flex className={styles.sidePanelBody} direction='column' gap='gap24'>
        <Flex direction='column' gap={{ xs: 'gap12', sm: 'gap24' }}>
            <Flex justify='justifyEnd' gap='gap14'>
                <div className={styles.tariffLabelFree}>
                    <Typography.Text>FREE</Typography.Text>
                </div>

                <div className={styles.tariffLabelPro}>
                    <Typography.Text className={styles.proTariffLabelText}>PRO</Typography.Text>
                </div>
            </Flex>

            <ComparisonList />
            <TariffSelection />
        </Flex>
    </Flex>
);
