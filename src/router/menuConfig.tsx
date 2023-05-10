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
import {Link} from "react-router-dom";

export interface MenuItem{
    id?: number,
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactElement,
    children? : MenuItem[];
}

export const menuItems = [
    {
        key: 'dashboard',
        label: <Link to="/">首页</Link>,
        icon: <PieChartOutlined/>,
    },
    {
        key: 'user',
        label: '用户管理',
        icon: <TeamOutlined/>,
        children: [
            {
                id: 1,
                key: 'account',
                label: <Link to="/user/account">账户管理</Link>,
                icon: <UserOutlined />,
            },
            {
                id: 5,
                key: 'organization',
                label:  <Link to="/user/organization">组织结构</Link>,
                icon: <ApartmentOutlined />,
            },
        ],
    },
    {
        key: 'system',
        label: '系统管理',
        icon: <DesktopOutlined/>,
        children: [
            {
                id: 2,
                key: 'role',
                label: <Link to="/system/role">角色管理</Link>,
                icon: <AuditOutlined />,
            },
            {
                id: 3,
                key: 'permission',
                label: <Link to="/system/permission">权限管理</Link>,
                icon: <ClusterOutlined />,
            },
            {
                id: 7,
                key: 'setting',
                label: <Link to="/system/setting">系统设置</Link>,
                icon: <SettingOutlined />,
            },
        ],
    },
    {
        id: 4,
        key: 'data',
        label: <Link to="/data">数据管理</Link>,
        icon: <BarsOutlined />,
    },
    {
        id: 6,
        key: 'profile',
        label: <Link to="/profile">个人中心</Link>,
        icon: <UserOutlined/>,
    },
];

export function getMenuNodes(items: MenuItem[]): MenuItem[] {
    // @ts-ignore
    return items.map((item: MenuItem) => {
        //有子路由
        if (item.children) {
            const subs = getMenuNodes(item.children).filter(Boolean);
            if (subs.length > 0) {
                return {
                    ...item,
                    children: subs,
                };
            }
        }

        // @ts-ignore
        if (LocalStoreUtil.getPermissionIds().includes(item.id)|| item.path === '/'){
            return item;
        }
    });
}