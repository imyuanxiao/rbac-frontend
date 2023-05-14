import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';
import {PathItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyBreadcrumb() {

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * 根据当前路由生成面包屑数据
     * @param path
     * @param pathItems
     * @param result
     */
    const generateBreadcrumbPath = (path: string, pathItems: PathItem[], result: []) : any => {
        if(path == '/index' || path == '/') return;
        // 遍历每个路径项
        for (let i = 0; i < pathItems.length; i++) {
            const pathItem = pathItems[i];
            // 将当前路径项转换为 BreadItem 对象
            const breadcrumbItem: any = {
                title: pathItem.label,
                // 去掉注释可以加上路由跳转
                // href: pathItem.key,
                onClick: () => navigate(pathItem.key)
            };
            // 将当前路径项添加到结果数组中
            // @ts-ignore
            result.push(breadcrumbItem);
            // 如果找到目标路径，则返回结果数组
            if (pathItem.key === path) return true;
            let flag = false;
            // 递归处理子路径项
            if (pathItem.children) {
                flag = generateBreadcrumbPath(path, pathItem.children, result);
            }
            // 未找到目标路径，从结果数组中删除当前路径项
            if(flag) return true;
            result.pop();
        }
    };

    /**
     * 默认第一个是首页
     */
    let items: any = [{
        title: '首页',
        onClick: () => navigate('/index') // 使用 navigate 执行编程式跳转
    }];

    generateBreadcrumbPath(location.pathname, LocalStoreUtil.getFilteredPath(), items)

    return <Breadcrumb items={items} />;
}

export default MyBreadcrumb;