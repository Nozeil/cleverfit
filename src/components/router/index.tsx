
import { AppLayout } from '@components/app-layout';
import { MainPage } from '@pages/main-page';

import {
    createRoutesFromElements,
    Route,
    createHashRouter,
    RouterProvider,
} from 'react-router-dom';

const routes = createRoutesFromElements(
    <Route element={<AppLayout />}>
        <Route index path='/' element={<MainPage />} />
    </Route>,
);

const router = createHashRouter(routes);

export const Router = () => {
    return <RouterProvider router={router} />;
};
