import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/slices/auth';
import { UPLOAD_IMAGE } from '@services/api.constants';
import { useGetUserInfoQuery } from '@services/endpoints/user';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { type UploadProps, Button, Form, Grid, Space, Typography, Upload, UploadFile } from 'antd';
import { type RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './upload-avatar.module.css';

const isLt5M = (fileSize: number) => fileSize / 1024 / 1024 < 5;

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLessThen5M = isLt5M(file.size);

    if (!isLessThen5M) {
        CenteredModalError({
            title: 'Файл слишком большой',
            content: 'Выберите файл размером до 5МБ.',
            okText: 'Закрыть',
        });
    }

    return isJpgOrPng && isLessThen5M;
};

const { useBreakpoint } = Grid;

export const UploadAvatar = () => {
    const { data } = useGetUserInfoQuery();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const token = useAppSelector(selectAuthToken);
    const { xs } = useBreakpoint();

    useEffect(() => {
        if (data?.imgSrc) {
            setFileList([{ uid: uuidv4(), name: 'avatar', url: data.imgSrc }]);
        }
    }, [data]);

    const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
        file.status && file.status !== 'error'
            ? setFileList(fileList)
            : setFileList([
                  {
                      uid: uuidv4(),
                      name: 'image.png',
                      status: 'error',
                  },
              ]);
    };

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

    const listType = xs ? 'picture' : 'picture-card';

    const content = fileList.length >= 1 ? null : uploadBtn;

    return (
        <Form.Item
            className={styles.uploadFormItem}
            label={
                xs &&
                !fileList.length && (
                    <Typography.Text className={styles.uploadLabel}>
                        Загрузить фото профиля:
                    </Typography.Text>
                )
            }
            labelCol={{ flex: 'auto' }}
            wrapperCol={{ flex: 'none' }}
            name='upload'
        >
            <Upload
                fileList={fileList}
                action={UPLOAD_IMAGE}
                headers={{ Authorization: `Bearer ${token}` }}
                progress={{
                    className: styles.progress,
                    size: 'small',
                    status: 'active',
                    showInfo: false,
                    strokeWidth: 4,
                    strokeColor: 'var(--primary-light-6)',
                }}
                listType={listType}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {content}
            </Upload>
        </Form.Item>
    );
};
