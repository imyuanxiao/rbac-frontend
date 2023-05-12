export interface User {
    id: string;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
}

export interface UserVO {
    id: string;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
    permissionIds: number[];
    token: string;
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
