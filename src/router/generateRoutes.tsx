import { RouteConfig } from 'react-router-config';
import { renderRoutes } from 'react-router-config';
import { useAppStore } from '../store/AppState';
import routesConfig from './routesConfig';

function generateRoutesConfig(routes: RouteConfig[], permissions: number[]): RouteConfig[] {
    return routes.filter((route) => {
        // 判断路由是否有权限，如果没有权限则返回 false
        if (route.id && !permissions.includes(route.id)) {
            return false;
        }
        // 如果该路由有子路由，递归调用该函数来处理子路由
        if (route.routes) {
            route.routes = generateRoutesConfig(route.routes, permissions);
        }
        return true;
    });
}

function generateRoutes() {
    // const { permissions } = useAppStore();
    // const generatedRoutesConfig = generateRoutesConfig(routesConfig, permissions);
    // return <div>{renderRoutes(generatedRoutesConfig)}</div>;
}

export {generateRoutes}