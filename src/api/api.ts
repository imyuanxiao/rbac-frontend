import axios from './axios';
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {message} from "antd";

export const getAllRoles = async () => {
    const url = '/api/role/list';
    try {
        const response = await axios.get(url);
        LocalStoreUtil.putAllRoles(response.data.data);
    }catch (error) {
        // @ts-ignore
        message.error(error.data);
    }
};

/**
 * 获取所有权限信息
 */
export const getAllPermissions = async () => {
    const url = '/api/permission/list';
    try {
        const response = await axios.get(url);
        LocalStoreUtil.putAllPermissions(response.data.data);
    }catch (error) {
        // @ts-ignore
        message.error(error.data);
    }
};

/**
 * 发送登录表单到后端，验证成功会收到token
 * @param formData
 */
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

/**
 * 更新用户权限
 */
export const updateMyPermissions = async () => {
    console.log("updatePermissions")
    const url = '/api/auth/my-permission';
    try {
        const response = await axios.get(url);
        const permissionIds: number[] = response.data.data;
        LocalStoreUtil.putMyPermissionIds(permissionIds);
        return true;
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};

/**
 * 更新token
 */
export const updateMyToken = async () => {
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

/**
 * 发送当前页码和每页显示数到后端，获取用户分页数据
 * @param currentPage
 * @param pageSize
 */
export const getUserPageVO = async (currentPage:number, pageSize:number) => {
    const url = `/api/user/page/${currentPage}&${pageSize}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        // @ts-ignore
        message.error(error.data)
    }
};

/**
 * 发送当前页码和每页显示数到后端，获取角色分页数据
 * @param currentPage
 * @param pageSize
 */
export const getRolePageVO = async (currentPage:number, pageSize:number) => {
    const url = `/api/role/page/${currentPage}&${pageSize}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        // @ts-ignore
        message.error(error.data)
    }
};


/**
 * 添加新用户（用户名、角色等）
 * @param user
 */
export const addUser = async (user: any) => {
    const url = '/api/user/add/';
    try {
        const response = await axios.post(url, user);
        message.success(response.data.data);
        return true;
    } catch (error) {
        // @ts-ignore
        message.error(error.data);
    }
};

/**
 * 更新用户信息（用户名、角色等）
 * @param user
 */
export const updateUser = async (user: any) => {
    console.log(user)
    const url = '/api/user/update/';
    try {
        const response = await axios.put(url, user);
        message.success(response.data.data);
        return true;
    } catch (error) {
        // @ts-ignore
        message.error(error.data)
    }
};

/**
 * 批量删除用户
 * @param userIds
 */
export const deleteUser = async (userIds: number[]) => {
    console.log(userIds)
    const url = '/api/user/delete/';
    try {
        // @ts-ignore
        const response = await axios.delete(url,  { data: userIds });
        message.success(response.data.data);
        return true;
    } catch (error) {
        console.log(error);
        // @ts-ignore
        message.error(error.data)
    }
};

/**
 * 添加新角色（角色名、角色权限等）
 * @param role
 */
export const addRole = async (role: any) => {
    const url = '/api/role/add/';
    try {
        const response = await axios.post(url, role);
        message.success(response.data.data);
        return true;
    } catch (error) {
        // @ts-ignore
        message.error(error.data);
    }
};

/**
 * 更新角色信息（角色名、权限信息等）
 * @param role
 */
export const updateRole = async (role: any) => {
    const url = '/api/role/update/';
    try {
        const response = await axios.put(url, role);
        message.success(response.data.data);
        return true;
    } catch (error) {
        // @ts-ignore
        message.error(error.data)
    }
};

/**
 * 批量删除角色
 * @param roleIds
 */
export const deleteRole = async (roleIds: number[]) => {
    const url = '/api/role/delete/';
    try {
        // @ts-ignore
        const response = await axios.delete(url,  { data: roleIds });
        message.success(response.data.data)
        return true;
    } catch (error) {
        console.log(error);
        // @ts-ignore
        message.error(error.data)
    }
};