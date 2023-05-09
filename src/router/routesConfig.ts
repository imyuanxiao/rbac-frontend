// routesConfig.ts

import { RouteConfig } from 'react-router-config';
import DefaultLayout from "../layout/DefaultLayout";
import LoginPage from "../pages/LoginPage";

const routesConfig: RouteConfig[] = [
    {
        path: '/',
        component: DefaultLayout,
        exact: true,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    // ...
];

export default routesConfig;
