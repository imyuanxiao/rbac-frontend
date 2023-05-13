import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { getRoleOptions } from '../../utils/AttayUtil';
import { Option, UserPageVO } from "../../api/types";
import { addUser, updateUser } from "../../api/api";

const options: Option[] = getRoleOptions();

function EditUser({ isEdit, user, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    user: UserPageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void;
}) {

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
            message.error('Form validation failed.');
        }).finally(() => {
            setConfirmLoading(false)
        })
    };

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
            title={isEdit ? "编辑数据" : "新增用户"}
            open={modalOpen}
            onCancel={() => {
                setModalOpen(false);
            }}
            onOk={handleOk}
            destroyOnClose={true}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="userId"
                    name="id"
                    style={{ display: 'none' }}
                    rules={[
                        { required: isEdit, message: 'Please input your username!' },
                    ]}
                >
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 4, max: 12, message: 'Length should be between 4 and 12 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
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