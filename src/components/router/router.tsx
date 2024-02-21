import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page/main-page';
import { MainPageLayout } from '@components/main-page-layout/main-page-layout';
import AppLayout from '@components/app-layout/app-layout';
import AuthPage from '@pages/auth/auth';
import LoginForm from '@components/auth-page/auth-forms/login-form/login-form';
import RegistartionForm from '@components/auth-page/auth-forms/registration-form/registration-form';
import { ROUTES } from '@constants/routes';
import ErrorLogin from '@components/auth-page/auth-result/error-login';
import AuthPageContent from '@components/auth-page/auth-page-content/auth-page-content';
import SuccessRegistration from '@components/auth-page/auth-result/success-registration';
import ErrorUserExist from '@components/auth-page/auth-result/error-user-exist';
import ErrorRegistration from '@components/auth-page/auth-result/error-registration';
import AuthProvider from '@components/auth/auth-provider';
import AuthRoute from '@components/auth-route';
import NonAuthRoute from '@components/non-auth-route';

const routes = (
    <Routes>
        <Route element={<AppLayout />}>
            <Route
                element={
                    <NonAuthRoute>
                        <AuthPage />
                    </NonAuthRoute>
                }
            >
                <Route path={ROUTES.AUTH} element={<AuthPageContent />}>
                    <Route index element={<LoginForm />} />
                    <Route path={ROUTES.REGISTRATION} element={<RegistartionForm />} />
                </Route>

                <Route path={ROUTES.RESULT}>
                    <Route path={ROUTES.ERROR_LOGIN} element={<ErrorLogin />} />
                    <Route path={ROUTES.SUCCESS_REGISTRATION} element={<SuccessRegistration />} />
                    <Route path={ROUTES.ERROR_USER_EXIST} element={<ErrorUserExist />} />
                    <Route path={ROUTES.ERROR_REGISTRATION} element={<ErrorRegistration />} />
                </Route>
            </Route>

            <Route
                path={ROUTES.MAIN}
                element={
                    <AuthRoute>
                        <MainPageLayout />
                    </AuthRoute>
                }
            >
                <Route index element={<MainPage />} />
            </Route>
        </Route>
    </Routes>
);

export const Router = () => (
    <AuthProvider>
        <HistoryRouter history={history}>{routes}</HistoryRouter>
    </AuthProvider>
);
