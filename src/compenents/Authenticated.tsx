import React, { useEffect } from 'react';
import {Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {message} from "antd";

type Props = {
    component: React.ComponentType<any>;
    // 其他属性
};

// 身份验证组件
const Authenticated: React.FC<Props> = ({ component: Component, ...rest }) => {

    const navigate = useNavigate();
    const location = useLocation();

    function checkUserLogin(){
        // 如果未登录，重定向到登录页面
        if (!LocalStoreUtil.getLoginState()) {
            message.error('未登录');
            LocalStoreUtil.putSavedPath(location.pathname);
            LocalStoreUtil.removeLoginState();
            navigate('/login');
            return false;
        }
        return true;
    }

    const isAuthenticated = checkUserLogin(); // 检查用户登录状态的函数，可以根据实际情况进行实现

    useEffect(() => {
        // 在组件加载时检查登录状态
        // 可以发送请求或检查本地存储中的令牌等
        // 根据登录状态进行相应的操作
    }, []);

    if (isAuthenticated) {
        // 用户已登录，渲染指定组件
        return <Route {...rest} element={<Component />} />;
    } else {
        // 用户未登录，重定向到登录页面
        return <Navigate to="/login" replace />;
    }
};

export default  Authenticated;
