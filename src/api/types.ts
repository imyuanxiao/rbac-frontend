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
