import React, {useEffect, useState} from 'react';
import { checkTokenExpiration } from '../utils/tokenUtil';
import { Breadcrumb, Layout, theme } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import MyMenu from "../compenents/MyMenu";
import {getIsAuthenticated, myPermissions} from "../api/api";

const { Header, Content, Footer, Sider } = Layout;


function DefaultLayout() {

    const navigate = useNavigate();
    const location = useLocation();

    // 在组件挂载时，判断用户是否已登录
    useEffect(() => {
        if (!getIsAuthenticated() && location.pathname !== '/login') {
            // 保存当前路径到本地存储
            localStorage.setItem('savedPath', location.pathname);
            navigate('/login');
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        // 调用 myPermissions 方法发送请求到后端
        myPermissions().then(permissions => {
            // 处理获取到的权限数据
            console.log("成功调用myPermission")
        }).catch(error => {
            // 处理请求失败的情况
            console.log("myPermission调用出错")
        });
    }, [location]);

    useEffect(() => {
        checkTokenExpiration();
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <MyMenu/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        路由页面
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
