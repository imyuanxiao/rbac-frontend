import React from 'react';
import {Avatar, Dropdown, message, Space} from 'antd';
import { useNavigate } from 'react-router-dom';
import MyBreadcrumb from "./MyBreadcrumb";
import {
    ExportOutlined
} from '@ant-design/icons';
import {MenuItem} from "../../router/menuConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyHeader() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogoutClick = () => {
        LocalStoreUtil.removeLoginState();
        message.info("已退出登录");
    };

    const items: MenuItem[] = [
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
