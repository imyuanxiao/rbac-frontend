import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, message, Tree} from 'antd';
import {getPermissionTree} from '../../../utils/AttayUtil';
import {RolePageVO} from "../../../api/types";
import {addRole, updateRole} from "../../../api/api";
import {DataNode} from "antd/lib/tree";
import LocalStoreUtil from "../../../utils/LocalStoreUtil";
import {useTranslation} from "react-i18next";

function EditRole({ isEdit, role, modalOpen, setModalOpen, onUpdate }: {
    isEdit: boolean;
    role: RolePageVO;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onUpdate: () => void;
}) {

    const { t } = useTranslation();


    // 用于操作表单
    const [form] = Form.useForm();
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<number[]>();

    /**
     * 提交表单
     */
    const handleOk = () => {
        // 表单加载中
        setConfirmLoading(true);
        // 验证表单数据有效性
        form.validateFields().then(async (values) => {
                const newRole = {
                    id: values.id,
                    name: values.name,
                    permissionIds: checkedKeys
                }
                if ((isEdit && await updateRole(newRole)) || (await addRole(newRole))) {
                    onUpdate();
                }
            }
        ).catch((error) => {
            message.error(t('message.validation_error'));
        }).finally(() => {
            setConfirmLoading(false)
        })
    };

    const treeData: DataNode[] = getPermissionTree(LocalStoreUtil.getAllPermissions(), 0);

    /**
     * 初始化表单数据
     */
    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                id: role.id,
                name: role.name,
            });
        }else{
            form.resetFields();
        }
    }, [modalOpen, role, form]);

    /**
     * Tree控件默认只会返回子菜单全选中的父菜单key，我们需要简单处理一下
     * @param checkedKeys
     */
    const updateCheckedKeys = (checkedKeys: number[]): number[] => {
        const newKeys = new Set(checkedKeys);
        for (const key of checkedKeys) {
            if(Math.floor(key / 1000) != 0){
                newKeys.add(Math.floor(key / 1000));
            }
        }
        return Array.from(newKeys);
    };

    /**
     * 根据用户权限，计算Tree中需要checked的key
      * @param arr
     */
    function filterArray(arr: number[]): number[] {
        const toDelete = new Set<number>();
        for(const num of arr){
            if(arr.includes(Math.floor(num/1000))){
                toDelete.add(Math.floor(num/1000))
            }
        }
        return arr.filter((num) => !toDelete.has(num));
    }

    return (
        <Modal
            title={"编辑数据" }
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
                    label={t('role.id')}
                    name="id"
                    style={{ display: 'none' }}
                    rules={[
                        { required: isEdit},
                    ]}
                >
                </Form.Item>
                <Form.Item
                    label={t('role.name')}
                    name="name"
                    rules={[
                        { required: true, message: t('role.name_rule_required') as string },
                        { min: 4, max: 20, message: t('role.name_rule_length') as string }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('role.permissionIds')}
                >

                    <div style={{ maxHeight: '200px', overflow: 'auto' , border:'solid 1px'}}>
                        <Tree
                            checkable
                            // 逆向updateCheckedKeys的简单方式，只需要操作权限
                            defaultCheckedKeys={filterArray(role.permissionIds)}
                            onCheck={(checkedKeys)=>{
                                const newKeys = updateCheckedKeys(checkedKeys as number[]);
                                setCheckedKeys(newKeys)
                            }}
                            treeData={treeData}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditRole;