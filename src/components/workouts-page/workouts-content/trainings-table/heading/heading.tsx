import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import styles from './heading.module.css';

export const Heading = () => {
    const iconsStyle = {
        color: 'var(--character-light-disable-25)',
    };

    return (
        <Flex gap='gap12'>
            <Typography.Text className={styles.trainingText}>Тип тренировки</Typography.Text>

            <div className={styles.sortWrapper}>
                <Flex className={styles.sort} justify='justifyBetween'>
                    <Typography.Text className={styles.sortText}>Периодичность</Typography.Text>
                    <Flex direction='column'>
                        <CaretUpOutlined className={styles.icon} style={iconsStyle} />
                        <CaretDownOutlined className={styles.icon} style={iconsStyle} />
                    </Flex>
                </Flex>
            </div>
        </Flex>
    );
};
