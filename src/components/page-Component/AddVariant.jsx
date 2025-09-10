import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Upload, Button, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";

function AddVariant() {
    const { productId } = useParams();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = async (values) => {
        const variantData = {
            productId,
            sku: values.sku,
            price: Number(values.price),
            size: values.size,
            stock: Number(values.stock),
            weight: values.weight,
            color: values.color,
            images: fileList.map((file) => file.originFileObj),
        };

        try {
            const res = await axios.post(`/api/products/${productId}/variants`, variantData);
            console.log("✅ Variant Added:", res.data);

            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error("❌ Error adding variant", error);
        }
    };

    return (
        <div className="w-full">
            <div
                className="flex items-center gap-2 mb-12 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
                onClick={() => navigate(-1)}
            >
                <FaAngleLeft />
                <h1 className="!mt-[10px]">Back</h1>
            </div>

            <h2 className="text-2xl mb-4">Add Variant for Product: {productId}</h2>

            <Card bordered={false} className="rounded-2xl shadow-md p-4">
                <Form
                    requiredMark={false}
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="grid grid-cols-2 gap-3"
                >
                    <Form.Item
                        name="sku"
                        label="SKU"
                        rules={[{ required: true, message: "SKU is required!" }]}
                    >
                        <Input placeholder="Enter SKU" />
                    </Form.Item>

                    <Form.Item name="color" label="Color">
                        <Input placeholder="Enter color (optional)" />
                    </Form.Item>

                    <Form.Item name="size" label="Size">
                        <Input placeholder="Enter size (optional)" />
                    </Form.Item>

                    <Form.Item name="weight" label="Weight">
                        <Input placeholder="Enter weight (optional)" />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: "Price is required!" }]}
                    >
                        <Input type="number" placeholder="Enter price" />
                    </Form.Item>

                    <Form.Item name="stock" label="Stock">
                        <Input type="number" placeholder="Enter stock quantity" />
                    </Form.Item>

                    <Form.Item label="Upload Variant Images" className="col-span-2">
                        <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            <div className="flex items-center flex-col">
                                <UploadOutlined />
                                Upload
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item className="col-span-2">
                        <Button type="primary" htmlType="submit">
                            Add Variant
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default AddVariant;
