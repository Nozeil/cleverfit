import { WarningTwoTone } from '@ant-design/icons';
import ResultCard from './result-card/result-card';

import styles from './auth-result.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

const color = 'var(--character-light-warning)';

const ErrorLogin = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.AUTH);

    return (
        <ResultCard
            icon={
                <WarningTwoTone
                    className={styles.icon}
                    twoToneColor={[color, color]}
                    style={{ fontSize: '71px' }}
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
