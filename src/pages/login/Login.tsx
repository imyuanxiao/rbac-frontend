import React from 'react';
import { Col, Row } from 'antd';
import "../../assets/css/style.css"
import LoginCard from "../../compenents/Login/LoginCard";
import { useNavigate } from 'react-router';
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function Login() {
    const navigate = useNavigate();
    // 如果已经登录了直接跳转到首页
    if (LocalStoreUtil.getLoginState())  {
        console.log("已登录")
        navigate('/index');
    }
    return (
        <Row justify="center" align="middle" className="login-page-container">
            <Col  xs={24} sm={12} md={8}>
                <div className="login-card-container">
                    <LoginCard/>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
