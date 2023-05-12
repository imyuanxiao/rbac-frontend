import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteItem, routeItems} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyMain() {

    /**
     * 根据用户权限，导出仅在权限范围内的路由页面
     * @param routeItems
     */
    // @ts-ignore
    const getPageNodes = (routeItems: RouteItem[]) => (
        // eslint-disable-next-line
        routeItems.map(item => {
            // 有子路由
            if (item.children) {
                return (
                    getPageNodes(item.children)
                )
            }

            if (item.element) {
                // 无子路由
                return (
                    // 判断权限
                    (LocalStoreUtil.getMyPermissionIds().includes(item.id) || item.key === '/index') &&
                    <Route path={item.key as string} element={item.element} key={item.key}/>
                );
            }

        })
    )

    return (
        <Routes>
            {getPageNodes(routeItems)}
        </Routes>
    );
}

export default MyMain;
