import React from 'react';
import {Avatar, Dropdown, message, Space, Button, Tooltip} from 'antd';
import {useNavigate} from 'react-router-dom';
import MyBreadcrumb from "./MyBreadcrumb";
import {
    ExportOutlined
} from '@ant-design/icons';
import {RouteItem} from "../../router/RouteConfig";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import { useTranslation } from 'react-i18next';
import { TranslationOutlined } from '@ant-design/icons';


function MyHeader() {
    const { i18n, t } = useTranslation();

    /**
     * change language
     * @param lng
     */
    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng).then(()=>{
            window.location.reload();
        });
    };

    const tooltipText = i18n.language === 'zh' ? t('switch to English') : t('switch to Chinese');

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
                  <Tooltip title={tooltipText}>
                    <Button
                        icon={<TranslationOutlined />}
                        onClick={() => {
                            changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
                        }}
                    />
                  </Tooltip>
                </span>
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
