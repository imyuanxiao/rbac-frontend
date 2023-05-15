import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useTranslation} from "react-i18next";

const LoginCard: React.FC = () => {
    const { t } = useTranslation();

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t('login_card.login'),
            children: <LoginForm/>,
        },
        {
            key: '2',
            label: t('login_card.register'),
            children: <RegisterForm/>,
        },
    ];

    return (
        <Card className={"login_card"}>
            <div>
                <p>{t('login_card_welcome')}</p>
            </div>
            <Tabs defaultActiveKey="1" items={items} centered/>
        </Card>
    );
};

export default LoginCard;