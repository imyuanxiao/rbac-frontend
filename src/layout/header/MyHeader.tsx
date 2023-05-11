import React from 'react';
import {Avatar, Col, Dropdown, Row, Space} from 'antd';
import { useNavigate } from 'react-router-dom';
import MyBreadcrumb from "./MyBreadcrumb";
import {
    ExportOutlined
} from '@ant-design/icons';
import {MenuItem} from "../../router/menuConfig";
import {logout} from "../../api/api";

function MyHeader() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogoutClick = () => {
        logout()
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
            <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar />
            </Dropdown>
        </Space>
    );
}

export default MyHeader;
