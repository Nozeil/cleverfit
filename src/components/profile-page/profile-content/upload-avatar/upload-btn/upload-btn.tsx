import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Grid, Space, Typography } from 'antd';

import styles from './upload-btn.module.css';

const { useBreakpoint } = Grid;

export const UploadBtn = () => {
    const { xs } = useBreakpoint();

    const uploadBtn = xs ? (
        <Button
            className={styles.uploadBtn}
            icon={<UploadOutlined style={{ color: 'var(--character-light-disable-25)' }} />}
        >
            Загрузить
        </Button>
    ) : (
        <Space direction='vertical'>
            <PlusOutlined />
            <Typography.Paragraph className={styles.uploadText}>
                {`Загрузить фото \u00a0 профиля`}
            </Typography.Paragraph>
        </Space>
    );

    return uploadBtn;
};
