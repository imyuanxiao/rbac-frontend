import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {getAllPermissions, getAllRoles, login, updateMyPermissions} from "../../api/api";
import { useNavigate } from 'react-router-dom';
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import {useTranslation} from "react-i18next";

const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        if(await login(values)){
            // 登录成功，获取最新角色和权限信息
            getAllRoles();
            getAllPermissions();
            updateMyPermissions();

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

    // @ts-ignore
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
                label={t('user.username')}
                name="username"
                rules={[
                    { required: true, message: t('user.username_rule_required') as string },
                    { min: 4, max: 20, message: t('user.username_rule_length') as string }
                ]}
                initialValue="admin"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t('user.password')}
                name="password"
                rules={[
                    { required: true, message: t('user.password_rule_required') as string },
                    { min: 4, max: 20, message:t('user.password_rule_length') as string }
                ]}
                initialValue="admin"
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>{t('login_card.remember_me')}</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {t('login_card.submit')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
