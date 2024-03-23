import { CenteredModalError } from '@utils/modal-error/modal-error';
import { type RcFile } from 'antd/lib/upload';

export const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isLt5M) {
        CenteredModalError({
            title: 'Файл слишком большой',
            content: 'Выберите файл размером до 5МБ.',
            okText: 'Закрыть',
        });
    }

    return isJpgOrPng && isLt5M;
};
