import React from 'react';
import {Modal} from 'antd';
import {UserPageVO} from "../../api/types";
import {deleteUser} from "../../api/api";

function DeleteUser({ user, modalOpen, setModalOpen, onUpdate }: {
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const handleOk = () => {
        deleteUser([user.id])
            .then(onUpdate)
    };

    return (
        <Modal
            title="删除用户"
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            cancelText="取消"
            okText="确认"
            destroyOnClose={true}
        >
            <div>请确认是否删除用户: <b>{user.username}</b>?</div>
            <div>注意：删除后无法恢复！</div>
        </Modal>
    );
}

export default DeleteUser;
