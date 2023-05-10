import React from 'react';
import { Col, Row } from 'antd';
import "../../assets/css/style.css"
import LoginCard from "../../compenents/Login/LoginCard";

function Login() {
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
