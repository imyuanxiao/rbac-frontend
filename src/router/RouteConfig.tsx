import {
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    SettingOutlined,
    BarsOutlined,
    UserOutlined,
    ApartmentOutlined,
    ClusterOutlined,
    AuditOutlined
} from '@ant-design/icons';
import React from "react";
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {Link, Route} from "react-router-dom";
import Index from "../pages/index/Index";
import Profile from "../pages/profile/Profile";
import Data from "../pages/data/Data";
import Setting from "../pages/system/Setting";
import Permission from "../pages/system/Permission";
import SystemRole from "../pages/system/role/SystemRole";
import Organization from "../pages/user/Organization";
import Account from "../pages/user/user/Account";

export interface RouteItem {
    id?: number,
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactElement,
    element?: React.ReactNode,
    children? : RouteItem[];
}

/**
 * 所有菜单配置
 * key为硬编码路由
 */
export const routeItems = [
    {
        key: '/index',
        label: <Link to="/index">route_config_index</Link>,
        icon: <PieChartOutlined/>,
        element: <Index/>
    },
    {
        key: '/user',
        label: 'route_config_user',
        icon: <TeamOutlined/>,
        children: [
            {
                id: 1,
                key: '/user/account',
                label: <Link to="/user/account">route_config_user_account</Link>,
                icon: <UserOutlined />,
                element: <Account/>,
            },
            {
                id: 2,
                key: '/user/organization',
                label:  <Link to="/user/organization">route_config_user_organization</Link>,
                icon: <ApartmentOutlined />,
                element:  <Organization/>,
            },
        ],
    },
    {
        key: '/system',
        label: 'route_config_system',
        icon: <DesktopOutlined/>,
        children: [
            {
                id: 3,
                key: '/system/role',
                label: <Link to="/system/role">route_config_system_role</Link>,
                icon: <AuditOutlined />,
                element: <SystemRole/>,
            },
            {
                id: 4,
                key: '/system/permission',
                label: <Link to="/system/permission">route_config_system_permission</Link>,
                icon: <ClusterOutlined />,
                element: <Permission/>,
            },
            {
                id: 5,
                key: '/system/setting',
                label: <Link to="/system/setting">route_config_system_setting</Link>,
                icon: <SettingOutlined />,
                element: <Setting/>
            },
        ],
    },
    {
        id: 6,
        key: '/data',
        label: <Link to="/data">route_config_data</Link>,
        icon: <BarsOutlined />,
        element: <Data/>,
    },
    {
        id: 7,
        key: '/profile',
        label: <Link to="/profile">route_config_profile</Link>,
        icon: <UserOutlined/>,
        element: <Profile/>,

    },
];

/**
 * 根据用户权限，导出仅在权限范围内的菜单
 * @param items
 */
export function getFilteredMenu(items: RouteItem[]): RouteItem[] {
    // @ts-ignore
    return items.map((item: RouteItem) => {
        //有子路由
        if (item.children) {
            const subs = getFilteredMenu(item.children).filter(Boolean);
            if (subs.length > 0) {
                return {
                    ...item,
                    children: subs,
                };
            }
        }
        // @ts-ignore
        if (LocalStoreUtil.getMyPermissionIds().includes(item.id) || item.key === '/index'){
            return item;
        }
    });
}

/**
 * 根据当前路由，找到应展开的父菜单的路由
 *
 * @param menuItems
 * @param route
 */
export function findTopLevelParentKeys(menuItems: RouteItem[], route: string): string[] {
    const parentKeys: string[] = [];
    const traverseMenuItems = (items: RouteItem[]) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if(!item){
                continue;
            }
            if (item.key === route) {
                return;
            }
            if (item.children) {
                traverseMenuItems(item.children);
                if (item.children.some(child => child.key === route)) {
                    parentKeys.push(item.key as string);
                }
            }
        }
    };

    traverseMenuItems(menuItems);
    return parentKeys;
}


/**
 * 根据用户权限，导出仅在权限范围内的路由页面
 * @param routeItems
 */
    // @ts-ignore
export const getFilteredPage = (routeItems: RouteItem[]) => (
    // eslint-disable-next-line
    routeItems.map(item => {
        // 有子路由
        if (item.children) {
            return (
                getFilteredPage(item.children)
            )
        }
        if (item.element) {
            // 无子路由
            return (
                // 判断权限
                (LocalStoreUtil.getMyPermissionIds().includes(item.id) || item.key === '/index') &&
                <Route path={item.key as string} element={item.element} key={item.key}/>
            );
        }

    })
)


/**
 * 根据用户权限，导出仅在权限范围内的路由
 * @param routeItems
 */
export const getFilteredPath = (routeItems: RouteItem[]): string[] => {
    const filteredPaths: string[] = [];

    routeItems.forEach((item: RouteItem) => {
        if (item.children) {
            const childPaths = getFilteredPath(item.children);
            filteredPaths.push(...childPaths);
        }

        if (item.element && item.key) {
            filteredPaths.push(item.key as string);
        }
    });

    return filteredPaths;
};


export interface PathItem {
    key: string,
    label: string,
    redirect?: string,
    children?: PathItem[]
}

/**
 * 提取路由和对应的名字，用于快速路由查找和面包屑生成
 * @param routeItems
 */
export const buildPathItems = (routeItems: RouteItem[]): PathItem[] => {
    return routeItems.map((item: RouteItem) => {
        const pathItem: PathItem = {
            key: item.key as string,
            label: extractTextFromLabel(item.label),
        };
        if (item.children) {
            const childPathItems = buildPathItems(item.children);
            const firstChildWithoutChildren = item.children.find((child) => !child.children);

            if (firstChildWithoutChildren) {
                pathItem.redirect = firstChildWithoutChildren.key as string;
                pathItem.children = childPathItems;
            } else {
                pathItem.children = childPathItems;
            }
        }

        return pathItem;
    });
};


/**
 * 从label中提取路由信息
 * @param label
 */
function extractTextFromLabel(label: any) {
    // 如果 label 是 React 元素，将其子元素提取为文本
    if (React.isValidElement(label)) {
        let text = '';

        // @ts-ignore
        React.Children.forEach(label.props.children, child => {
            if (typeof child === 'string') {
                text += child;
            }
        });

        return text;
    }
    return label;
}

/**
 * 在本地存储中寻找合法的路由
 * @param path
 * @param items
 */
export const findPathByKey = (path: string, items: PathItem[]): string => {
    for (const item of items) {
        // 有children
        if (item.children) {
            const redirectKey = findPathByKey(path, item.children);
            if (redirectKey !== '/404') {
                return redirectKey;
            }
        }
        // 无children
        if(item.key == path){
            return item.redirect ? item.redirect : item.key;
        }
    }
    return '/404';
};

/**
 * 在本地存储中寻找合法的pathItem
 * @param path
 * @param items
 */
export const findPathItemByPath = (path: string, items: PathItem[]): PathItem | null => {
    for (const item of items) {
        // 有children
        if (item.children) {
            const result = findPathItemByPath(path, item.children);
            if (result !== null) {
                 return result;
            }
        }
        // 无children
        if(item.key == path){
            return item;
        }
    }
    return null;
};