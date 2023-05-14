export interface User {
    id: number;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
}

export interface UserVO {
    id: number;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
    permissionIds: number[];
    token: string;
}

/**
 * 从后端接受的用户分页数据
 */
export interface UserPageVO {
    id: number;
    username: string;
    roleIds: number[];
}

export interface RolePageVO {
    id: number;
    name: string;
    permissionIds: number[];
}


export interface Role {
    id: number,
    name: string
}

export interface Permission {
    id: number,
    name: string,
    url: string,
    type: number
}

export interface Company{
    id: number,
    name: string
}

export interface Option {
    value: string;
    label: string;
}