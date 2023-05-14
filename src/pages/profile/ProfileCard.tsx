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