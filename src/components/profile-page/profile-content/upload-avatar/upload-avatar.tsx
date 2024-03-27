import { HTTP_STATUS_CODES } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/slices/auth';
import { UPLOAD_IMAGE } from '@services/api.constants';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { type UploadFile, type UploadProps, Form, Grid, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './upload-avatar.module.css';
import { UploadBtn } from './upload-btn/upload-btn';

type UploadAvatarProps = {
    imgSrc?: string;
};

const { useBreakpoint } = Grid;

export const UploadAvatar = ({ imgSrc }: UploadAvatarProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const token = useAppSelector(selectAuthToken);
    const { xs } = useBreakpoint();

    useEffect(() => {
        if (imgSrc) {
            setFileList([
                {
                    uid: uuidv4(),
                    name: 'avatar',
                    url: imgSrc,
                },
            ]);
        }
    }, [imgSrc]);

    const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
        if (file.error?.status === HTTP_STATUS_CODES.CONFLICT) {
            CenteredModalError({
                title: 'Файл слишком большой',
                content: 'Выберите файл размером до 5МБ.',
                okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
            });
        }

        const uploadList: UploadFile[] =
            file.status && file.status !== 'error'
                ? fileList
                : [{ uid: uuidv4(), name: 'image.png', status: 'error' }];

        setFileList(uploadList);
    };

    const listType = xs ? 'picture' : 'picture-card';

    const content = fileList.length >= 1 ? null : <UploadBtn />;

    const label = xs && !fileList.length && (
        <Typography.Text className={styles.uploadLabel}>Загрузить фото профиля:</Typography.Text>
    );

    return (
        <Form.Item
            className={styles.uploadFormItem}
            label={label}
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
                maxCount={1}
                onChange={handleChange}
                itemRender={(originNode) => <div data-test-id='profile-avatar'>{originNode}</div>}
            >
                {content}
            </Upload>
        </Form.Item>
    );
};
