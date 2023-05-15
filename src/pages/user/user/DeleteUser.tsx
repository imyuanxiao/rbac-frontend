import React, {useState} from 'react';
import {Modal} from 'antd';
import {UserPageVO} from "../../../api/types";
import {deleteUser} from "../../../api/api";
import {useTranslation} from "react-i18next";

function DeleteUser({ isBatchDelete, userIds, user, modalOpen, setModalOpen, onUpdate }: {
    isBatchDelete: boolean;
    userIds: number[]
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void }) {

    const { t } = useTranslation();

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const deleteConfirmationText = isBatchDelete
        ?  t('user_account.delete_user.batch_delete')
        : t('user_account.delete_user.delete') + ` ${user.username}？`;

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
            title={t('user_account.delete_user.title')}
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            cancelText={t('button.cancel')}
            okText={t('button.ok')}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <div>{deleteConfirmationText}</div>
            <div>{t('user_account.delete_user.tips')}</div>
        </Modal>
    );
}

export default DeleteUser;
