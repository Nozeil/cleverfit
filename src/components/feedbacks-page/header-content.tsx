import { ROUTES } from '@constants/routes';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export const HeaderContent = () => (
    <Breadcrumb>
        <Breadcrumb.Item>
            <Link to={ROUTES.MAIN}>Главная</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Отзывы пользователей</Breadcrumb.Item>
    </Breadcrumb>
);
