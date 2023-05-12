import React, {useEffect, useState} from 'react';
import {Layout, message, theme} from 'antd';

import MyMenu from "./menu/MyMenu";
import {updatePermissions} from "../api/api";
import {useLocation, useNavigate} from "react-router-dom";
import MyMain from "./main/MyMain";
import MyHeader from "./header/MyHeader";
import MyFooter from "./footer/MyFooter";
import TabNavigation from "./main/TabNavigation";
import LocalStoreUtil from "../utils/LocalStoreUtil";

const { Header, Content, Footer, Sider } = Layout;


function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(false); // 页面加载状态
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const checkLoginStatus = () =>{
        if (!LocalStoreUtil.getLoginState()) {
            message.error("未登录")
            const path = window.location.pathname;
            LocalStoreUtil.putSavedPath(path);
            LocalStoreUtil.removeLoginState();
            if(path !== "/login"){
                navigate("/login");
            }
            return;
        }
        return true;
    }

    useEffect(() => {
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            setIsLoaded(true); // 标记页面已加载完成
        }
        if (isLoaded) {
            // 调用 myPermissions 方法发送请求到后端
            updatePermissions()
                .then((permissions) => {
                    // 处理获取到的权限数据
                    console.log('成功调用updatePermissions');
                })
                .catch((error) => {
                    // 处理请求失败的情况
                    console.log('updatePermissions调用出错');
                });
        }
    }, [isLoaded, location]);

    if (!isLoaded) {
        return null; // 页面未加载完成，不显示内容
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <MyMenu/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: '0 16px', background: colorBgContainer }}>
                    <MyHeader/>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ margin: '10px 0' }}>
                        <TabNavigation/>
                    </div>
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