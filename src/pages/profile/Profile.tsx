import React from 'react';
import "../../assets/css/style.css"
import ProfileCard from "./ProfileCard";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import UserForm from "./UserForm";
import {Col, Row, Space} from "antd";

// 编辑用户信息
function Profile() {
    return (
        <Row gutter={[30, 0]}>
            <Col span={8}>
                <ProfileCard user={LocalStoreUtil.getUserInfo()}/>
            </Col>
            <Col span={16}>
                <UserForm user={LocalStoreUtil.getUserInfo()}/>
            </Col>
        </Row>
    );
}

export default Profile;
