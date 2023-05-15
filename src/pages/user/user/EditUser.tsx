import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { getRoleOptions } from '../../../utils/AttayUtil';
import { Option, UserPageVO } from "../../../api/types";
import { addUser, updateUser } from "../../../api/api";
import {useTranslation} from "react-i18next";

function EditUser({ isEdit, user, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void;
}) {

    const { t } = useTranslation();

    // 用于操作表单
    const [form] = Form.useForm();
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    /**
     * 提交表单
     */
    const handleOk = () => {
        // 表单加载中
        setConfirmLoading(true);
        // 验证表单数据有效性
        form.validateFields().then(async (values) => {
                console.log(values);
                if ((isEdit && await updateUser(values)) || (await addUser(values))) {
                    onUpdate();
                }
            }
        ).catch((error) => {
            message.error( t('validation_error'));
        }).finally(() => {
            setConfirmLoading(false)
        })
    };

    let options: Option[] = getRoleOptions();
    /**
     * 初始化表单数据
     */
    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                id: user.id,
                username: user.username,
                roleIds: user.roleIds.map(String)
            });
        }else{
            form.resetFields();
        }
    }, [modalOpen, user, isEdit, form]);

    return (
        <Modal
            title={isEdit ? t('user_account.edit_user.title_is_edit') : t('user_account.edit_user.title_is_add')}
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            cancelText={t('button.cancel')}
            okText={t('button.ok')}
            onOk={handleOk}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label={t('user.id')}
                    name="id"
                    style={{ display: 'none' }}
                    rules={[
                        { required: isEdit},
                    ]}
                >
                </Form.Item>
                <Form.Item
                    label={t('user.username')}
                    name="username"
                    rules={[
                        { required: true, message: t('user.username_rule_required') as string },
                        { min: 4, max: 12, message:  t('user.username_rule_length') as string }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('user.roleIds')}
                    name="roleIds"
                >
                    <Select
                        mode="multiple"
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUser;