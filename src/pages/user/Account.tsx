import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, Button} from 'antd';
import {ColumnsType} from "antd/es/table";
import {getUserPageVO} from "../../api/api";
import LocalStoreUtil from "../../utils/LocalStoreUtil";
import {Role} from "../../api/types";
import {
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Auth from "../../compenents/Auth";
/**
 * 从后端接受的用户数据
 */
interface UserPageVO {
    id: string;
    username: string;
    roleIds: number[];
}


function getRoleName(id: number): string {
    const roles: Role[] = LocalStoreUtil.getAllRoles();
    const role = roles.find((role) => role.id === id);
    return role ? role.name : '';
}

// 定义列表属性（列名、值的表现格式、操作按钮等）
function generateColumns(): ColumnsType<UserPageVO> {
    return [
        {
            title: 'index',
            dataIndex: 'index',
            key: 'index',
            render: (_, record, index) => index + 1,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <>{text}</>,
        },
        {
            title: 'Role',
            dataIndex: 'roleIds',
            key: 'roleIds',
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
            render: (_, user) => (
                <Space size="middle">
                    <Auth permissionId={1003}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<FormOutlined />}
                            onClick={ e =>{
                                console.log("edit")
                            }}
                        />
                    </Auth>
                    <Auth permissionId={1002}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={ e =>{
                                console.log("delete")
                            }}
                        />
                    </Auth>
                </Space>
            ),
        },
    ];
}
// 获取列表
const columns = generateColumns();

function Account() {

    // 创建data，指定类型为UserPageVO[]
    const [data, setData] = useState<UserPageVO[]>([]);

    // 创建分页对象，指定属性
    const [pagination, setPagination] = useState({
        current: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0, // 总记录数
        showSizeChanger: true, // 是否显示每页显示数量的下拉框
        pageSizeOptions: ['5', '10', '15'], // 每页显示数量的选项
    });

    // 通过请求接口获取数据，并更新分页对象
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

    // 第二个参数为空的useEffect会在组件挂载的时候调用接口
    useEffect(() => {
        // 获取数据，设置页码初始页码和显示数
        fetchData(1, 5);
    }, []);

    // 更改页码或每页显示数
    const handleChange = async (current: number, pageSize: number, resetCurrent: boolean) => {
        let newCurrentPage = resetCurrent ? 1 : current; // 如果是每页显示数变化，则重置当前页码为1
        fetchData(newCurrentPage, pageSize);
    };

    return (
        <Table
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
    );
}

export default Account;
