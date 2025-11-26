import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Card, Select, Space, message, Tag, Popconfirm } from "antd";
import { FaAngleLeft } from "react-icons/fa";
import { useGetVariantProductApisQuery } from "../../Redux/sampler/productApis";
import { useAddVariantMutation, useDeleteVariantMutation, useUpdateVariantMutation } from "../../Redux/businessApis/business_product/variantApis";
import toast from "react-hot-toast";

const { Option } = Select;

function AddVariant() {
    const { productId, name } = useParams();
    const location = useLocation();
    const [form] = Form.useForm();
    const [editingVariant, setEditingVariant] = useState(null);
    const [addVariant, { isLoading: addVariantLoading }] = useAddVariantMutation()
    const [updateVariant, { isLoading: updateVariantLoading }] = useUpdateVariantMutation()
    const [deleteVariant] = useDeleteVariantMutation()
    const navigate = useNavigate();

    const {
        data: variantProduct,
        isLoading: variantProductLoading,
        refetch,
    } = useGetVariantProductApisQuery({ id: productId });

    const onFinish = async (values) => {
        const formData = new FormData();
        const formValue = {
            product: productId,
            variantOption: values.variantOption,
            variantValue: values.variantValue,
            price: Number(values.price)
        }

        formData.append("data", JSON.stringify(formValue));

        try {
            if (editingVariant) {
                await updateVariant({ data: formData, id: editingVariant?._id }).unwrap().then((res) => {
                    if (res.success) {
                        toast.dismiss()
                        toast.success(res.message)
                        form.resetFields()
                        setEditingVariant(null)
                        refetch()
                    }
                })
            } else {
                await addVariant(formData).unwrap().then((res) => {
                    console.log(res)
                    if (res.success) {
                        toast.dismiss()
                        toast.success(res.message)
                        form.resetFields()
                        // setFileList([])
                        setEditingVariant(null)
                        refetch()
                    }
                })
            }

            form.resetFields();
            // setFileList([]);
            setEditingVariant(null);
            refetch(); // refresh variant list
        } catch (error) {
            message.error("Something went wrong!");
        }
    };

    const handleEdit = (variant) => {
        setEditingVariant(variant);
        form.setFieldsValue({
            variantOption: variant?.variantOption,
            variantValue: variant?.variantValue,
            price: variant?.price,
            color: variant?.color || undefined,
            size: variant?.size || undefined,
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteVariant(id).unwrap().then((res) => {
                console.log(res)
                if (res.success) {
                    toast.success(res.message)
                    refetch()
                }
            })
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }
    console.log(variantProduct)
    return (
        <div className="w-full">
            <div
                className="flex items-center gap-2 mb-12 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
                onClick={() => navigate(-1)}
            >
                <FaAngleLeft />
                <h1 className="!mt-[10px]">Back</h1>
            </div>

            <h2 className="text-2xl mb-4">
                {editingVariant ? "Update Variant" : "Add Variant"} for Product:{" "}
                {location?.state?.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card bordered className="rounded-2xl p-4">
                    <Form
                        requiredMark={false}
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                        className="grid grid-cols-1 gap-3"
                    >
                        <Form.Item
                            name="variantOption"
                            label="Variant Option"
                            rules={[{ required: true, message: "Please select a variant option" }]}
                        >
                            <Select disabled={editingVariant} placeholder="Select variant option">
                                <Option value="Color">Color</Option>
                                <Option value="Size">Size</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="variantValue"
                            label="Variant Value"
                            rules={[{ required: true, message: "Variant value is required" }]}
                        >
                            <Input placeholder="Enter variant value" />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: "Price is required" }]}
                        >
                            <Input type="number" placeholder="Enter price" />
                        </Form.Item>

                        {/* Upload Images */}
                        {/* <Form.Item label="Upload Images">
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
                        </Form.Item> */}

                        {/* Submit Button */}
                        <Form.Item>
                            <Button loading={addVariantLoading || updateVariantLoading} type="primary" htmlType="submit" block>
                                {editingVariant ? "Update Variant" : "Add Variant"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>


                <Card bordered className="rounded-2xl p-4">
                    <h3 className="text-lg font-semibold mb-4">Existing Variants</h3>
                    {variantProductLoading ? (
                        <p>Loading variants...</p>
                    ) : variantProduct?.data?.length ? (
                        <Space direction="vertical" className="w-full">
                            {variantProduct.data.map((variant) => (
                                <Card
                                    key={variant?._id}
                                    size="small"
                                    className="border rounded-lg"
                                    title={
                                        <div className="flex flex-col p-1 items-start">
                                            <span className="text-sm text-[#999Eab]">Variant Option: {variant?.variantOption}</span>
                                            {/* <span>Variant Value: {variant?.variantValue}</span> */}
                                        </div>
                                    }
                                    extra={
                                        <Space>
                                            <Popconfirm
                                                okText="Delete"
                                                cancelText="Cancel"
                                                title="Are you sure you want to delete this variant?"
                                                onConfirm={() => handleDelete(variant?._id)}
                                                placement="rightBottom"
                                            >
                                                <Button
                                                    size="small"
                                                    danger
                                                    type="link"
                                                >
                                                    Delete
                                                </Button>
                                            </Popconfirm>
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => handleEdit(variant)}
                                            >
                                                Edit
                                            </Button>
                                        </Space>
                                    }
                                >
                                    {/* {variant?.images && variant?.images.length > 0 && (
                                        <div className="flex items-center mb-1 gap-2">
                                            {
                                                variant?.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={variant?.variantValue}
                                                        className="w-24 h-24 object-cover"
                                                    />
                                                ))
                                            }
                                        </div>
                                    )} */}
                                    <Tag>Price: ${variant?.price}</Tag>
                                    {variant?.variantOption === "Color" && <Tag>Color: {variant?.variantValue}</Tag>}
                                    {variant?.variantOption === "Size" && <Tag>Size: {variant?.variantValue}</Tag>}
                                </Card>
                            ))}
                        </Space>
                    ) : (
                        <p>No variants added yet.</p>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default AddVariant;
