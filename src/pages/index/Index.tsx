import React, {useEffect} from 'react';
import {getAllPermissions, getAllRoles} from "../../api/api";

/**
 * 1. 首页数据展示、通知
 * 2. 从数据库加载所有角色信息、权限信息
 */
interface Role {
    id: number,
    name: string
}

interface Permission {
    id: number,
    name: string,
    url: string,
    type: number
}

interface Company{
    id: number,
    name: string
}

function Index() {

    useEffect(() => {
        getAllRoles();
        getAllPermissions();
    }, []);

    return (
        <div>
            <h1>首页</h1>
            <div>
                <div>
                    博客、Github、公众号请认准<strong>imyuanxiao</strong>
                </div>
            </div>
        </div>
    );
}

export default Index;
