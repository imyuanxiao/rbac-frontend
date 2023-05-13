import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, Button, Row, Col} from 'antd';
import {
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import {getUserPageVO} from "../../api/api";
import {Role, UserPageVO} from "../../api/types";
import Auth from "../../compenents/Auth";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

function Account() {

    // 数据刷新
    const [refresh, setRefresh] = useState(false);
    // EditUser组件的可见状态
    const [editOpen, setEditOpen] = useState(false);
    // EditUser执行编辑或新增
    const [isEdit, setIsEdit] = useState(true);
    // DeleteUser组件的可见状态
    const [deleteOpen, setDeleteOpen] = useState(false);
    // DeleteUser是否执行批量删除
    const [isBatchDelete, setIsBatchDelete] = useState(false);
    // 存储单独操作的用户对象
    const [selectedUser, setSelectedUser] = useState<UserPageVO>({id:0,username:'',roleIds:[]});
    // 存储批量操作的用户id
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    /**
     * 通过id获取角色名称
     * @param id
     */
    function getRoleName(id: number): string {
        const roles: Role[] = LocalStoreUtil.getAllRoles();
        const role = roles.find((role) => role.id === id);
        return role ? role.name : '';
    }

    /**
     * 定义列表属性（列名、值的表现格式、操作按钮等）
     */
    function generateColumns(): ColumnsType<UserPageVO> {
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
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                align: 'center',
                render: (text) => <>{text}</>,
            },
            {
                title: 'Role',
                dataIndex: 'roleIds',
                key: 'roleIds',
                align: 'center',
                render: (roleIds: number[]) => (
                    <>
                        {roleIds.map((roleId) => {
                            // 为不同角色赋予不同颜色的标签
                            let color = (roleId === 1 || roleId === 2)
                                ? 'geekblue' : roleId === 3 ? 'green' : 'default';
                            return (
                                <Tag color={color} key={roleId}>
                                    {getRoleName(roleId)}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, user) => (
                    <Space size="middle">
                        <Auth permissionId={1003}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FormOutlined />}
                                onClick={()=>{
                                    setIsEdit(true)
                                    setSelectedUser(user)
                                    setEditOpen(true)
                                }}
                            />
                        </Auth>
                        <Auth permissionId={1002}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                danger
                                onClick={()=>{
                                    setIsBatchDelete(false)
                                    setSelectedUser(user)
                                    setDeleteOpen(true)
                                }}
                            />
                        </Auth>
                    </Space>
                ),
            },
        ];
    }

    /**
     * 获取列表
     */
    const columns = generateColumns();

    /**
     * 用于存储列表数据的钩子函数
     */
    const [data, setData] = useState<UserPageVO[]>([]);

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
            const response = await getUserPageVO(current, pageSize);
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
                    <Auth permissionId={1001}>
                        <Button
                            type="primary"
                            onClick={()=>{
                                setIsEdit(false);
                                // @ts-ignore
                                setSelectedUser({ id: null, username: null, roleIds: [] })
                                setEditOpen(true)}}
                        >
                            New
                        </Button>
                    </Auth>
                </Col>
                <Col>
                    <Auth permissionId={1002}>
                        <Button
                            type="primary"
                            danger={true}
                            onClick={()=>{
                                setIsBatchDelete(true);
                                setDeleteOpen(true);
                            }}
                        >
                            Delete
                        </Button>
                    </Auth>
                </Col>
            </Row>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys) => {
                        // @ts-ignore
                        setSelectedUserIds(selectedRowKeys);
                    }
                }}
                columns={columns}
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
            <EditUser
                isEdit={isEdit}
                user={selectedUser}
                modalOpen={editOpen}
                setModalOpen={setEditOpen}
                onUpdate={()=>{
                    setRefresh(!refresh)
                    setEditOpen(false)
                }}
            />
            <DeleteUser
                isBatchDelete={isBatchDelete}
                userIds={selectedUserIds}
                user={selectedUser}
                modalOpen={deleteOpen}
                setModalOpen={setDeleteOpen}
                onUpdate={()=>{
                    setRefresh(!refresh)
                    setDeleteOpen(false)
                }}/>
        </>

    );
}

export default Account;
