import React, {useEffect, useState} from 'react';
import {Table, Space, Button, Row, Col, Tag, Popconfirm} from 'antd';
import {
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import LocalStoreUtil from "../../../utils/LocalStoreUtil";
import {Role, RolePageVO, UserPageVO} from "../../../api/types";
import Auth from "../../../compenents/Auth";
import {deleteRole, getAllPermissions, getAllRoles, getRolePageVO, updateMyPermissions} from "../../../api/api";
import EditUser from "../../user/user/EditUser";
import EditRole from "./EditRole";

function SystemRole() {

    // 数据刷新
    const [refresh, setRefresh] = useState(false);
    // EditUser组件的可见状态
    const [editOpen, setEditOpen] = useState(false);
    // EditUser执行编辑或新增
    const [isEdit, setIsEdit] = useState(true);
    // 存储单独操作的用户对象
    const [selectedRole, setSelectedRole] = useState<RolePageVO>({id:0,name:'',permissionIds:[]});
    // 存储批量操作的用户id
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
    // 等待响应数据返回期间按钮会显示loading动画
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    // 是否执行批量删除，用于区分显示loading动画
    const [isBatchDelete, setIsBatchDelete] = useState(false);
    /**
     * 定义列表属性（列名、值的表现格式、操作按钮等）
     */
    function generateColumns(): ColumnsType<RolePageVO> {
        return [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (_, __, index) => {
                    const { current, pageSize } = pagination;
                    return (current - 1) * pageSize + index + 1;
                },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                render: (text) => <>{text}</>,
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, role) => (
                    <Space size="middle">
                        <Auth permissionId={3003}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FormOutlined />}
                                onClick={()=>{
                                    setIsEdit(true)
                                    setSelectedRole(role)
                                    setEditOpen(true)
                                }}
                            />
                        </Auth>
                        <Auth permissionId={3002}>
                            <Popconfirm
                                title="Delete the Role"
                                description="Are you sure to delete this Role?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={deleteRoles}
                                onCancel={()=>{
                                    setSelectedRoleIds([])
                                }}
                            >
                                <Button
                                    type="primary"
                                    shape="circle"
                                    loading={confirmLoading && !isBatchDelete}
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={()=>{
                                        setSelectedRoleIds([role.id])
                                        setIsBatchDelete(false)
                                    }}
                                />
                            </Popconfirm>

                        </Auth>
                    </Space>
                ),
            },
        ];
    }

    /**
     * 用于存储列表数据的钩子函数
     */
    const [data, setData] = useState<RolePageVO[]>([]);

    /**
     * 用于存储分页对象的钩子函数
     */
    const [pagination, setPagination] = useState({
        current: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0, // 总记录数
        showSizeChanger: true, // 是否显示每页显示数量的下拉框
        pageSizeOptions: ['5', '10', '15'], // 每页显示数量的选项
    });

    /**
     * 通过请求接口获取数据，并更新分页对象
     * @param current
     * @param pageSize
     */
    const fetchData = async (current: number, pageSize: number) => {
        try {
            const response = await getRolePageVO(current, pageSize);
            // 更新列表数据
            setData(response.records);
            // 更新分页对象
            setPagination(prevPagination => ({
                ...prevPagination,
                current: current,
                pageSize: pageSize,
                total: response.total,
            }));
        }catch (e){

        }
    };

    /**
     * 挂载组件和refresh刷新时，重新获取列表数据
     * @param current
     * @param pageSize
     */
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [refresh]);

    const deleteRoles = async () => {
        setConfirmLoading(true)
        try {
            await deleteRole(selectedRoleIds);
            setRefresh(!refresh);
        }catch (e){

        }finally {
            setConfirmLoading(false)
        }
    };

    /**
     * 更改页码或每页显示数，若更改每页显示数，需要刷新回到第1页
     * @param current
     * @param pageSize
     * @param resetCurrent
     */
    const handleChange = async (current: number, pageSize: number, resetCurrent: boolean) => {
        let newCurrentPage = resetCurrent ? 1 : current; // 如果是每页显示数变化，则重置当前页码为1
        fetchData(newCurrentPage, pageSize);
    };

    return (
        <>
            <Row justify="end" gutter={15} style={{ marginBottom: 15 }}>
                <Col>
                    <Auth permissionId={3001}>
                        <Button
                            type="primary"
                            onClick={()=>{
                                setIsEdit(false);
                                // @ts-ignore
                                setSelectedRole({ id: null, name: null, permissionIds: [] })
                                setEditOpen(true)}}
                        >
                            New
                        </Button>
                    </Auth>
                </Col>
                <Col>
                    <Auth permissionId={3002}>
                        <Popconfirm
                            title="Delete roles"
                            description="Are you sure to delete those roles?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={deleteRoles}
                            onCancel={()=>{
                                setSelectedRoleIds([])
                            }}
                        >
                            <Button
                                type="primary"
                                danger={true}
                                loading={confirmLoading && isBatchDelete}
                                onClick={()=>{
                                    setIsBatchDelete(true)
                                }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </Auth>
                </Col>
            </Row>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys) => {
                        // @ts-ignore
                        setSelectedRoleIds(selectedRowKeys);
                    }
                }}
                columns={generateColumns()}
                dataSource={data.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                pagination={{
                    ...pagination, // 使用状态中的 pagination 属性
                    position: ['bottomCenter'], // 设置分页组件在表格底部居中显示
                    onChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, false),
                    onShowSizeChange: (currentPage, pageSize) => handleChange(currentPage, pageSize, true),
                    showTotal: (total, range) => `共 ${total} 条记录`, // 显示总数据数
                }}
            />
            <EditRole
                isEdit={isEdit}
                role={selectedRole}
                modalOpen={editOpen}
                setModalOpen={setEditOpen}
                onUpdate={()=>{
                    setRefresh(!refresh)
                    setEditOpen(false)
                    getAllRoles()
                    getAllPermissions()
                }}
            />
        </>
    );
}

export default SystemRole;
