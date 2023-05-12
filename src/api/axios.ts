import axios from 'axios';
import LocalStoreUtil from "../utils/LocalStoreUtil";

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 在请求发送之前设置请求头部信息
        const token = LocalStoreUtil.getToken();
        if (token) {
            // console.log("请求头：" + token)
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => {
        // 返回错误信息
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 0) {
            // 设置登录权限为true
            LocalStoreUtil.putIsAuthenticated(true);
            return response;
        } else {
            // 统一处理失败响应
            return Promise.reject(response.data);
        }
    },
    // 如果响应码不是2xx，就会直接进入这里
    (error) => {
        if(error.response.data.data && error.response.data.data.code === 1001){
            LocalStoreUtil.removeLoginState();
            throw new Error("Login has expired, please log in again!");
        }
        throw error;
    }
);

export default axios;
