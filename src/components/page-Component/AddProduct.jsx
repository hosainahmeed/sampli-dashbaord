import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Upload,
  Input,
  Descriptions,
  Card,
  Collapse,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";
import SelectField from "./SelectField";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const { Panel } = Collapse;

function AddProduct() {
  const [form] = Form.useForm();
  const [variantForm] = Form.useForm();
  const [variants, setVariants] = useState([]);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [productFileList, setProductFileList] = useState([]);
  const [variantFileList, setVariantFileList] = useState([]);
  const [editingVariant, setEditingVariant] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      category: values.category,
      product_images: productFileList.map((file) => file.originFileObj),
      variants: variants.map((variant) => ({
        color: variant.color || "",
        images: variantFileList.map((file) => file.originFileObj),
        price: Number(variant.price) || 0,
        size: variant.size || "",
        sku: variant.sku || "",
        stock: Number(variant.stock) || 0,
        weight: variant.weight || "",
      })),
      variant_images: variantFileList.map((file) => file.originFileObj),
    };

    console.log("Formatted Data:", data);

    form.resetFields();
    setVariants([]);
    setProductFileList([]);
    setVariantFileList([]);
  };

  const handleProductFileChange = ({ fileList: newFileList }) => {
    setProductFileList(newFileList);
  };

  const handleVariantFileChange = ({ fileList: newFileList }) => {
    setVariantFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleVariantSubmit = (values) => {
    if (editingVariant) {
      const updatedVariants = variants.map((variant) =>
        variant.sku === editingVariant.sku ? { ...variant, ...values } : variant
      );
      setVariants(updatedVariants);
      setEditingVariant(null);
    } else {
      setVariants([...variants, values]);
    }
    variantForm.resetFields();
    setShowVariantForm(false);
  };

  const handleDeleteVariant = (sku) => {
    setVariants(variants.filter((variant) => variant.sku !== sku));
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setShowVariantForm(true);
    variantForm.setFieldsValue(variant);
  };
  console.log(variants);

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 mb-12 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-[10px]">Back </h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Add new product</h2>
        <div className="flex gap-2">
          <Button type="default" onClick={() => form.submit()}>
            Save as Draft
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Publish
          </Button>
        </div>
      </div>
      <div className="flex xl:flex-row sm:flex-col">
        <div className="flex gap-12 xl:flex-row sm:flex-col flex-col w-full">
          <div className="flex-1">
            <h2 className="text-2xl">Item Details</h2>
            <FormWrapper
              form={form}
              onFinish={onFinish}
              className="border-[0.2px] border-[#eee] gap-2 grid grid-cols-2  rounded-2xl !p-4"
            >
              <InputField
                label="Item Name"
                name="name"
                rules={[{ required: true, message: "Please enter item name!" }]}
                placeholder="Enter item name"
                type="text"
                className="col-span-2"
              />
              <Form.Item
                label="Item Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter item description!" },
                ]}
                className="col-span-2"
              >
                <TextArea rows={6} placeholder="Enter item description" />
              </Form.Item>
              <SelectField
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
                options={[
                  { value: "Category 1", label: "Category 1" },
                  { value: "Category 2", label: "Category 2" },
                  { value: "Category 3", label: "Category 3" },
                ]}
                placeholder="Select category"
                className="w-full"
              />

              {/* Image Upload */}
              <Form.Item label="Upload Images" className="col-span-2">
                <Upload
                  multiple
                  listType="picture-card"
                  fileList={productFileList}
                  beforeUpload={() => false}
                  onChange={handleProductFileChange}
                >
                  <div className="flex items-center flex-col">
                    <UploadOutlined />
                    Upload Images
                  </div>
                </Upload>
              </Form.Item>
            </FormWrapper>
          </div>

          {/* Variants Section */}
          <div className="flex-1">
            <h3 className="text-2xl">Product Variants</h3>
            <Card bordered={false} className="rounded-2xl shadow-md">
              {variants.length > 0 ? (
                <Collapse accordion>
                  {variants.map((variant) => (
                    <Panel
                      header={`Variant: ${variant.sku}`}
                      key={variant.sku}
                      extra={
                        !editingVariant && !showVariantForm ? (
                          <div className="flex gap-2">
                            <Button
                              type="text"
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditVariant(variant);
                              }}
                            >
                              Edit
                            </Button>

                            {!showVariantForm && (
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteVariant(variant.sku);
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        ) : (
                          ""
                        )
                      }
                    >
                      <div className="flex flex-col gap-1 mt-2">
                        <h3 className="text-lg font-semibold">
                          {variant.name}
                        </h3>
                        <p className="text-sm">SKU: {variant.sku}</p>
                        <p className="text-sm">Price: ${variant.price}</p>
                        <p className="text-sm">Size: {variant.size}</p>
                        <p className="text-sm">Stock: {variant.stock}</p>
                        <p className="text-sm">Weight: {variant.weight} kg</p>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <Card className="flex items-center justify-center col-span-full p-8">
                  <div className="flex flex-col items-center">
                    <h1>No variants added</h1>
                    <p>Click "Add Variant" to get started.</p>
                  </div>
                </Card>
              )}

              <div className="flex justify-center mt-4">
                {!showVariantForm && (
                  <Button
                    type="primary"
                    onClick={() => setShowVariantForm(true)}
                  >
                    Add Variant
                  </Button>
                )}
              </div>

              {showVariantForm && (
                <Form
                  requiredMark={false}
                  form={variantForm}
                  onFinish={handleVariantSubmit}
                  layout="horizontal"
                  className="grid grid-cols-2 gap-3 mt-4"
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
                    rules={[{ required: true, message: "Price is required!" }]}
                    name="price"
                    label="Price"
                  >
                    <Input type="number" placeholder="Enter price" />
                  </Form.Item>
                  <Form.Item name="stock" label="Stock">
                    <Input type="number" placeholder="Enter stock quantity" />
                  </Form.Item>
                  <Form.Item name={"variant_images"} className="!w-full">
                    <Upload
                      multiple
                      listType="picture-card"
                      fileList={variantFileList}
                      beforeUpload={() => false}
                      onChange={handleVariantFileChange}
                      style={{ width: "100%" }}
                    >
                      <div className="flex w-full items-center flex-col">
                        <UploadOutlined />
                        Upload Images
                      </div>
                    </Upload>
                  </Form.Item>
                  <Form.Item className="col-span-2">
                    <Button type="primary" htmlType="submit">
                      {editingVariant ? "Update Variant" : "Submit Variant"}
                    </Button>
                    <Button
                      className="!ml-2"
                      type="default"
                      onClick={() => {
                        setShowVariantForm(false);
                        setEditingVariant(null);
                      }}
                    >
                      Cancelled
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
