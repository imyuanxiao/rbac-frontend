import React from 'react';
import {Button, Form, Input, message} from 'antd';
import {useTranslation} from "react-i18next";

const RegisterForm: React.FC = () => {
    const { t } = useTranslation();

    const onFinish = (values: any) => {
        message.info(t('message.unfinished'))
    };

    return(
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label={t('user.username')}
                name="username"
                rules={[
                    { required: true, message: t('user.username_rule_required') as string },
                    { min: 4, max: 20, message: t('user.username_rule_length') as string }
                ]}
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
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label={t('user.password_check')}
                name="password_check"
                rules={[
                    { required: true, message: t('user.password_rule_required') as string },
                    { min: 4, max: 20, message:t('user.password_rule_length') as string },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {t('login_card.submit')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;