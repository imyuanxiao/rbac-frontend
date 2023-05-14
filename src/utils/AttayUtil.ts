import LocalStoreUtil from "./LocalStoreUtil";
import {Option, Permission, Role} from "../api/types";
import { DataNode } from 'antd/lib/tree';

/**
 *
 */
export const getRoleOptions = (): Option[] => {
    const roleList = LocalStoreUtil.getAllRoles();
    return roleList.map((role: Role) => ({
        label: role.name,
        value: '' + role.id,
    }));
};


export function getPermissionTree(permissions: Permission[], parentId: number): DataNode[] {
    const dataNodes: DataNode[] = [];

    // 过滤出当前父菜单的子权限
    const childrenPermissions = permissions.filter((permission) => Math.floor(permission.id / 1000) === parentId);

    // 遍历子权限，生成对应的 DataNode
    childrenPermissions.forEach((permission) => {
        const dataNode: DataNode = {
            title: permission.name,
            key: permission.id,
            children: getPermissionTree(permissions, permission.id),
        };

        dataNodes.push(dataNode);
    });

    return dataNodes;
}


/**
 * 通过id获取角色名称
 * @param id
 */
export function getRoleName(id: number): string {
    const roles: Role[] = LocalStoreUtil.getAllRoles();
    const role = roles.find((role) => role.id === id);
    return role ? role.name : '';
}
