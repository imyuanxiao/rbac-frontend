import React from 'react';
import {Avatar, Dropdown, message, Space} from 'antd';
import { useNavigate } from 'react-router-dom';
import MyBreadcrumb from "./MyBreadcrumb";
import {
    ExportOutlined
} from '@ant-design/icons';
import {RouteItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyHeader() {

    const navigate = useNavigate();

    /**
     * 跳转到个人中心
     */
    const handleProfileClick = () => {
        navigate('/profile');
    };

    /**
     * 退出登录，清空本地存储
     */
    const handleLogoutClick = () => {
        LocalStoreUtil.removeLoginState();
        message.info("已退出登录");
        navigate('/login');
    };

    /**
     * 下拉菜单
     */
    const items: RouteItem[] = [
        {
            key: 'profile',
            label: (
                <a onClick={handleProfileClick}>profile</a>
            ),
        },
        {
            key: 'logout',
            label:(
                <a onClick={handleLogoutClick}>log out</a>
            ),
            icon: <ExportOutlined/>
        }
    ];

    return (
        <Space direction={"horizontal"} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MyBreadcrumb />
            <Space>
                <span>
                    {LocalStoreUtil.getUsername()}
                </span>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar />
                </Dropdown>
            </Space>
        </Space>
    );
}

export default MyHeader;
