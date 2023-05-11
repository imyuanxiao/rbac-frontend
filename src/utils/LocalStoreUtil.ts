import LocalStore from "./LocalStore";
import {User, UserVO} from "../api/types";

const tokenKey = 'jwt-token';
const userInfoKey = 'userInfo';
const permissionIdsKey = 'permissionIdsKey';
const isAuthenticated = 'isAuthenticated';
const savedPath = 'savedPath';

export default {
    /**
     * 保存当前登录用户信息
     * @param userVo 后端传来的UserVO对象，包含用户信息、权限信息及token
     */
    saveLoginUser(userVo: UserVO) {
        // 从userVo中获取token
        LocalStore.put(tokenKey, userVo.token);
        // 从userVo中获取用户信息
        const { id, username, phone, email, avatar, roleIds } = userVo;
        const user: User = { id, username, phone, email, avatar, roleIds};
        LocalStore.put(userInfoKey, user);
        // 从userVo中获取permissionIds
        LocalStore.put(permissionIdsKey, userVo.permissionIds);
    },

    /**
     * 获取登录状态
     */
    getLoginState() {
        return !!LocalStore.get(tokenKey) && LocalStore.get(isAuthenticated);
    },
    /**
     * 移除登录状态
     */
    removeLoginState() {
        LocalStore.remove(tokenKey);
        LocalStore.remove(userInfoKey);
        LocalStore.remove(permissionIdsKey);
        LocalStore.remove(isAuthenticated);
    },

    /**
     * 获取当前登录的token
     */
    getToken() {
        // console.log("请求获取token：" + LocalStore.get(tokenKey));
        return LocalStore.get(tokenKey);
    },

    putToken(token: string) {
        // console.log("收到更新的token：" + token);
        LocalStore.put(tokenKey, token);
    },

    getUsername() {
        const user: User = LocalStore.get(userInfoKey);
        // console.log("请求获取用户名：" + user.username);
        return user.username;
    },

    putUserInfo(user: User){
        LocalStore.put(userInfoKey, user);
    },

    getPermissionIds() {
        return LocalStore.get(permissionIdsKey);
    },

    putPermissionIds(permissionIds: number[]) {
        // console.log("收到更新的权限：" + permissionIds);
        LocalStore.put(permissionIdsKey, permissionIds);
    },

    getSavedPath() {
        return LocalStore.get(savedPath);
    },

    putSavedPath(path: string) {
        LocalStore.put(savedPath, path);
    },

    putIsAuthenticated(value: boolean) {
        LocalStore.put(isAuthenticated, value);
    },

}