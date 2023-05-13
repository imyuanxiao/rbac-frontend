import React, {useEffect, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Modal, Input, Select, message} from 'antd';
import { getRoleOptions } from '../../utils/AttayUtil';
import {Option, User, UserPageVO} from "../../api/types";
import {addUser, updateUser} from "../../api/api";
import {isValidUsername} from "../../utils/ValidUtil";

const options: Option[] = getRoleOptions()

function EditUser({ isEdit, user, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [username, setUsername] = useState<string>('');

    const handleRoleIdsChange = (value: any) => {
        setSelectedRoles([].concat(...value));
    };

    const handleOk = async () => {
        if (isEdit) {
            if(await updateUser({
                id: user.id,
                username: username as string,
                roleIds: selectedRoles as number[]
            } as User)){
                onUpdate();
            }
        } else {
            // 验证username属性
            if (!isValidUsername(username)) {
                message.error('Username must be between 4 and 12 characters in length.');
                return;
            }
            if (await addUser(
                {username: username as string, roleIds: selectedRoles as number[]
                })) {
                onUpdate();
            }
        }
    };

    useEffect(() => {
        setUsername(user.username);
        setSelectedRoles(user.roleIds);
    }, [user.username]);

    return (
        <Modal
            title={isEdit? "编辑数据" : "新增用户"}
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
                defaultValue={user.roleIds.map(String)}
                onChange={handleRoleIdsChange}
                style={{ width: '100%' }}
                options={options}
            />
        </Modal>
    );
}

export default EditUser;
