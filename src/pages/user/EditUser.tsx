import React, {useEffect, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Modal, Input, Select} from 'antd';
import { getRoleOptions } from '../../utils/AttayUtil';
import {Option, User, UserPageVO} from "../../api/types";
import {updateUser} from "../../api/api";

const options: Option[] = getRoleOptions()

function EditUser({ user, modalOpen, setModalOpen, onUpdate }: {
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [username, setUsername] = useState<string>('');

    const handleRoleIdsChange = (value: any) => {
        setSelectedRoles([].concat(...value));
    };

    const handleOk = () => {
        updateUser({
            id: user.id,
            username: username as string,
            roleIds: selectedRoles
        } as User).then(
            onUpdate
        );
    };

    useEffect(() => {
        setUsername(user.username);
        setSelectedRoles(user.roleIds);
    }, [user.username]);

    return (
        <Modal
            title="编辑数据"
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            cancelText="取消"
            okText="确认"
            destroyOnClose={true}
        >
            <p><b>Username</b></p>
            <Input
                value={username}
                style={{ width: '100%' }}
                prefix={<UserOutlined />}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <p><b>Role</b></p>
            <Select
                mode="tags"
                defaultValue={user.roleIds}
                onChange={handleRoleIdsChange}
                style={{ width: '100%' }}
                options={options}
            />

        </Modal>
    );
}

export default EditUser;
