import { useNavigate } from 'react-router-dom';
import { COMPOUND_ROUTES } from '@constants/routes';
import { ResultCard } from '../result-card/result-card';
import { RESULT_ICON_TYPE_KEYS } from '../auth-page.constants';
import { ResultIcon } from '../result-icon/result-icon';
import { ResultButton } from './result-button/result-button';

export const ErrorUserExist = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(COMPOUND_ROUTES.AUTH_REGISTRATION);

    return (
        <ResultCard
            head={<ResultIcon type={RESULT_ICON_TYPE_KEYS.ERROR} />}
            title='Данные не сохранились'
            text={`Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.`}
        >
            <ResultButton block onClick={onClick} testId='registration-back-button'>
                Назад к регистрации
            </ResultButton>
        </ResultCard>
    );
};
