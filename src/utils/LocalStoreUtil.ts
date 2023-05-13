import LocalStore from "./LocalStore";
import {User, UserVO} from "../api/types";
import {PathItem, routeItems} from "../router/RouteConfig";


const allRolesKey = 'allRoles';
const allPermissionsKey = 'allPermissions';

const tokenKey = 'jwt-token';
const userInfoKey = 'userInfo';
const permissionIdsKey = 'permissionIds';
const isAuthenticated = 'isAuthenticated';
const savedPath = 'savedPath';

const filteredPathKey = 'filteredPath';

export default {

    /**
     * 获取、保存当前存储的所有角色信息权限信息
     */
    getAllRoles(){
        return LocalStore.get(allRolesKey);
    },
    putAllRoles(roles: number[]) {
        LocalStore.put(allRolesKey, roles);
    },
    getAllPermissions(){
        return LocalStore.get(allPermissionsKey);
    },
    putAllPermissions(permissions: number[]) {
        LocalStore.put(allPermissionsKey, permissions);
    },

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
        LocalStore.remove(filteredPathKey);
        LocalStore.remove(allRolesKey);
        LocalStore.remove(allPermissionsKey);
    },

    /**
     * 获取当前登录的token
     */
    getToken() {
        // console.log("请求获取token：" + LocalStore.get(tokenKey));
        return LocalStore.get(tokenKey);
    },

    getUsername() {
        return LocalStore.get(userInfoKey).username;
    },


    putToken(token: string) {
        // console.log("收到更新的token：" + token);
        LocalStore.put(tokenKey, token);
    },

    getMyPermissionIds() {
        return LocalStore.get(permissionIdsKey);
    },

    putMyPermissionIds(permissionIds: number[]) {
        LocalStore.put(permissionIdsKey, permissionIds);
    },

    getSavedPath() {
        return LocalStore.get(savedPath);
    },

    removeSavedPath(){
        LocalStore.remove(savedPath);
    },

    putSavedPath(path: string) {
        LocalStore.put(savedPath, path);
    },

    putIsAuthenticated(value: boolean) {
        LocalStore.put(isAuthenticated, value);
    },

    getFilteredPath() {
        return LocalStore.get(filteredPathKey);
    },

    putFilteredPath(paths: PathItem[]) {
        paths.push(...paths, {
            key: '/',
            label: '首页',
            redirect: '/index'
        })
        LocalStore.put(filteredPathKey, paths);
    },

}