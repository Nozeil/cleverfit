import { useNavigate } from 'react-router-dom';
import { WarningFilled } from '@ant-design/icons';
import ResultCard from './result-card/result-card';
import { ROUTES } from '@constants/routes';

import styles from './auth-result.module.css';

const ErrorLogin = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.AUTH, { replace: true });

    return (
        <ResultCard
            icon={
                <WarningFilled
                    className={styles.icon}
                    style={{ color: 'var(--character-light-warning)', fontSize: '71px' }}
                />
            }
            title='Вход не выполнен'
            text='Что-то пошло не так. Попробуйте еще раз'
            btnText='Повторить'
            onClick={onClick}
        />
    );
};

export default ErrorLogin;
