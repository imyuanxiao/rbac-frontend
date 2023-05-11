import React from 'react';
import {Space, Tag} from 'antd';


function TabNavigation() {
    return (
        <Space direction={"horizontal"} size={[0,8]}>
            <Tag>
                首页
            </Tag>
            <Tag closable>
                标签1
            </Tag>
            <Tag closable>
                标签2
            </Tag>
        </Space>
    );
}

export default TabNavigation;
