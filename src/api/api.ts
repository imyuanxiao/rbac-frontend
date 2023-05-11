import axios from './axios';
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {message} from "antd";

export const login = async (formData: any) => {
    const url = '/api/auth/login';
    // 使用 Promise 包装异步操作
    return new Promise((resolve, reject) => {
        axios.post(url, formData).then(response => {
            LocalStoreUtil.saveLoginUser(response.data.data);
            // 在保存成功后，将一个值传递给 resolve 函数，表示操作成功
            resolve(true);
        }).catch(error => {
            console.log(error);
            // 在操作失败后，将一个值传递给 reject 函数，表示操作失败
        });
    });
};

export const logout = () => {
    LocalStoreUtil.removeLoginState();
    // 重定向到登录页
    window.location.href = '/login';
};

export const checkLoginStatus = () =>{
    if (!LocalStoreUtil.getLoginState()) {
        console.log("未登录，跳转至登录页面")
        const path = window.location.pathname;
        LocalStoreUtil.putSavedPath(path);
        LocalStoreUtil.removeLoginState();
        if(path !== "/login"){
            window.location.href = "/login";
        }
        return false;
    }
    return true;
}

// 发送token到后端，获取用户最新的权限，需要和用户名一起发送，以免token被其他用户使用
export const updatePermissions = async () => {
    const url = '/api/auth/my-permission';
    // 使用 Promise 包装异步操作
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            {username: LocalStoreUtil.getUsername()}
        ).then(
            response => {
                // 保存新的权限信息到用户信息
                const permissionIds: number[] = response.data.data;
                LocalStoreUtil.putPermissionIds(permissionIds);
                resolve(true);
            }
        ).catch(error => {
            console.log(error);
            // 在操作失败后，将一个值传递给 reject 函数，表示操作失败
        });
    });
};

// 发送token到后端，获取用户最新的权限
export const updateToken = async () => {
    const url = '/api/auth/update-token';
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            {username: LocalStoreUtil.getUsername()}
        ).then(
            response => {
                // 收到token后更新本地token
                LocalStoreUtil.putToken(response.data.data)
            }
        ).catch(error => {
            console.log(error);
            // 在操作失败后，将一个值传递给 reject 函数，表示操作失败
        });
    });
};