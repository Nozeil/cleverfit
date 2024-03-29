import { type UploadFile } from 'antd';

export type FormValues = {
    email: string;
    upload?: { file: UploadFile; fileList: UploadFile[] };
    firstName?: string;
    lastName?: string;
    birthday?: moment.Moment;
    password?: string;
    'password-confirm'?: string;
};
