import React, {useEffect, useState} from 'react';
import { Space, Tag} from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { findPathItemByPath, PathItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import {useTranslation} from "react-i18next";

function TabNavigation() {
    const { t } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();

    const [tags, setTags] = useState<PathItem[]>([{key:'/index', label:'route_config_index'}]); // 初始化标签数组，包含一个默认标签"首页"

    useEffect(()=>{
        let currentPath = location.pathname;
        const result = findPathItemByPath(currentPath, LocalStoreUtil.getFilteredPath());
        if(result != null && !tags.some(tag => tag.key === result.key)){
            setTags([...tags, result]);
            console.log("tags");
            console.log(tags);
        }
    }, [location.pathname])


    // 处理关闭标签的事件
    const handleTagClose = (tag: PathItem) => {
        setTags(prevTags => prevTags.filter(t => t.key !== tag.key));
        if (location.pathname === tag.key) {
            navigate('/index'); // 导航到首页或其他你想要的默认页面
        }
    };

    // 处理标签点击事件
    const handleTagClick = (tag: PathItem) => {
        navigate(tag.key);
    };

    // 生成标签组件
    const renderTags = () => {
        return tags.map((tag) => (
                <Tag
                    key={tag.key}
                    closable={tag.label !== 'route_config_index'}
                    onClose={() => handleTagClose(tag)}
                    onClick={() => handleTagClick(tag)}
                    color={location.pathname === tag.key ? 'blue' : undefined}
                    style={{ cursor: 'pointer' }}
                >
                    {t(tag.label)}
                </Tag>
        ));
    };

    return (
        <Space direction="horizontal" size={[0, 8]}>
            {renderTags()}
        </Space>
    );
}

export default TabNavigation;
