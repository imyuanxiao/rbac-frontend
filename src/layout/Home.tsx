import React, {useEffect, useState} from 'react';
import { checkTokenExpiration } from '../utils/TokenUtil';
import { Breadcrumb, Layout, theme } from 'antd';

import MyMenu from "./menu/MyMenu";
import {updatePermissions} from "../api/api";
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {useLocation, useNavigate} from "react-router-dom";
import MyMain from "./main/MyMain";
import MyHeader from "./header/MyHeader";
import MyBreadcrumb from "./main/MyBreadcrumb";
import MyFooter from "./footer/MyFooter";

const { Header, Content, Footer, Sider } = Layout;

function Home() {

    const navigate = useNavigate();
    const location = useLocation();

    // 在组件挂载时，判断用户是否已登录
    useEffect(() => {
        if (!LocalStoreUtil.getLoginState() && location.pathname !== '/login') {
            // 保存当前路径到本地存储
            LocalStoreUtil.putSavedPath(location.pathname);
            navigate('/login');
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        // 调用 myPermissions 方法发送请求到后端
        updatePermissions().then(permissions => {
            // 处理获取到的权限数据
            console.log("成功调用updatePermissions")
        }).catch(error => {
            // 处理请求失败的情况
            console.log("updatePermissions调用出错")
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
                <MyMenu/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <MyHeader/>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <MyBreadcrumb/>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <MyMain/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter/>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Home;