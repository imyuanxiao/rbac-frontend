import {Form, Input, Button, Card, Upload, UploadFile, UploadProps, Modal, message} from 'antd';
import {User} from "../../api/types";
import React, {useState} from "react";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {useTranslation} from "react-i18next";


/**
 * 无返回url时的编码方法
 * @param file
 */
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

/**
 * 图片上传前的处理
 * @param file
 */
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function UserForm({ user }:{
    user:User
}) {
    const { t } = useTranslation();


    const [form] = Form.useForm();
    // 表单提交
    const handleSubmit = async () => {
        try {
            await form.validateFields(); // 等待表单验证完成
            const values = form.getFieldsValue(); // 获取表单数据
            console.log(values);
            // 执行后续逻辑
            message.info(t('user.unfinished'))
        } catch (error) {
            message.error(t('user.validation_error'));
        }
    };


    /**
     * 头像上传相关的代码
     */
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        // 模拟图片上传过程
        setLoading(true);
        // 图片上传2秒后显示
        setTimeout(()=>{
            getBase64(info.file.originFileObj as RcFile).then((base64) => {
                setLoading(false);
                setImageUrl(base64);
            });
        }, 2000)
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    /**
     * 关闭图片预览
     */
    const handleCancel = () => {
        setPreviewOpen(false);
    }
    /**
     * 预览图片。如果图片没有预览地址或 URL，则使用 getBase64 方法将图片转换为 Base64 编码
     * @param file
     */
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    return (
        <Card
            style={{
                backgroundColor: "#f3f3f3",
                lineHeight:"2em",
            }}>
            <Form
                form={form}
                initialValues={user}
                onFinish={handleSubmit}
            >
                <Form.Item label="id" name="id" style={{display: "none"}}>
                    <Input />
                </Form.Item>
                <Form.Item label={t('user.avatar')}>
                    <Upload
                        listType="picture-circle"
                        beforeUpload={beforeUpload}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        showUploadList={false}
                    >
                        {imageUrl == '' ? uploadButton : null}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>
                <Form.Item label={t('user.username')} name="username">
                    <Input />
                </Form.Item>
                <Form.Item label={t('user.phone')} name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label={t('user.email')} name="email">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('button.update')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default UserForm;