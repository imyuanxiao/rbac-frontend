import React from "react";
import {Link} from "react-router-dom";
import {
    ApartmentOutlined,
    AuditOutlined, BarsOutlined, ClusterOutlined,
    DesktopOutlined,
    PieChartOutlined, SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import Index from "../pages/index/Index";

export interface PageItem{
    id?: number,
    path: React.Key,
    element: React.ReactNode,
    icon?: React.ReactElement,
}

// <Route path="/index" element={<Index/>}/>
export const pageItems = [
    {
        path: '/index',
        element: <Index/>,
    },
    {
        key: '/user',
        label: '用户管理',
        icon: <TeamOutlined/>,
        children: [
            {
                id: 1,
                key: '/user/account',
                label: <Link to="/user/account">账户管理</Link>,
                icon: <UserOutlined />,
            },
            {
                id: 2,
                key: '/user/organization',
                label:  <Link to="/user/organization">组织结构</Link>,
                icon: <ApartmentOutlined />,
            },
        ],
    },
    {
        key: '/system',
        label: '系统管理',
        icon: <DesktopOutlined/>,
        children: [
            {
                id: 3,
                key: '/system/role',
                label: <Link to="/system/role">角色管理</Link>,
                icon: <AuditOutlined />,
            },
            {
                id: 4,
                key: '/system/permission',
                label: <Link to="/system/permission">权限管理</Link>,
                icon: <ClusterOutlined />,
            },
            {
                id: 5,
                key: '/system/setting',
                label: <Link to="/system/setting">系统设置</Link>,
                icon: <SettingOutlined />,
            },
        ],
    },
    {
        id: 6,
        key: '/data',
        label: <Link to="/data">数据管理</Link>,
        icon: <BarsOutlined />,
    },
    {
        id: 7,
        key: '/profile',
        label: <Link to="/profile">个人中心</Link>,
        icon: <UserOutlined/>,
    },
];
