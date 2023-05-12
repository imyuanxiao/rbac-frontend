import React, {useEffect, useState} from 'react';
import {Menu, message} from "antd";
import {findTopLevelParentKeys, getMenuNodes, MenuItem, menuItems} from "../../router/menuConfig";
import { useLocation, useNavigate } from 'react-router-dom';

function MyMenu() {

    // 获取当前所在路由
    const location = useLocation();
    const navigate = useNavigate();
    let currentPath = location.pathname;

    // 根据用户权限获取所在菜单
    const items : MenuItem[] = getMenuNodes(menuItems);

    // 当前展开的SubMenu
    const [openSub, setOpenSub] = useState<string[]>([]);
    const handlerSubChange = (key:any) => {
        setOpenSub(key);
    }
    useEffect(() => {
        // 根据当前路由路径判断哪个SubMenu该展开
        const openKey:string[] =  findTopLevelParentKeys(items, currentPath);
        // 如果没找到，说明没权限或者路径不存在
        if(openKey.length === 0 && currentPath !== '/index' && currentPath !== '/'){
            navigate("/index");
            message.error("请求路径不存在！")
        }
        setOpenSub(openKey);
    }, []);

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
