import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Upload, Card, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";
import SelectField from "./SelectField";
import TextArea from "antd/es/input/TextArea";
import { useCategorySectionApisQuery } from "../../Redux/sampler/categoryApis";
import { FaAngleLeft } from "react-icons/fa";
import JoditComponent from "../Shared/JoditComponent";
import toast from "react-hot-toast";
import { useUpdateProductMutation } from "../../Redux/businessApis/business_product/businessCreateProduct";
import { useGetSingleProductApisQuery } from "../../Redux/sampler/productApis";

function EditProduct() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [content, setContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { data: singleProduct } = useGetSingleProductApisQuery(
    { id: location?.state?.id },
    { skip: !location?.state?.id }
  );

  const { data: categories, isLoading: categoryLoading } = useCategorySectionApisQuery();
  const [updateProduct, { isLoading: updateProductLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (singleProduct) {
      form.setFieldsValue({
        name: singleProduct?.data?.name,
        shortDescription: singleProduct?.data?.shortDescription,
        category: singleProduct?.data?.category?._id,
        brand: singleProduct?.data?.brand,
        price: singleProduct?.data?.price,
        stock: singleProduct?.data?.stock,
        tags: singleProduct?.data?.tags?.join(", "),
        description: singleProduct?.data?.description,
        weight: singleProduct?.data?.weight,
        length: singleProduct?.data?.length,
        width: singleProduct?.data?.width,
        height: singleProduct?.data?.height,
      });

      setContent(singleProduct?.data?.description);

      const existingImages = singleProduct?.data?.images?.map((img, index) => ({
        uid: `-${index}`,
        name: img.split("/").pop(),
        status: "done",
        url: img,
      })) || [];
      setFileList(existingImages);
    }
  }, [singleProduct, form]);


  const handleFileChange = ({ fileList: newFileList, file, event }) => {
    if (file.status === "removed" && file.url) {
      setDeletedImages((prev) => [...prev, file.url]);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      if (!content.trim()) throw new Error("Please enter Description!");
      if (fileList.length === 0) throw new Error("Please upload images!");
      if (!values.stock) throw new Error("Please enter stock!");

      const tags = values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const formData = new FormData();
      const data = {
        name: values.name,
        shortDescription: values.shortDescription,
        category: values.category,
        brand: values.brand,
        price: values.price,
        stock: values.stock,
        tags,
        description: content,
        deletedImages,
        weight: parseFloat(values.weight),
        length: parseFloat(values.length),
        width: parseFloat(values.width),
        height: parseFloat(values.height),
      }

      formData.append("data", JSON.stringify(data));

      fileList.forEach((file) => {
        if (!file.url && file.originFileObj) {
          formData.append("product_image", file.originFileObj);
        }
      });

      await updateProduct({ id: location?.state?.id, data: formData }).unwrap().then((res) => {
        if (res.success) {
          toast.dismiss()
          toast.success(res.message);
          navigate(-1);
        }
      })
    } catch (error) {
      toast.dismiss()
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <React.Fragment>
      <div
        className="flex items-center gap-2 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-[10px]">Back</h1>
      </div>

      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex justify-between items-start md:flex-row flex-col md:items-center mb-4">
          <h2 className="text-2xl">Edit Product</h2>
          <Button
            loading={updateProductLoading}
            disabled={updateProductLoading}
            type="primary"
            onClick={() => form.submit()}
          >
            Update
          </Button>
        </div>

        <FormWrapper
          form={form}
          onFinish={onFinish}
          className="border-[0.2px] border-[#eee]  gap-2 grid grid-cols-2 rounded-2xl !p-4"
        >
          <div className="flex items-center col-span-2 gap-2">
            <InputField
              label="Item Name"
              name="name"
              rules={[{ required: true, message: "Please enter item name!" }]}
              placeholder="Enter item name"
              type="text"
              className="w-full"
            />
            <SelectField
              loading={categoryLoading}
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
              options={categories?.data?.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}

              placeholder="Select category"
              className="w-full"
            />
          </div>

          <div className="flex items-center col-span-2 gap-2">
            <InputField
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please enter brand name!" }]}
              placeholder="Enter brand name"
              type="text"
              className="w-full"
            />
            <InputField
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Please enter stock!" }]}
              placeholder="Enter stock"
              type="number"
              className="w-full"
            />
          </div>

          <div className="flex items-center col-span-2 gap-2">
            <InputField
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price!" }]}
              placeholder="Enter price"
              type="number"
              className="w-full"
            />
            <InputField
              label={
                <span>
                  Tags <small className="text-[#999Eab]">(separated by commas)</small>
                </span>
              }
              name="tags"
              rules={[{ required: true, message: "Please enter tags!" }]}
              placeholder="Enter tags"
              type="text"
              className="w-full"
            />
          </div>
          <Divider className="!col-span-2">
            <h1>For parcel details</h1>
          </Divider>

          <InputField
            label="Weight (in lbs)"
            name="weight"
            rules={[{ required: true, message: "Please enter weight (in lbs) !" }]}
            placeholder="Enter weight"
            type="number"
            className="w-full"
          />
          <InputField
            label="Length (in inches)"
            name="length"
            rules={[{ required: true, message: "Please enter length (in inches) !" }]}
            placeholder="Enter length"
            type="number"
            className="w-full"
          />
          <InputField
            label="Width (in inches)"
            name="width"
            rules={[{ required: true, message: "Please enter width (in inches)!" }]}
            placeholder="Enter width"
            type="number"
            className="w-full"
          />
          <InputField
            label="Height (in inches)"
            name="height"
            rules={[{ required: true, message: "Please enter height (in inches)!" }]}
            placeholder="Enter height"
            type="number"
            className="w-full"
          />

          <Form.Item
            label="Item short Description"
            name="shortDescription"
            rules={[{ required: true, message: "Please enter item description!" }]}
            className="col-span-2"
          >
            <TextArea rows={6} placeholder="Enter item description" />
          </Form.Item>

          <Form.Item label="Upload Images" className="col-span-2">
            <Upload
              multiple
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleFileChange}
              onRemove={(file) => {
                if (file.url) {
                  setDeletedImages((prev) => [...prev, file.url]);
                }
              }}
            >
              <div className="flex items-center flex-col">
                <UploadOutlined />
                Upload Images
              </div>
            </Upload>
          </Form.Item>

          <div className="col-span-2">
            <JoditComponent content={content} setContent={setContent} title="Description" />
          </div>
        </FormWrapper>
      </div>
    </React.Fragment>
  );
}

export default EditProduct;
