import React, {ReactNode} from 'react';
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {Permission} from "../api/types";

interface AuthProps {
    permissionId: number,
    children: ReactNode
}

const Auth: React.FunctionComponent<AuthProps> = props => {
    const {permissionId, children} = props;
    const permissionList = LocalStoreUtil.getAllPermissions().map((p:Permission )=> p.id);
    // 如果资源字典里没有这个id，就代表此id已无需权限处理，直接返回组件
    if (!permissionList.includes(permissionId) || LocalStoreUtil.getMyPermissionIds().includes(permissionId)) {
        return (
            <>{children}</>
        );
    } else {
        return null;
    }
};

export default Auth;