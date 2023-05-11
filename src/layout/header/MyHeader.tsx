import React from 'react';
import MyBreadcrumb from "../main/MyBreadcrumb";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import "./MyHeader.less"

function MyHeader() {
    return (
        <div className={"my-header-container"}>
            <MyBreadcrumb/>
            <Badge count={1}>
                <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
        </div>
    );
}

export default MyHeader;
