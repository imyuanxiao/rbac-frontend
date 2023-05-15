import React from 'react';
import { Card, Tag } from 'antd';
import {User} from "../../api/types";
import {getRoleName} from "../../utils/AttayUtil";
import {useTranslation} from "react-i18next";

function ProfileCard({ user }: { user: User }) {
    const { t } = useTranslation();


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
                <strong>{t('user.username')}: </strong>
                {user.username}
            </div>
            <div>
                <strong>{t('user.phone')}: </strong>
                {user.phone}
            </div>
            <div>
                <strong>{t('user.email')}: </strong>
                {user.email}
            </div>
            <div>
                <strong>{t('user.roleIds')}: </strong>
                {user.roleIds.map((roleId) => (
                    <Tag key={roleId}>{getRoleName(roleId)}</Tag>
                ))}
            </div>
    </Card>
);
}

export default ProfileCard;