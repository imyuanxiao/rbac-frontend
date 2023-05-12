import axios from './axios';
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {message} from "antd";

export const login = async (formData: any) => {
    const url = '/api/auth/login';
    try {
        const response = await axios.post(url, formData);
        LocalStoreUtil.saveLoginUser(response.data.data);
        return true;
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};

// 发送token到后端，获取用户最新的权限，需要和用户名一起发送，以免token被其他用户使用
export const updatePermissions = async () => {
    const url = '/api/auth/my-permission';
    try {
        const response = await axios.get(url);
        const permissionIds: number[] = response.data.data;
        LocalStoreUtil.putPermissionIds(permissionIds);
        return true;
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};

// 发送token到后端，获取用户最新的权限
export const updateToken = async () => {
    const url = '/api/auth/update-token';
    try {
        const response = await axios.get(url);
        LocalStoreUtil.putToken(response.data.data)
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};

/*业务相关接口*/
export const getUserPageVO = async (currentPage:number, pageSize:number) => {
    const url = `/api/user/page/${currentPage}&${pageSize}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};
