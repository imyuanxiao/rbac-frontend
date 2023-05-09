import axios from './axios';
import {User} from "./types";
import { useAppStore } from '../store/AppState';
const { setUser, getUser } = useAppStore.getState();

// 保存响应信息到用户信息
export const handleUserVO = (response: any) => {
    const user: User = response.data.data;
    setUser(user);
};

// 保存响应信息到用户权限
export const handlePermissions= (response: any) => {
        const permissionIds: number[] = response.data.data;
        const user = getUser();
        const updatedUser = { ...user, permissions: permissionIds };
        setUser(updatedUser);
};

// 发送login表单数据到后端，返回的是一个token
export const login = async (formData: any) => {
    const url = '/api/auth/login'; // 设置相对路径，由代理服务器转发请求
    // 发送POST请求，传递formData作为请求体
    try {
        const response = await axios.post(url, formData);
        const token = response.data.data.token;
        console.log("login收到响应头：" + token)
        localStorage.setItem('token', token);
        handleUserVO(response);
        return true;
    } catch (error) {
        //响应拦截器已处理错误，此处不需要处理
        console.log(error)
    }
};

// 发送token到后端，获取用户最新的权限，需要和用户名一起发送，以免token被其他用户使用
export const myPermissions = async () => {
    const url = '/api/auth/my-permission';
    // 发送GET请求，传递formData作为请求体
    try {
        const user = getUser();
        if (!user) {
            // user为null时，抛出异常
            return new Error("当前不存在登录用户!");
        }
        const response = await axios.post(url, user.username);
        const token = response.data.data.token;
        console.log("permission收到响应头：" + token)
        localStorage.setItem('token', token);
        handlePermissions(response);
        return true;
    } catch (error) {
        //响应拦截器已处理错误，此处不需要处理
    }
};

// 发送token到后端，获取用户最新的权限
export const updateToken = async () => {
    const url = '/api/auth/update-token';
    // 发送GET请求，传递formData作为请求体
    try {
        const user = getUser();
        console.log("当前用户名" + user.username)

        if (!user) {
            // user为null时，抛出异常
            return new Error("当前不存在登录用户!");
        }
        console.log("updateToken发送请求")
        await axios.post(url,  {username: user.username}).then(
            response =>{
                // 收到token后更新本地token
                const token = response.data.data;
                localStorage.setItem('token', token);
            }
        )
    } catch (error) {
        console.log(error)
        //响应拦截器已处理错误，此处不需要处理
    }
};