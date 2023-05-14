import React, {useEffect, useState} from 'react';
import {Menu} from "antd";
import {
    buildPathItems,
    findTopLevelParentKeys,
    getFilteredMenu,
    RouteItem,
    routeItems
} from "../../router/RouteConfig";
import {useLocation, useNavigate} from 'react-router-dom';
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyMenu() {

    // 获取当前所在路由
    const location = useLocation();
    let currentPath = location.pathname;

    useEffect(() => {
        // 根据当前路由路径判断哪个SubMenu该展开
        const openKey:string[] =  findTopLevelParentKeys(items, currentPath);
        setOpenSub(openKey);
    }, [location.pathname])

    // 当前展开的SubMenu
    const [openSub, setOpenSub] = useState<string[]>([]);
    const handlerSubChange = (key:any) => {
        setOpenSub(key);
    }

    // 根据用户权限获取所在菜单
    const items : RouteItem[] = getFilteredMenu(routeItems);
    // 获取用户有权限的路由，保存在本地
    const paths = buildPathItems(routeItems);
    LocalStoreUtil.putFilteredPath(paths);

    return (
        <div>
            {/*logo*/}
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu
                theme="dark"
                defaultSelectedKeys={['dashboard']}
                mode="inline"
                items={items}
                selectedKeys={[currentPath]}
                openKeys={openSub}
                onOpenChange={handlerSubChange}
            >
            </Menu>
        </div>
    );
}

export default MyMenu;
