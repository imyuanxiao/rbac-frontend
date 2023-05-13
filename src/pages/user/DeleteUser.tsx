import React, {useState} from 'react';
import {Modal} from 'antd';
import {UserPageVO} from "../../api/types";
import {deleteUser} from "../../api/api";

function DeleteUser({ isBatchDelete, userIds, user, modalOpen, setModalOpen, onUpdate }: {
    isBatchDelete: boolean;
    userIds: number[]
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const deleteConfirmationText = isBatchDelete
        ? '请确认是否批量删除用户？'
        : `请确认是否删除用户: ${user.username}？`;

    const handleOk = async () => {
        setConfirmLoading(true)
        if (await deleteUser(isBatchDelete? userIds : [user.id])) {
            setConfirmLoading(false)
            onUpdate();
        }else{
            setConfirmLoading(false)
        }
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
            confirmLoading={confirmLoading}
        >
            <div>{deleteConfirmationText}</div>
            <div>注意：删除后无法恢复！</div>
        </Modal>
    );
}

export default DeleteUser;
