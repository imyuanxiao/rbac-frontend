# 项目简介
基于React和AntDesign打造RBAC权限管理系统的前端页面。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1684099032837-ca1df233-2b9a-4a44-8f25-ab96b4fda1eb.png#averageHue=%23aec9dd&clientId=u840841c2-c51e-4&from=paste&height=481&id=u3da2d46f&originHeight=722&originWidth=1600&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35640&status=done&style=none&taskId=u4652ca1e-9c1f-4490-8cc1-a7a8cb96c6e&title=&width=1066.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1684099040022-808c8c2a-be41-443b-813f-bc0a4591aec9.png#averageHue=%23f9f8f8&clientId=u840841c2-c51e-4&from=paste&height=481&id=u91adc14b&originHeight=722&originWidth=1600&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=80202&status=done&style=none&taskId=ufbb0ce9b-6772-4a12-b31d-ce1d218c911&title=&width=1066.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1684099048621-93e6047e-cb59-4bdc-b0c6-90fa9290d8b8.png#averageHue=%23adacac&clientId=u840841c2-c51e-4&from=paste&height=481&id=u63bee0a1&originHeight=722&originWidth=1600&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=108623&status=done&style=none&taskId=ua25bdca4-2b23-46e3-99ee-6c4ca8f842f&title=&width=1066.6666666666667)
# 创建项目
直接用WebStorm创建React项目。我勾选了TS，不勾也行。TypeScript在JavaScript的基础上添加了类型系统和一些语言特性，使得开发者可以在大型项目中更加安全、可靠地进行开发，并提供更好的开发体验和工具支持。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683540872614-5d34b209-17f0-4217-aed1-f8bc59085b21.png#averageHue=%233a3e41&clientId=ua2087e0a-8493-4&from=paste&height=657&id=ud7ace517&originHeight=821&originWidth=1017&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=39558&status=done&style=none&taskId=ub00e9166-228f-40ac-90a7-a23a7ca4dec&title=&width=813.6)

