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