import React, { useState } from 'react';
import { Space, Tag } from 'antd';

function TabNavigation() {
    const [tags, setTags] = useState(['首页']); // 初始化标签数组，包含一个默认标签"首页"
    const [activeTag, setActiveTag] = useState('首页'); // 当前选中的标签，默认为"首页"

    // 处理点击标签的事件
    const handleTagClick = (tag: any) => {
        setActiveTag(tag);
        // 在这里进行路由跳转逻辑，根据点击的标签进行对应的页面跳转
        // ...
    };

    // 处理关闭标签的事件
    const handleTagClose = (tag: any) => {
        setTags(tags.filter((t) => t !== tag));
        // 在这里进行关闭标签的逻辑，如移除对应的路由或其他操作
        // ...
    };

    // 生成标签组件
    const renderTags = () => {
        return tags.map((tag) => (
            <Tag
                key={tag}
                closable={tag !== '首页'}
                onClose={() => handleTagClose(tag)}
                onClick={() => handleTagClick(tag)}
            >
                {tag}
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