# 项目结构
```tsx
src/
  api/       存放与API交互的代码，例如Axios实例、API方法等
  assets/    存放静态资源文件，例如图片、字体、样式表等
    css/     存放CSS样式表文件
    img/     存放图片文件
    fonts/   存放字体文件
  components/  存放React组件，例如通用的UI组件、布局组件等
  layout/    存放布局组件，例如Header、Footer、Sidebar等
  pages/     存放页面组件，例如Home、About、Contact等
    Home.jsx      首页组件
    About.jsx     关于页面组件
    Contact.jsx   联系页面组件
  router/    存放路由配置文件
  utils/     存放工具函数，例如处理日期、字符串、数组等
    date.js       处理日期的工具函数
    string.js     处理字符串的工具函数
    array.js      处理数组的工具函数
  App.jsx    应用程序的主组件
  index.jsx  应用程序的入口文件
```
# 基本布局
采用ant design里的组件进行布局，基本布局如下。除此之外，还有登陆页面。登录页面路径为/login，主页面路径为/，需要配置路由。
## ![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683557107947-963327a9-d701-43fd-9f92-96e9518775be.png#averageHue=%2345a4e9&clientId=u82861bf8-8e60-4&from=paste&height=250&id=u099c0225&originHeight=312&originWidth=1146&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=5412&status=done&style=none&taskId=u660f04d8-fd4e-4cf9-a605-ee3c663f608&title=&width=916.8)
## Ant Design
Ant Design是一个由蚂蚁金服开发和维护的React组件库，它提供了一系列高质量的UI组件，可以帮助开发者快速构建出美观、易用、高效的Web应用程序。<br />[在 create-react-app 中使用 - Ant Design](https://ant.design/docs/react/use-with-create-react-app-cn)<br />我使用了AntDesign的自定义主题
```bash
# ant design
yarn add antd
```
## 准备组件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683894026336-7bf02c9c-b05e-4666-ab22-d5ecf291d319.png#averageHue=%2341464b&clientId=u840841c2-c51e-4&from=paste&height=360&id=u17a5d768&originHeight=540&originWidth=203&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=27696&status=done&style=none&taskId=ua838ef76-1c06-40c4-a63d-13b069ede91&title=&width=135.33333333333334)
## Home
Home即为默认的页面布局组件。<br />[导航菜单 Menu - Ant Design](https://ant.design/components/menu-cn)<br />直接拿Ant Design的菜单栏即可，布局已涵盖在内。后面再根据我们的业务进行修改。
```tsx
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

function DefaultLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        路由页面
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
```
## App
App内配置Ant Design自定义主题，通过React Rounter配置路由和组件。
```tsx
import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#041230',
            },
          }}
      >
          <Router>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<DefaultLayout />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}
export default App;
```
## 菜单结构

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683711771632-abd12f6c-2c3f-45e0-9b92-c7873be5ce17.png#averageHue=%23e0ebf6&clientId=u8d74edbd-3486-4&from=paste&id=u02218703&originHeight=608&originWidth=1080&originalType=url&ratio=1.5&rotation=0&showTitle=false&size=60099&status=done&style=none&taskId=u3c1f1768-976d-4838-a4dd-e41d1bc9e5a&title=)
```typescript
首页 /index (关于本系统的介绍 + 仪表盘)
├── 用户管理 /user
│     ├── 账户管理 /user/account （含角色权限编辑）
│     └── 组织结构 /user/organization
├── 系统管理 /system
│     ├── 角色管理 /system/role
│     ├── 权限管理 /system/permission
│     └── 系统设置 /system/setting
├── 数据管理 /data
└── 个人中心 /profile
      └── 操作：增删改查
```
# 状态管理
[2023 再看 React 状态管理库 - 掘金](https://juejin.cn/post/7195513281228898363)<br />类似Vuex，React也有许多状态管理库，我选用了轻量级的zustand。Zustand和Vuex的思路非常类似，都是用一个中央状态管理仓库来管理应用的状态，通过订阅和派发事件来更新状态。
## 安装zustand
```bash
npm install zustand
```
## 创建AppStore
待定，目前不需要。
# 本地存储
在前端实现用户认证和授权的应用中，常见的做法是在用户登录成功后，将相关信息（如用户ID、用户名、角色、权限等）存储在前端的本地存储（localStorage、sessionStorage等）中，以便在用户访问其他页面时能够获取该信息，并判断用户是否已经登录或者拥有访问权限等。<br />我们需要存的信息：

- 所有角色信息（初始化时存入）
- 所有权限信息（初始化时存入）
- 用户信息（id, username, avatar, phone, email等)（初始化时存入）
- 用户权限信息（经常更新）
- token（经常更新）
- 是否登录（未登录需要跳转到登陆页面）
- 登录之前填写的路由路径（登录成功后跳转至该路径）
## 基本操作
```typescript
localStorage.setItem('token', response.data.token);
const token = localStorage.getItem('token');
localStorage.removeItem('token');
```
## 存储工具类
用于管理本地存储
### LocalStore
```typescript
const store = window.localStorage;

/**
 * 存储工具类
 */
class LocalStore {
    /**
     * 存放数据
     * @param key
     * @param value 如果是object就转换为json存储
     */
    public static put(key: string, value: any) {
        if (!store) {
            return;
        }
        let v = value;
        if (typeof value === 'object') {
            v = JSON.stringify(value);
        }
        store.setItem(key, v);
    }

    /**
     * 直接获取原数据
     * @param key
     */
    public static get(key: string) {
        if (!store) {
            return;
        }
        const item = store.getItem(key);
        try {
            // @ts-ignore
            return JSON.parse(item);
        } catch (e) {

        }
        return item;
    }

    /**
     * 删除数据
     * @param key
     */
    public static remove(key: string) {
        if (!store) {
            return;
        }
        store.removeItem(key);
    }
}

export default LocalStore;
```
### LocalStoreUtil
保存、获取本地存储数据的方法。仓库里的代码有更新一些后面需要的方法。
```typescript
import LocalStore from "./LocalStore";
import {User, UserVO} from "../api/types";


const allRolesKey = 'allRolesKey';
const allPermissionsKey = 'allPermissionsKey';

const tokenKey = 'jwt-token';
const userInfoKey = 'userInfo';
const permissionIdsKey = 'permissionIdsKey';
const isAuthenticated = 'isAuthenticated';
const savedPath = 'savedPath';

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
    
    getMyPermissionIds() {
        return LocalStore.get(permissionIdsKey);
    },

    putMyPermissionIds(permissionIds: number[]) {
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
```
# 路由
在 React 中，路由（Routing）用于控制不同页面之间的导航和渲染。根据不同的 URL 路径加载不同的组件，并在用户进行页面间切换时提供良好的用户体验。
## React Rounter
React Router是一个基于React构建的路由库，用于帮助开发者在Web应用程序中实现客户端路由。通过使用React Router，开发者可以将URL与UI状态同步，并根据URL的变化渲染出相应的组件。
```bash
# 路由组件
npm install react-router-dom
```
### 基本使用
```tsx
<Router>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
    </Routes>
</Router>
```
## 跨域问题
跨域问题指的是浏览器执行AJAX请求时，如果请求的URL与当前页面的域名不同，就会触发浏览器的同源策略，导致请求被拒绝。例如，当前页面在 [http://localhost:3000](http://localhost:3000)，但请求的URL是 [http://example.com](http://example.com)，就会被拒绝。这种情况下，需要使用代理服务器来解决跨域问题，将所有的请求转发到代理服务器，再由代理服务器转发到目标服务器，这样就可以避免浏览器的同源策略限制。
## http-proxy-middleware
http-proxy-middleware是一个用于代理HTTP请求的Node.js中间件，通常用于解决跨域问题。它可以将HTTP请求代理到另一个服务器上，并修改请求和响应，以实现对跨域请求的处理。
```tsx
# http-proxy-middleware
npm install http-proxy-middleware --save
```
## 设置代理
[React配置代理](https://www.jianshu.com/p/1b960cb2c662)
```tsx
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://127.0.0.1:8080',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            },
        }),
    );
};

```
## 路由切换导致组件刷新
如果用Link标签或者href属性等会导致页面刷新，所有组件重新加载，如果想避免这种情况，需要用useNavigate()。刷新与不刷新的区别可参考面包屑内容。
# 数据模型
数据模型（data model）用来描述数据的结构和类型，方便在应用中进行数据的操作和传递。它定义了一个数据对象的属性、方法和事件，可以被视为该对象的蓝图或者基本描述。在前端开发中，数据模型一般用来描述从后端获取到的数据结构，也可以用来规范前端数据的格式。
```typescript
export interface User {
    id: string;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    roleIds: number[];
    permissionIds: number[]
}
```
在api.ts中引入User数据模型，定义该接口的返回对象为User类型或null类型
```typescript
...
import {User} from "./types";

// 从本地获取用户信息
export const getUserFromLocalStorage = (): User | null => {
    const userString = localStorage.getItem('user');
    User user = JSON.parse(userString)
    return user;
};
...
```
# 请求与响应
## Axios
axios是一个流行的JavaScript库，用于在浏览器和Node.js中发送HTTP请求。它是一个基于Promise的HTTP客户端，可以用于在浏览器和Node.js中进行请求和响应处理。<br />在React项目中，axios通常用于发送异步请求，比如从后端API获取数据。
```bash
# axios
npm install axios
```
在需要进行网络请求的组件中，导入 Axios 模块：
```tsx
import axios from 'axios';
```
发起 GET 请求的例子：
```tsx
axios.get('/api/users')
  .then(response => {
    // 请求成功处理
    console.log(response.data);
  })
  .catch(error => {
    // 请求失败处理
    console.error(error);
  });
```
## 请求拦截器
请求拦截器可以用于在请求发送前对请求做一些通用处理，比如添加请求头、统一设置请求数据格式等。在请求拦截器中，我们可以对请求进行修改，比如添加请求头、设置请求数据格式、添加 token 等等。
## 响应拦截器
响应拦截器可以用于对返回的响应做一些通用处理，比如根据后端返回的状态码，统一处理错误提示、统一处理成功响应等。在响应拦截器中，我们可以对响应进行统一处理，比如判断返回的状态码是否正确、根据状态码展示不同的提示信息、对返回的数据进行处理等等。
## 定义拦截器
```typescript
import axios from 'axios';
import LocalStoreUtil from "../utils/LocalStoreUtil";

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 在请求发送之前设置请求头部信息
        const token = LocalStoreUtil.getToken();
        if (token) {
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
        // 如果返回自定义code为1001，说明token无效或已过期
        if(error.response.data && error.response.data.code === 1001){
            LocalStoreUtil.removeLoginState();
            throw new Error("Login has expired, please log in again!");
        }
        throw error;
    }
);

export default axios;
```
注意，在响应拦截器中，如果响应码不是2xx，就会直接进入error部分，然后根据自定义返回的业务错误码进行处理。
### 使用拦截器
把之前引入axios的路径改成拦截器文件导出的axios
```typescript
import axios from '../axios';

export const login = async (formData: any) => {
    ...操作
};
```
# 登录注册页面
## 登录页面组件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683559431565-0d9fa94f-57f6-450e-97f5-911ecedc4759.png#averageHue=%233d4244&clientId=u82861bf8-8e60-4&from=paste&height=111&id=Mn7g1&originHeight=139&originWidth=304&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=4467&status=done&style=none&taskId=u2b145e6d-d6dc-4655-ad34-8352786cd6a&title=&width=243.2)
## 页面布局
使用Row和Col组件进行布局
```tsx
import React from 'react';
import { Col, Row, Card } from 'antd';
import "../assets/css/style.css"
import LoginCard from "../compenents/Login/LoginCard";

function LoginPage() {
    return (
        <Row justify="center" align="middle" className="login-page-container">
            <Col  xs={24} sm={12} md={8}>
                <div className="login-card-container">
                    <LoginCard/>
                </div>
            </Col>
        </Row>
    );
}

export default LoginPage;
```
在LoginCard内使用选项卡组件切换登录和注册表单
```typescript
import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Login`,
        children: <LoginForm/>,
    },
    {
        key: '2',
        label: `Register`,
        children: <RegisterForm/>,
    },
];


const LoginCard: React.FC = () => {

    return (
        <Card className={"login-card"}>
            <div>
                <p>Welcome!</p>
            </div>
            <Tabs defaultActiveKey="1" items={items} centered/>
        </Card>
    );
};

export default LoginCard;
```
## 登录表单组件
按钮提交后触发onFinish方法，该方法会将表单数据传送给异步请求函数login()，函数处理完成后会收到请求
```typescript
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import LocalStoreUtil from "../../utils/LocalStoreUtil";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        if(await login(values)){
            // 获取保存的路径，如果没有，则使用默认路径
            const savedPath = LocalStoreUtil.getSavedPath() || '/';
            // 使用导航功能导航到保存的路径
            navigate(savedPath);
        }
        // 异步函数login如果捕捉到错误但没有返回值，会返回undefined。
        // 在 if 语句中，undefined 会被视为假值
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                    { min: 4, max: 20, message: 'Length should be between 4 and 20 characters!' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 4, max: 20, message: 'Length should be between 4 and 20 characters!' }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
```
## 登录接口
```typescript
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
```
## 测试
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1683619470226-98cd27ea-aeb9-4bb3-9b92-df7b24845d4f.png#averageHue=%2323262b&clientId=uc8bc2d28-84e2-4&from=paste&height=226&id=u8a95724d&originHeight=283&originWidth=654&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=39540&status=done&style=none&taskId=u6472fa38-c37d-4aa1-b1d7-ce90989df19&title=&width=523.2)
# 路由跳转
本地存储设置好后，可以根据其中的getLoginState()方法判断用户是否登录，如果没登录，就需要通过路由跳转至登录页。具体而言：<br />更新Home 组件，在 useEffect 钩子中，当组件渲染完成以及每次路由发生变化，判断用户是否已登录。如果用户未登录，显示错误信息，并将当前页面路径保存到本地存储中，然后导航到登录页面。如果用户以已登录，判断当前路由是否合法，如果不合法，跳转到404页面。<br />关于组件渲染内容，如果用户没登录，只需要显示 "Redirecting to login page" 的文本内容，而不需要渲染其他组件。
```tsx
import React, {useEffect, useState} from 'react';
import {Layout, message, theme} from 'antd';
import MyMenu from "./menu/MyMenu";
import {useLocation, useNavigate} from "react-router-dom";
import MyMain from "./main/MyMain";
import MyHeader from "./header/MyHeader";
import MyFooter from "./footer/MyFooter";
import TabNavigation from "./main/TabNavigation";
import LocalStoreUtil from "../utils/LocalStoreUtil";
import {updatePermissions} from "../api/api";
import {getFilteredPath, routeItems} from "../router/RouteConfig";
const { Header, Content, Footer, Sider } = Layout;

function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    useEffect(() => {
        // 如果未登录，重定向到登录页面
        if (!LocalStoreUtil.getLoginState()) {
            message.error('未登录');
            LocalStoreUtil.putSavedPath(location.pathname);
            LocalStoreUtil.removeLoginState();
            navigate('/login');
        }else{
            updatePermissions();
            let currentPath = location.pathname;
            // 判断当前路由是否正确，如果不正确，重定向至404
            if(currentPath == '/') {
                navigate("/index");
                return;
            }
            if(!getFilteredPath(routeItems).includes(currentPath)){
                LocalStoreUtil.removeSavedPath();
                navigate("/404");
                message.error("请求路径不存在！")
                return;
            }
        }
    }, [location.pathname])

    // 如果未登录，不需要渲染该组件
    if (!LocalStoreUtil.getLoginState()) {
        return <div> Redirecting to login page </div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <MyMenu/>
            </Sider>

            <Layout className="site-layout">

                <Header style={{ padding: '0 16px', background: colorBgContainer }}>
                    <MyHeader/>
                </Header>

                <Content style={{ margin: '0 16px' }}>

                    <div style={{ margin: '10px 0' }}>
                        <TabNavigation/>
                    </div>

                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <MyMain/>
                    </div>

                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter/>
                </Footer>

            </Layout>
        </Layout>
    );
}

export default Home;
```
# 路由页面
首先看一下Home组件里，包含了路由页面的MyMain组件代码：
```tsx
function MyMain() {
    return (
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/index" element={<Index/>}/>
            <Route path="/user/account" element={<Account/>} />
            <Route path="/user/organization" element={<Organization/>} />
            <Route path="/system/role" element={<Role/>} />
            <Route path="/system/permission" element={<Permission/>} />
            <Route path="/system/setting" element={<Setting/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/data" element={<Data/>} />
        </Routes>
    );
}
export default MyMain;
```
如果路由页面有很多的话，这样做不利于更改，我们可以优化一下。通过函数读取路由配置，批量生成路由页面。
## 路由配置
将菜单需要属性和路由需要属性放在一起
```tsx
export interface RouteItem {
    id?: number,
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactElement,
    element?: React.ReactNode,
    children? : RouteItem[];
}

/**
 * 所有菜单配置
 */
export const routeItems = [
    {
        key: '/index',
        label: <Link to="/index">首页</Link>,
        icon: <PieChartOutlined/>,
        element: <Index/>
    },
    {
        key: '/user',
        label: '用户管理',
        icon: <TeamOutlined/>,
        children: [
            {
                id: 1,
                key: '/user/account',
                label: <Link to="/user/account">账户管理</Link>,
                icon: <UserOutlined />,
                element: <Account/>,
            },
            {
                id: 2,
                key: '/user/organization',
                label:  <Link to="/user/organization">组织结构</Link>,
                icon: <ApartmentOutlined />,
                element:  <Organization/>,
            },
        ],
    },
    {
        key: '/system',
        label: '系统管理',
        icon: <DesktopOutlined/>,
        children: [
            {
                id: 3,
                key: '/system/role',
                label: <Link to="/system/role">角色管理</Link>,
                icon: <AuditOutlined />,
                element: <Role/>,
            },
            {
                id: 4,
                key: '/system/permission',
                label: <Link to="/system/permission">权限管理</Link>,
                icon: <ClusterOutlined />,
                element: <Permission/>,
            },
            {
                id: 5,
                key: '/system/setting',
                label: <Link to="/system/setting">系统设置</Link>,
                icon: <SettingOutlined />,
                element: <Setting/>
            },
        ],
    },
    {
        id: 6,
        key: '/data',
        label: <Link to="/data">数据管理</Link>,
        icon: <BarsOutlined />,
        element: <Data/>,
    },
    {
        id: 7,
        key: '/profile',
        label: <Link to="/profile">个人中心</Link>,
        icon: <UserOutlined/>,
        element: <Profile/>,

    },
];
```
## 动态加载
getPageNodes方法根据用户的权限，从路由配置中提取符合权限要求的路由页面，并返回一个包含这些路由页面的数组。在MyMain组件中将这些路由页面渲染到<Routes>组件中，实现根据用户权限动态加载路由页面。
```tsx
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteItem, routeItems} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyMain() {

    /**
     * 根据用户权限，导出仅在权限范围内的路由页面
     * @param routeItems
     */
    // @ts-ignore
    const getPageNodes = (routeItems: RouteItem[]) => (
        // eslint-disable-next-line
        routeItems.map(item => {
            // 有子路由
            if (item.children) {
                return (
                    getPageNodes(item.children)
                )
            }

            if (item.element) {
                // 无子路由
                return (
                    // 判断权限
                    (LocalStoreUtil.getMyPermissionIds().includes(item.id) || item.key === '/') &&
                    <Route path={item.key as string} element={item.element} key={item.key}/>
                );
            }

        })
    )

    return (
        <Routes>
            {getPageNodes(routeItems)}
        </Routes>
    );
}

export default MyMain;
```
# 更新token
更新token可以让用户保持在线状态。在前端保存一个定时器，每隔一定时间就检查一下 token 的过期时间与当前时间之差是否小于一定值，如果是则向后端发送请求更新 token。如果用户关闭了网页，定时器就会停止运行，但是下一次用户打开网页时可以重新发送请求获取新的 token。
## 安装依赖
```typescript
npm install jsonwebtoken --save

npm install --save-dev @types/jsonwebtoken
```
## 工具类
用于定时检查token是否过期
```typescript
import jwt_decode from "jwt-decode";
import {updateToken} from "../api/api";
import LocalStoreUtil from "./LocalStoreUtil";

export function getTokenExpireTime(token: string): number | null {
    const decoded: any = jwt_decode(token);
    if (decoded && typeof decoded.exp === 'number') {
        return decoded.exp;
    }
    return null;
}

export function checkTokenExpiration(): void {
    if (window.location.pathname.startsWith('/login')) {
        console.log("登录页面不检查")
        return;
    }
    console.log("检查token")
    const token = LocalStoreUtil.getToken();
    if (!token) {
        return;
    }
    const expireTime = getTokenExpireTime(token);
    if (!expireTime) {
        return;
    }
    const now = Math.floor(Date.now() / 1000);
    // 过期前两分半进行检查和更新
    if (now >= expireTime - 150) {
        console.log("token会过期")
        // Token will expire within 60 seconds, update it
        updateToken()
            .catch((error) => {
                console.error('Failed to update token:', error);
            });
    }
}

setInterval(checkTokenExpiration, 120 * 1000);
```
## 请求接口
```typescript
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
```
# 菜单生成
在前后端分离的RBAC权限管理系统中，前端可以通过向后端请求用户的权限信息，然后根据这些信息来渲染路由和菜单。具体实现方式：

1. 后端返回一个包含页面权限信息的 JSON 数据。
2. 前端定义一个路由配置文件，包含所有可能的路由信息，每个路由信息里有一个需要访问的页面 ID。
3. 前端根据后端返回的页面权限信息，动态生成路由配置文件。如果某个页面有权限访问，则在路由配置文件中添加对应的路由信息。
## 路由配置
同路由页面的路由配置
## 菜单权限
定义 getMenuNodes方法，用于将 RouteItem 数组转换成符合要求的菜单项数组，即根据用户权限，保留有权限的菜单。<br />如果item有子路由，递归判断子路由，如果所有子路由都没权限，则排除该item；如果item没有子路由，判断路由id是否在用户权限内，如果没有，也排除。
```tsx
/**
 * 根据用户权限，导出仅在权限范围内的菜单
 * @param items
 */
export function getMenuNodes(items: RouteItem[]): RouteItem[] {
    // @ts-ignore
    return items.map((item: RouteItem) => {
        //有子路由
        if (item.children) {
            const subs = getMenuNodes(item.children).filter(Boolean);
            if (subs.length > 0) {
                return {
                    ...item,
                    children: subs,
                };
            }
        }
        // @ts-ignore
        if (LocalStoreUtil.getMyPermissionIds().includes(item.id) || item.key === '/index'){
            return item;
        }
    });
}
```
## 菜单渲染
引入Ant Design的Menu组件，渲染菜单。<br />在组件 MyMenu 中，调用 getMenuNodes 函数将 menuItems 数组转换成符合要求的菜单项数组，并将其赋值给 items 变量。然后，将 items 数组作为 Menu 组件的 items 属性的值，从而生成菜单。<br />此外，定义路由配置时，通过 Link 组件将菜单项名称转换成链接，以实现点击菜单项后可以跳转到对应的路由。
```tsx
label: <Link to="/">首页</Link>
```
```tsx
import React, {useEffect, useState} from 'react';
import {Menu, message} from "antd";
import {findTopLevelParentKeys, getMenuNodes, RouteItem, routeItems} from "../../router/RouteConfig";
import { useLocation, useNavigate } from 'react-router-dom';
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyMenu() {

    // 获取当前所在路由
    const location = useLocation();
    const navigate = useNavigate();
    let currentPath = location.pathname;

    // 当前展开的SubMenu
    const [openSub, setOpenSub] = useState<string[]>([]);
    const handlerSubChange = (key:any) => {
        setOpenSub(key);
    }

    // 根据用户权限获取所在菜单
    const items : RouteItem[] = getMenuNodes(routeItems);

    useEffect(() => {
        // 根据当前路由路径判断哪个SubMenu该展开
        const openKey:string[] =  findTopLevelParentKeys(items, currentPath);
        // 如果没找到，说明没权限或者路径不存在
        if(openKey.length === 0 && currentPath !== '/index'){
            if(currentPath == '/'){
                navigate("/index");
            }else{
                LocalStoreUtil.removeSavedPath();
                navigate("/404");
                message.error("请求路径不存在！")
            }
        }
        setOpenSub(openKey);
    }, []);

    return (
        <div>
            {/*logo*/}
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu
                theme="dark"
                defaultSelectedKeys={['dashboard']}
                mode="inline"
                items={items}
                selectedKeys={[currentPath]}
                openKeys={openSub}
                onOpenChange={handlerSubChange}
            >
            </Menu>
        </div>
    );
}

export default MyMenu;
```
# Header
## 面包屑
根据当前路由生成面包屑。注意，这种写法中用href，会导致点击面包屑刷新整个页面和组件。优化方法见后文。
```tsx
import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import {PathItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyBreadcrumb() {

  const location = useLocation();

  const generateBreadcrumbPath = (path: string, pathItems: PathItem[], result: []) : any => {
    if(path == '/index' || path == '/') return;
    // 遍历每个路径项
    for (let i = 0; i < pathItems.length; i++) {
      const pathItem = pathItems[i];
      // 将当前路径项转换为 BreadItem 对象
      const breadcrumbItem: any = {
        title: pathItem.label,
        href: pathItem.key,
      };
      // 将当前路径项添加到结果数组中
      // @ts-ignore
      result.push(breadcrumbItem);
      // 如果找到目标路径，则返回结果数组
      if (pathItem.key === path) return true;
      let flag = false;
      // 递归处理子路径项
      if (pathItem.children) {
        flag = generateBreadcrumbPath(path, pathItem.children, result);
      }
      // 未找到目标路径，从结果数组中删除当前路径项
      if(flag) return true;
      result.pop();
    }
  };

  let items: any = [{
    title: '首页',
    href: '/index'
  }];
  generateBreadcrumbPath(location.pathname, LocalStoreUtil.getFilteredPath(), items)

  return <Breadcrumb items={items} />;
}

export default MyBreadcrumb;
```
用useNagivate()进行路由切换：onClick: () => navigate(pathItem.key)
```tsx
function MyBreadcrumb() {
    ...
    const generateBreadcrumbPath = (path: string, pathItems: PathItem[], result: []) : any => {
        if(path == '/index' || path == '/') return;
        // 遍历每个路径项
        for (let i = 0; i < pathItems.length; i++) {
            const pathItem = pathItems[i];
            // 将当前路径项转换为 BreadItem 对象
            const breadcrumbItem: any = {
                title: pathItem.label,
                // href: pathItem.key,
                onClick: () => navigate(pathItem.key)
            };
            ...
        }
    };
 
    let items: any = [{
        title: '首页',
        // href: '/index'
        onClick: () => navigate('/index') // 使用 navigate 执行编程式跳转
    }];
    ...
}

export default MyBreadcrumb;
```
## 头像菜单
个人中心+退出登录
```typescript
import React from 'react';
import {Avatar, Dropdown, message, Space} from 'antd';
import { useNavigate } from 'react-router-dom';
import MyBreadcrumb from "./MyBreadcrumb";
import {
    ExportOutlined
} from '@ant-design/icons';
import {RouteItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function MyHeader() {

    const navigate = useNavigate();

    /**
     * 跳转到个人中心
     */
    const handleProfileClick = () => {
        navigate('/profile');
    };

    /**
     * 退出登录，清空本地存储
     */
    const handleLogoutClick = () => {
        LocalStoreUtil.removeLoginState();
        message.info("已退出登录");
        navigate('/login');
    };

    /**
     * 下拉菜单
     */
    const items: RouteItem[] = [
        {
            key: 'profile',
            label: (
                <a onClick={handleProfileClick}>profile</a>
            ),
        },
        {
            key: 'logout',
            label:(
                <a onClick={handleLogoutClick}>log out</a>
            ),
            icon: <ExportOutlined/>
        }
    ];

    return (
        <Space direction={"horizontal"} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MyBreadcrumb />
            <Space>
                <span>
                    {LocalStoreUtil.getUsername()}
                </span>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar />
                </Dropdown>
            </Space>
        </Space>
    );
}

export default MyHeader;

```
# 标签页
根据点开过的菜单生成标签
```tsx
import React, {useEffect, useState} from 'react';
import { Space, Tag} from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { findPathItemByPath, PathItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function TabNavigation() {

    const location = useLocation();
    const navigate = useNavigate();

    const [tags, setTags] = useState<PathItem[]>([{key:'/index', label:'首页'}]); // 初始化标签数组，包含一个默认标签"首页"

    useEffect(()=>{
        let currentPath = location.pathname;
        const result = findPathItemByPath(currentPath, LocalStoreUtil.getFilteredPath());
        if(result != null && !tags.some(tag => tag.key === result.key)){
            setTags([...tags, result]);
        }
    }, [location.pathname])


    // 处理关闭标签的事件
    const handleTagClose = (tag: PathItem) => {
        setTags(prevTags => prevTags.filter(t => t.key !== tag.key));
        if (location.pathname === tag.key) {
            navigate('/index'); // 导航到首页或其他你想要的默认页面
        }
    };

    // 处理标签点击事件
    const handleTagClick = (tag: PathItem) => {
        navigate(tag.key);
    };

    // 生成标签组件
    const renderTags = () => {
        return tags.map((tag) => (
                <Tag
                    key={tag.key}
                    closable={tag.label !== '首页'}
                    onClose={() => handleTagClose(tag)}
                    onClick={() => handleTagClick(tag)}
                    color={location.pathname === tag.key ? 'blue' : undefined}
                    style={{ cursor: 'pointer' }}
                >
                    {tag.label}
                </Tag>
        ));
    };

    return (
        <Space direction="horizontal" size={[0, 8]}>
            {renderTags()}
        </Space>
    );
}

export default TabNavigation;
```
# 主页
主页展示仪表盘，组件内加载一些必要资源，比如所有角色信息
```tsx
import React, {useEffect} from 'react';
import {getAllPermissions, getAllRoles} from "../../api/api";

/**
 * 1. 首页数据展示、通知
 * 2. 从数据库加载所有角色信息、权限信息
 */

function Index() {

    useEffect(() => {
        // 加载所有角色信息
        getAllRoles();
        // 加载所有权限信息
        getAllPermissions();
    }, []);

    return (
        <div>
            <h1>首页</h1>
            <div>
                <div>
                    博客、Github、公众号请认准<strong>imyuanxiao</strong>
                </div>
            </div>
        </div>
    );
}

export default Index;
```
```tsx
export const getAllRoles = async () => {
    const url = '/api/role/list';
    try {
        const response = await axios.get(url);
        LocalStoreUtil.putAllRoles(response.data.data);
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};

export const getAllPermissions = async () => {
    const url = '/api/permission/list';
    try {
        const response = await axios.get(url);
        LocalStoreUtil.putAllPermissions(response.data.data);
    }catch (error) {
        // @ts-ignore
        message.error(error.message);
    }
};
```
# 用户管理
## 账户管理
[表格 Table - Ant Design](https://ant.design/components/table-cn#table)<br />[分页 Pagination - Ant Design](https://ant.design/components/pagination-cn)<br />下面这段代码是一个展示用户账户信息的表格组件，以下是各个部分的作用说明：

1. generateColumns() 函数：用于生成表格的列定义，包括列名、数据索引、渲染函数等。
2. Account 组件：包含用户账户信息的表格展示和分页功能。
3. useState<UserPageVO[]>([])：使用 useState 钩子创建一个名为 data 的状态变量，用于存储用户账户数据，初始值为空数组。
4. useState 钩子中的 pagination：创建一个名为 pagination 的状态变量，用于管理分页相关信息，包括当前页码、每页显示数量、总记录数等。
5. fetchData() 函数：通过请求接口获取用户数据，并根据返回结果更新 data 和 pagination 状态变量的值。
6. useEffect(() => {}, []) 钩子：在组件挂载时调用 fetchData 函数，获取初始数据，并设置初始页码和每页显示数量。
7. handleChange() 函数：处理分页变化事件，根据新的页码和每页显示数量调用 fetchData 函数，更新数据和分页信息。
8. <Table> 组件：antd的表格组件，用于展示用户账户信息。通过传入 columns 定义的列配置、data 中的数据、以及 pagination 配置实现表格的展示和分页功能。

注意，这段代码只是进行了数据展示，权限控制等见后文。
```tsx
import React, {useEffect, useState} from 'react';
import {Table, Tag, Space} from 'antd';
import {ColumnsType} from "antd/es/table";
import {getUserPageVO} from "../../api/api";

/**
 * 从后端接受的用户数据
 */
interface UserPageVO {
    id: string;
    username: string;
    roleIds: number[];
}

// 定义列表属性（列名、值的表现格式、操作按钮等）
function generateColumns(): ColumnsType<UserPageVO> {
    return [
        {
            title: 'index',
            dataIndex: 'index',
            key: 'index',
            render: (_, record, index) => index + 1,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'roleIds',
            key: 'roleIds',
            render: (roleIds: number[]) => (
                <>
                    {roleIds.map((roleId) => {
                        // 为不同角色赋予不同颜色的标签
                        let color = (roleId === 1 || roleId === 2) ? 'geekblue' : roleId === 3 ? 'green' : 'default';
                        return (
                            <Tag color={color} key={roleId}>
                                {roleId}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
}
// 获取列表
const columns = generateColumns();

function Account() {

    // 创建data，指定类型为UserPageVO[]
    const [data, setData] = useState<UserPageVO[]>([]);

    // 创建分页对象，指定属性
    const [pagination, setPagination] = useState({
        current: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0, // 总记录数
        showSizeChanger: true, // 是否显示每页显示数量的下拉框
        pageSizeOptions: ['5', '10', '15'], // 每页显示数量的选项
    });

    // 通过请求接口获取数据，并更新分页对象
    const fetchData = async (current: number, pageSize: number) => {
        try {
            const response = await getUserPageVO(current, pageSize);
            // 更新列表数据
            setData(response.records);
            // 更新分页对象
            setPagination(prevPagination => ({
                ...prevPagination,
                current: current,
                pageSize: pageSize,
                total: response.total,
            }));
        }catch (e){

        }
    };

    // 第二个参数为空的useEffect会在组件挂载的时候调用接口
    useEffect(() => {
        // 获取数据，设置页码初始页码和显示数
        fetchData(1, 5);
    }, []);

    // 更改页码或每页显示数
    const handleChange = async (current: number, pageSize: number, resetCurrent: boolean) => {
        let newCurrentPage = resetCurrent ? 1 : current; // 如果是每页显示数变化，则重置当前页码为1
        fetchData(newCurrentPage, pageSize);
    };

    return (
        <Table
            columns={columns}
            dataSource={data.map((item) => ({
                ...item,
                key: item.id,
            }))}
            pagination={{
                ...pagination, // 使用状态中的 pagination 属性
                position: ['bottomCenter'], // 设置分页组件在表格底部居中显示
                onChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, false),
                onShowSizeChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, true),
                showTotal: (total, range) => `共 ${total} 条记录`, // 显示总数据数
            }}
        />
    );
}

export default Account;
```
注意，列表展示的是后端返回的用户分页对象的数据。仅展示必要信息。
### 角色名称
上述代码中，角色仍然是用id展示，可以写个函数，从本地存储的角色信息里找id对应的名字。
```tsx
function getRoleName(id: number): string {
    const roles: Role[] = LocalStoreUtil.getAllRoles();
    const role = roles.find((role) => role.id === id);
    return role ? role.name : '';
}
```
## 增加/更新用户
增加和更新用户放在一起讲，主要是因为两者在前端页面上非常相似，只是一个显示当前编辑用户的信息，一个不显示，所以可以写在一起。当然，分开写成2个组件也没问题。
### 接口
```tsx
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
```
### 编辑页面
当用户点击新增或编辑按钮时候，弹出以一个新增用户的页面，这个功能可以用Ant Design的Modal组件实现。在AddUser.tsx内，用户名用Input输入框，角色信息用多选框。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1684000537338-8e3a3c79-76cf-420d-9fc9-e66754779111.png#averageHue=%23fdf7f7&clientId=u840841c2-c51e-4&from=paste&height=201&id=uad62807f&originHeight=301&originWidth=968&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=26198&status=done&style=none&taskId=u50af2ca3-93bf-49bc-9991-d752704e3be&title=&width=645.3333333333334)<br />[Modal - Ant Design](https://ant.design/components/modal#api)<br />[Checkbox - Ant Design](https://ant.design/components/checkbox-cn)<br />可以注意到，EditUser组件接收了一个user对象，该对象即分页对象，如有需要可以更改为传入用户id，通过另外的请求接口加载用户所有信息并展示在页面上。<br />该组件里利用Form表单进行数据验证和操作。
```tsx
import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { getRoleOptions } from '../../utils/AttayUtil';
import { Option, UserPageVO } from "../../api/types";
import { addUser, updateUser } from "../../api/api";

const options: Option[] = getRoleOptions();

function EditUser({ isEdit, user, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void;
}) {

    // 用于操作表单
    const [form] = Form.useForm();
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    /**
     * 提交表单
     */
    const handleOk = () => {
        // 表单加载中
        setConfirmLoading(true);
        // 验证表单数据有效性
        form.validateFields().then(async (values) => {
                console.log(values);
                if ((isEdit && await updateUser(values)) || (await addUser(values))) {
                    onUpdate();
                }
            }
        ).catch((error) => {
            message.error('Form validation failed.');
        }).finally(() => {
            setConfirmLoading(false)
        })
    };

    /**
     * 初始化表单数据
     */
    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                id: user.id,
                username: user.username,
                roleIds: user.roleIds.map(String)
            });
        }else{
            form.resetFields();
        }
    }, [modalOpen, user, isEdit, form]);

    return (
        <Modal
            title={isEdit ? "编辑数据" : "新增用户"}
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="userId"
                    name="id"
                    style={{ display: 'none' }}
                    rules={[
                        { required: isEdit, message: 'Please input your username!' },
                    ]}
                >
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 4, max: 12, message: 'Length should be between 4 and 12 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="roleIds"
                >
                    <Select
                        mode="multiple"
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUser;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29364238/1684010539805-3659d32c-708a-48f5-8d6c-0c190a75c01d.png#averageHue=%23ededed&clientId=u840841c2-c51e-4&from=paste&height=197&id=uc96d0701&originHeight=296&originWidth=673&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23750&status=done&style=none&taskId=u23ddc600-5f94-4ed3-9cdf-1b79e6de1e1&title=&width=448.6666666666667)
#### 钩子函数
此处需要在Account组件内增加几个钩子函数，用于控制EditUser是否显示，是否刷新数据以及存储被操作的对象。
```tsx
function Account() {
    // 数据刷新
    const [refresh, setRefresh] = useState(false);
    // EditUser组件的可见状态
    const [editOpen, setEditOpen] = useState(false);
    // EditUser执行编辑或新增
    const [isEdit, setIsEdit] = useState(true);
    // 存储单独操作的用户
    const [selectedUser, setSelectedUser] = useState<UserPageVO>({id:0,username:'',roleIds:[]});
    ...
}
```
设置Account组件的新增按钮和编辑按钮，新增按钮在表格上方，编辑按钮需要加到每一行数据后面，需要在generateColumns()方法里实现。
#### 配置行内编辑按钮
```tsx
function generateColumns(): ColumnsType<UserPageVO> {
...
{
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, user) => (
                    <Space size="middle">
                        <Auth permissionId={1003}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FormOutlined />}
                                onClick={()=>{
                                    setIsEdit(true)
                                    setSelectedUser(user)
                                    setEditOpen(true)
                                }}
                            />
                        </Auth>
                        <Auth permissionId={1002}>
                          {/*删除按钮*/}
                        </Auth>
                    </Space>
                ),
            },
...
}
```
#### 配置新增按钮
```tsx
return{
	<>
    <Row justify="end" gutter={15} style={{ marginBottom: 15 }}>
        <Col>
            <Auth permissionId={1001}>
                <Button
                    type="primary"
                    onClick={()=>{
                        setIsEdit(false);
                        // @ts-ignore
                        setSelectedUser({ id: null, username: null, roleIds: [] })
                        setEditOpen(true)}}
                >
                    New
                </Button>
            </Auth>
        </Col>
        <Col>
            <Auth permissionId={1002}>
              {/*删除按钮*/}
            </Auth>
        </Col>
    </Row>
    <Table>
      ...
  </>
}
```
#### 配置EditUser组件
```tsx
return{
	<>
    ...
    </Table>
     <EditUser
      isEdit={isEdit}
      user={selectedUser}
      modalOpen={editOpen}
      setModalOpen={setEditOpen}
      onUpdate={()=>{
            setRefresh(!refresh)
            setEditOpen(false)
        }}
      />
      ...
  </>
}
```
## 删除用户
### 接口
在使用axios发送DELETE请求时，将数据作为请求体传递给后端通常需要使用data属性。这是因为DELETE请求的规范中，请求体的数据是通过请求的payload（消息负载）进行传递的，并不是直接作为URL参数传递的。
```tsx
export const deleteUser = async (userIds: number[]) => {
    console.log(userIds)
    const url = '/api/user/delete/';
    try {
        // @ts-ignore
        const response = await axios.delete(url,  { data: userIds });
        message.success(response.data.data);
    } catch (error) {
        console.log(error);
        // @ts-ignore
        message.error(error.data)
    }
};
```
### 删除页面
#### 钩子函数
同EditUser组件，需要一些钩子函数
```tsx
// DeleteUser组件的可见状态
const [deleteOpen, setDeleteOpen] = useState(false);
// DeleteUser是否执行批量删除
const [isBatchDelete, setIsBatchDelete] = useState(false);
// 存储批量操作的用户id
const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
```
#### 配置行内删除按钮
```tsx
function generateColumns(): ColumnsType<UserPageVO> {
...
{
  title: 'Action',
  key: 'action',
  align: 'center',
  render: (_, user) => (
      <Space size="middle">
          <Auth permissionId={1003}>
              {/*编辑按钮*/}
          </Auth>
          <Auth permissionId={1002}>
              <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={()=>{
                      setIsBatchDelete(false)
                      setSelectedUser(user)
                      setDeleteOpen(true)
                  }}
              />
          </Auth>
      </Space>
    ),
  },
...
}
```
#### 配置批量删除按钮
批量删除的功能需要在Table标签里配置
```tsx
 <Table
    rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys) => {
            // @ts-ignore
            setSelectedUserIds(selectedRowKeys);
        }
    }}
   ...
   }
```
按钮同新增按钮
```tsx
<Row justify="end" gutter={15} style={{ marginBottom: 15 }}>
    <Col>
        <Auth permissionId={1001}>
          {/*新增按钮*/}
        </Auth>
    </Col>
    <Col>
        <Auth permissionId={1002}>
            <Button
                type="primary"
                danger={true}
                onClick={()=>{
                    setIsBatchDelete(true);
                    setDeleteOpen(true);
                }}
            >
                Delete
            </Button>
        </Auth>
    </Col>
</Row>
```
#### 配置DeleteUser组件
该组件类似EditUser组件
```tsx
import React, {useState} from 'react';
import {Modal} from 'antd';
import {UserPageVO} from "../../api/types";
import {deleteUser} from "../../api/api";

function DeleteUser({ isBatchDelete, userIds, user, modalOpen, setModalOpen, onUpdate }: {
    isBatchDelete: boolean;
    userIds: number[]
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const deleteConfirmationText = isBatchDelete
        ? '请确认是否批量删除用户？'
        : `请确认是否删除用户: ${user.username}？`;

    const handleOk = async () => {
        setConfirmLoading(true)
        if (await deleteUser(isBatchDelete? userIds : [user.id])) {
            setConfirmLoading(false)
            onUpdate();
        }else{
            setConfirmLoading(false)
        }
    };

    return (
        <Modal
            title="删除用户"
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            cancelText="取消"
            okText="确认"
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <div>{deleteConfirmationText}</div>
            <div>注意：删除后无法恢复！</div>
        </Modal>
    );
}

export default DeleteUser;
```
# 角色管理
树形控件展示数据<br />[Tree - Ant Design](https://ant.design/components/tree-cn)<br />将Account组件复制一份进行改造，保留框架。这次删除的确认我用了气泡确认框。
```tsx
import React, {useEffect, useState} from 'react';
import {Table, Space, Button, Row, Col, Tag, Popconfirm} from 'antd';
import {
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import LocalStoreUtil from "../../../utils/LocalStoreUtil";
import {Role, RolePageVO, UserPageVO} from "../../../api/types";
import Auth from "../../../compenents/Auth";
import {deleteRole, getRolePageVO, updatePermissions} from "../../../api/api";
import EditUser from "../../user/user/EditUser";
import EditRole from "./EditRole";

function SystemRole() {

    // 数据刷新
    const [refresh, setRefresh] = useState(false);
    // EditUser组件的可见状态
    const [editOpen, setEditOpen] = useState(false);
    // EditUser执行编辑或新增
    const [isEdit, setIsEdit] = useState(true);
    // 存储单独操作的用户对象
    const [selectedRole, setSelectedRole] = useState<RolePageVO>({id:0,name:'',permissionIds:[]});
    // 存储批量操作的用户id
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    // 是否执行批量删除，用于区分显示loading动画
    const [isBatchDelete, setIsBatchDelete] = useState(false);
    /**
     * 定义列表属性（列名、值的表现格式、操作按钮等）
     */
    function generateColumns(): ColumnsType<RolePageVO> {
        return [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (_, __, index) => {
                    const { current, pageSize } = pagination;
                    return (current - 1) * pageSize + index + 1;
                },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                render: (text) => <>{text}</>,
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, role) => (
                    <Space size="middle">
                        <Auth permissionId={3003}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FormOutlined />}
                                onClick={()=>{
                                    setIsEdit(true)
                                    setSelectedRole(role)
                                    setEditOpen(true)
                                }}
                            />
                        </Auth>
                        <Auth permissionId={3002}>
                            <Popconfirm
                                title="Delete the Role"
                                description="Are you sure to delete this Role?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={deleteRoles}
                            >
                                <Button
                                    type="primary"
                                    shape="circle"
                                    loading={confirmLoading && !isBatchDelete}
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={()=>{
                                        setSelectedRoleIds([role.id])
                                        setIsBatchDelete(false)
                                    }}
                                />
                            </Popconfirm>

                        </Auth>
                    </Space>
                ),
            },
        ];
    }

    /**
     * 用于存储列表数据的钩子函数
     */
    const [data, setData] = useState<RolePageVO[]>([]);

    /**
     * 用于存储分页对象的钩子函数
     */
    const [pagination, setPagination] = useState({
        current: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0, // 总记录数
        showSizeChanger: true, // 是否显示每页显示数量的下拉框
        pageSizeOptions: ['5', '10', '15'], // 每页显示数量的选项
    });

    /**
     * 通过请求接口获取数据，并更新分页对象
     * @param current
     * @param pageSize
     */
    const fetchData = async (current: number, pageSize: number) => {
        try {
            const response = await getRolePageVO(current, pageSize);
            // 更新列表数据
            setData(response.records);
            // 更新分页对象
            setPagination(prevPagination => ({
                ...prevPagination,
                current: current,
                pageSize: pageSize,
                total: response.total,
            }));
        }catch (e){

        }
    };

    /**
     * 挂载组件和refresh刷新时，重新获取列表数据
     * @param current
     * @param pageSize
     */
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [refresh]);

    const deleteRoles = async () => {
        setConfirmLoading(true)
        try {
            const response = await deleteRole(selectedRoleIds);
            console.log(response)
            setRefresh(!refresh);
        }catch (e){

        }finally {
            setTimeout(() => {
                setConfirmLoading(false)
            }, 2000);
        }
    };

    /**
     * 更改页码或每页显示数，若更改每页显示数，需要刷新回到第1页
     * @param current
     * @param pageSize
     * @param resetCurrent
     */
    const handleChange = async (current: number, pageSize: number, resetCurrent: boolean) => {
        let newCurrentPage = resetCurrent ? 1 : current; // 如果是每页显示数变化，则重置当前页码为1
        fetchData(newCurrentPage, pageSize);
    };

    return (
        <>
            <Row justify="end" gutter={15} style={{ marginBottom: 15 }}>
                <Col>
                    <Auth permissionId={3003}>
                        <Button
                            type="primary"
                            onClick={()=>{
                                setIsEdit(false);
                                // @ts-ignore
                                setSelectedRole({ id: null, name: null, permissionIds: [] })
                                setEditOpen(true)}}
                        >
                            New
                        </Button>
                    </Auth>
                </Col>
                <Col>
                    <Auth permissionId={3002}>
                        <Popconfirm
                            title="Delete roles"
                            description="Are you sure to delete those roles?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={deleteRoles}
                        >
                            <Button
                                type="primary"
                                danger={true}
                                loading={confirmLoading && isBatchDelete}
                                onClick={()=>{
                                    setIsBatchDelete(true)
                                }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </Auth>
                </Col>
            </Row>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys) => {
                        // @ts-ignore
                        setSelectedRoleIds(selectedRowKeys);
                    }
                }}
                columns={generateColumns()}
                dataSource={data.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                pagination={{
                    ...pagination, // 使用状态中的 pagination 属性
                    position: ['bottomCenter'], // 设置分页组件在表格底部居中显示
                    onChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, false),
                    onShowSizeChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, true),
                    showTotal: (total, range) => `共 ${total} 条记录`, // 显示总数据数
                }}
            />
            <EditRole
                isEdit={isEdit}
                role={selectedRole}
                modalOpen={editOpen}
                setModalOpen={setEditOpen}
                onUpdate={()=>{
                    setRefresh(!refresh)
                    setEditOpen(false)
                }}
            />
        </>
    );
}

export default SystemRole;
```
## 增加/更新角色
此处对于树形控件里checkedKeys的处理方法不是很好，但是因为只是个练习项目，所以就简单写写了。<br />最好是底层数据库里将权限的父子关系确认好，然后传给前端会比较好编辑。
```tsx
import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, message, Tree} from 'antd';
import {getPermissionTree} from '../../../utils/AttayUtil';
import {RolePageVO} from "../../../api/types";
import {addRole, updateRole} from "../../../api/api";
import {DataNode} from "antd/lib/tree";
import LocalStoreUtil from "../../../utils/LocalStoreUtil";

function EditRole({ isEdit, role, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    role: RolePageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void;
}) {

    // 用于操作表单
    const [form] = Form.useForm();
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<number[]>();

    /**
     * 提交表单
     */
    const handleOk = () => {
        // 表单加载中
        setConfirmLoading(true);
        // 验证表单数据有效性
        form.validateFields().then(async (values) => {
                const newRole = {
                    id: values.id,
                    name: values.name,
                    permissionIds: checkedKeys
                }
                if ((isEdit && await updateRole(newRole)) || (await addRole(newRole))) {
                    onUpdate();
                }
            }
        ).catch((error) => {
            message.error('Form validation failed.');
        }).finally(() => {
            setConfirmLoading(false)
        })
    };

    const treeData: DataNode[] = getPermissionTree(LocalStoreUtil.getAllPermissions(), 0);

    /**
     * 初始化表单数据
     */
    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                id: role.id,
                name: role.name,
            });
        }else{
            form.resetFields();
        }
    }, [modalOpen, role, form]);

    /**
     * Tree控件默认只会返回子菜单全选中的父菜单key，我们需要简单处理一下
     * @param checkedKeys
     */
    const updateCheckedKeys = (checkedKeys: number[]): number[] => {
        const newKeys = new Set(checkedKeys);
        for (const key of checkedKeys) {
            if(Math.floor(key / 1000) != 0){
                newKeys.add(Math.floor(key / 1000));
            }
        }
        return Array.from(newKeys);
    };

    return (
        <Modal
            title={"编辑数据" }
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="userId"
                    name="id"
                    style={{ display: 'none' }}
                    rules={[
                        { required: isEdit},
                    ]}
                >
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Role name is required!' },
                        { min: 4, max: 12, message: 'Length should be between 4 and 12 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Permission"
                >

                    <div style={{ maxHeight: '200px', overflow: 'auto' , border:'solid 1px'}}>
                        <Tree
                            checkable
                            // 逆向updateCheckedKeys的简单方式，只需要操作权限
                            defaultCheckedKeys={role.permissionIds.filter((id) => Math.floor(id / 1000) !== 0)}
                            onCheck={(checkedKeys)=>{
                                const newKeys = updateCheckedKeys(checkedKeys as number[]);
                                setCheckedKeys(newKeys)
                            }}
                            treeData={treeData}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditRole;
```
# 个人中心
个人中心分为两部分，展示个人信息以及编辑。
## 布局
```tsx
import React from 'react';
import "../../assets/css/style.css"
import ProfileCard from "./ProfileCard";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import UserForm from "./UserForm";
import {Col, Row, Space} from "antd";

// 编辑用户信息
function Profile() {
    return (
        <Row gutter={[30, 0]}>
            <Col span={8}>
                <ProfileCard user={LocalStoreUtil.getUserInfo()}/>
            </Col>
            <Col span={16}>
                <UserForm user={LocalStoreUtil.getUserInfo()}/>
            </Col>
        </Row>
    );
}

export default Profile;
```
## 信息展示卡片
```tsx
import React from 'react';
import { Card, Tag } from 'antd';
import {User} from "../../api/types";
import {getRoleName} from "../../utils/AttayUtil";

function ProfileCard({ user }: { user: User }) {
    return (
        <Card style={{ height: "100%", backgroundColor: "#f3f3f3", lineHeight:"2em"}}>
            <Card.Meta
                avatar={
                    <img
                    src={user.avatar ? user.avatar : "https://i.328888.xyz/2023/05/15/VZpOIx.png"}
                    alt="Avatar"
                    style={{ width: 64, height: 64, objectFit: 'cover', margin: '1em'}}
                    />
                }
            />
            <div>
                <strong>Username: </strong>
                {user.username}
            </div>
            <div>
                <strong>Phone: </strong>
                {user.phone}
            </div>
            <div>
                <strong>Email: </strong>
                {user.email}
            </div>
            <div>
                <strong>Roles: </strong>
                {user.roleIds.map((roleId) => (
                    <Tag key={roleId}>{getRoleName(roleId)}</Tag>
                ))}
            </div>
    </Card>
);
}

export default ProfileCard;
```
## 更新卡片
头像上传需要api接口，此处功能未实现。
```tsx
import {Form, Input, Button, Card, Upload, UploadFile, UploadProps, Modal, message} from 'antd';
import {User} from "../../api/types";
import React, {useState} from "react";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {RcFile, UploadChangeParam} from "antd/es/upload";


/**
 * 无返回url时的编码方法
 * @param file
 */
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

/**
 * 图片上传前的处理
 * @param file
 */
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function UserForm({ user }:{
    user:User
}) {
    const [form] = Form.useForm();
    // 表单提交
    const handleSubmit = async () => {
        try {
            await form.validateFields(); // 等待表单验证完成
            const values = form.getFieldsValue(); // 获取表单数据
            console.log(values);
            // 执行后续逻辑
            message.info("此处功能未实现")
        } catch (error) {
            message.error('Form validation failed.');
        }
    };


    /**
     * 头像上传相关的代码
     */
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        // 模拟图片上传过程
        setLoading(true);
        // 图片上传2秒后显示
        setTimeout(()=>{
            getBase64(info.file.originFileObj as RcFile).then((base64) => {
                setLoading(false);
                setImageUrl(base64);
            });
        }, 2000)
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    /**
     * 关闭图片预览
     */
    const handleCancel = () => {
        setPreviewOpen(false);
    }
    /**
     * 预览图片。如果图片没有预览地址或 URL，则使用 getBase64 方法将图片转换为 Base64 编码
     * @param file
     */
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    return (
        <Card
            style={{
                backgroundColor: "#f3f3f3",
                lineHeight:"2em",
            }}>
            <Form
                form={form}
                initialValues={user}
                onFinish={handleSubmit}
            >
                <Form.Item label="id" name="id" style={{display: "none"}}>
                    <Input />
                </Form.Item>
                <Form.Item label="Avatar">
                    <Upload
                        listType="picture-circle"
                        beforeUpload={beforeUpload}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        showUploadList={false}
                    >
                        {imageUrl == '' ? uploadButton : null}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default UserForm;
```
# 数据管理
数据权限的相关内容<br />待更新

