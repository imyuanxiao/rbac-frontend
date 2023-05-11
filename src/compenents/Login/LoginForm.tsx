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
