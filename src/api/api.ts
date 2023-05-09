import axios from './axios';
import {User} from "./types";



// 从本地获取登录状态
export const getIsAuthenticated = (): boolean => {
    const result = localStorage.getItem('isAuthenticated');
    if (!result) {
        return false;
    }
    return JSON.parse(result);
};

// 从本地获取用户权限
export const getPermissionsFromLocalStorage = (): number[] | null => {
    const user = getUserFromLocalStorage();
    if (!user) {
        return null;
    }
    return user.permissionIds;
};

// 从本地获取用户信息
export const getUserFromLocalStorage = (): User | null => {
    const userString = localStorage.getItem('user');
    if (userString == null) {
        console.log('无用户信息，请登录，清空本地存储数据');
        // 清空本地存储的 token 和 user 信息
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 跳转到登录页
        console.log("此处应该跳转到登录页")
        // 返回 null，表示没有用户信息
        return null;
    }
    return JSON.parse(userString);
};


// 保存用户信息（含权限）到本地
export const handleUserVO = (response: any) => {
    // 先将响应数据转换为一个普通的对象
    const { id, username, phone, email, avatar, roleIds, permissionIds } = response.data.data;
    const user: User = { id, username, phone, email, avatar, roleIds, permissionIds };

    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
};

// 保存新的权限信息到用户信息
export const handlePermissions= (response: any) => {
        const permissionIds: number[] = response.data.data;
        const user = getUserFromLocalStorage();
        if (!user) {
            return;
        }
        user.permissionIds = permissionIds;
        localStorage.setItem('user', JSON.stringify(user));
};

export const login = async (formData: any) => {
    const url = '/api/auth/login';
    try {
        const response = await axios.post(url, formData);
        // 保存返回的token至本地
        localStorage.setItem('token', response.data.data.token);
        handleUserVO(response);
        return true;
    } catch (error) {
        console.log(error)
        //响应拦截器已处理错误，此处不需要处理
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('savedPath');
    localStorage.removeItem('isAuthenticated');
    // 重定向到登录页
    window.location.href = '/login';
};

// 发送token到后端，获取用户最新的权限，需要和用户名一起发送，以免token被其他用户使用
export const myPermissions = async () => {
    const url = '/api/auth/my-permission';
    try {
        const user = getUserFromLocalStorage();
        if (!user) {
            return;
        }
        await axios.post(url, {username: user.username}).then(
            response=>{
                handlePermissions(response);
            }
        );
    } catch (error) {
        console.log(error)
        //响应拦截器已处理错误，此处不需要处理
    }
};

// 发送token到后端，获取用户最新的权限
export const updateToken = async () => {
    const url = '/api/auth/update-token';
    // 发送GET请求，传递formData作为请求体
    try {
        const user = getUserFromLocalStorage();
        if (!user) {
            return;
        }
        await axios.post(url,  {username: user.username}).then(
            response =>{
                // 收到token后更新本地token
                localStorage.setItem('token', response.data.data);
            }
        )
    } catch (error) {
        console.log(error)
        //响应拦截器已处理错误，此处不需要处理
    }
};