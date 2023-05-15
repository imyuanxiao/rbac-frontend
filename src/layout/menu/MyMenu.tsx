import React, {useEffect, useState} from 'react';
import {Menu} from "antd";
import {
    buildPathItems,
    findTopLevelParentKeys,
    getFilteredMenu,
    RouteItem,
    routeItems
} from "../../router/RouteConfig";
import {useLocation} from 'react-router-dom';
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import {useTranslation} from "react-i18next";

function MyMenu() {
    const { t } = useTranslation();

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

    function internationalizeItems(items: RouteItem[]) {
        const traverseItems = (items: RouteItem[]) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                // 应用国际化到 label
                if (typeof item.label === 'string') {
                    item.label = t(item.label);
                } else if (React.isValidElement(item.label)) {
                    item.label = React.cloneElement(item.label, {}, t(item.label.props.children));
                }

                // 递归处理子菜单
                if (item.children) {
                    traverseItems(item.children);
                }
            }
        };
        traverseItems(items);
    }

    internationalizeItems(items);

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
