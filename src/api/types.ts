export interface User {
    id: string;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
    permissionIds: number[]
}
