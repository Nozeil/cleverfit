import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled } from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import ResultCard from './result-card/result-card';

import styles from './auth-result.module.css';

const SuccessRegistration = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.AUTH, { replace: true });

    return (
        <ResultCard
            icon={
                <CheckCircleFilled
                    className={styles.icon}
                    style={{ color: 'var(--character-light-success)', fontSize: '71px' }}
                />
            }
            title='Регистрация успешна'
            text={`Регистрация прошла успешно. Зайдите
в приложение, используя свои e-mail и пароль.`}
            btnText='Войти'
            onClick={onClick}
        />
    );
};

export default SuccessRegistration;
