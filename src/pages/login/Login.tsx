import React from 'react';
import { Col, Row } from 'antd';
import "../../assets/css/style.css"
import LoginCard from "../../compenents/Login/LoginCard";
import { useNavigate } from 'react-router';
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import { useTranslation } from 'react-i18next';

function Login() {
    const { t } = useTranslation();

    const navigate = useNavigate();
    // 如果已经登录了直接跳转到首页
    if (LocalStoreUtil.getLoginState())  {
        console.log(t('message_logged_in'))
        navigate('/index');
    }
    return (
        <Row justify="center" align="middle" className="login_page_container">
            <Col  xs={24} sm={12} md={8}>
                <div className="login_card_container">
                    <LoginCard/>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
