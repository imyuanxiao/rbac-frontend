import React, {useEffect, useState} from 'react';
import {Layout, message, theme} from 'antd';
import MyMenu from "./menu/MyMenu";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import MyMain from "./main/MyMain";
import MyHeader from "./header/MyHeader";
import MyFooter from "./footer/MyFooter";
import TabNavigation from "./main/TabNavigation";
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {updatePermissions} from "../api/api";
import {findPathByKey} from "../router/RouteConfig";
const { Header, Content, Footer, Sider } = Layout;

function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (!LocalStoreUtil.getLoginState()) {
            message.error('未登录');
            LocalStoreUtil.putSavedPath(location.pathname);
            LocalStoreUtil.removeLoginState();
            return;
        }
        // 每次路由切换都更新权限
        updatePermissions();

        // 判断当前路由的合法性
        let currentPath = location.pathname;
        const result = findPathByKey(currentPath, LocalStoreUtil.getFilteredPath());
        if(result != currentPath){
            if(result == '/404') {
                message.error("请求路径不存在！");
            }
            navigate(result)
            return;
        }

    }, [location.pathname])

    // 如果未登录，不需要渲染该组件
    if (!LocalStoreUtil.getLoginState()) {
        return (<Navigate to='/login'/>)
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