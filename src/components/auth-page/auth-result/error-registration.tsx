import { useLocation, useNavigate } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';
import { COMPOUND_ROUTES } from '@constants/routes';
import ResultCard from './result-card/result-card';

import styles from './auth-result.module.css';

const ErrorRegistration = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = () =>
        navigate(COMPOUND_ROUTES.AUTH_REGISTRATION, { replace: true, state: location.state });

    return (
        <ResultCard
            icon={
                <CloseCircleFilled
                    className={styles.icon}
                    style={{ color: 'var(--character-light-error)', fontSize: '71px' }}
                />
            }
            title='Данные не сохранились'
            text={`Что-то пошло не так и ваша регистрация 
не завершилась. Попробуйте ещё раз.`}
            btnText='Повторить'
            onClick={onClick}
        />
    );
};

export default ErrorRegistration;
