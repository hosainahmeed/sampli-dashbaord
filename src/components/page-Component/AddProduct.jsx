import React, { useCallback, useMemo, useState } from "react";
import { Form, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";
import SelectField from "./SelectField";
import TextArea from "antd/es/input/TextArea";
import { useCategorySectionApisQuery } from "../../Redux/sampler/categoryApis";
import { FaAngleLeft } from "react-icons/fa";
import JoditComponent from "../Shared/JoditComponent";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "../../Redux/businessApis/business_product/businessCreateProduct";

function AddProduct() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');
  const { data: categories, isLoading: categoryLoading } = useCategorySectionApisQuery();
  const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation()
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      let tags = [];
      if (content === '') {
        throw new Error('Please enter Description!');
      }
      if (fileList.length === 0) {
        throw new Error('Please upload images!');
      }

      if (!values.stock) {
        throw new Error('Please enter stock!');
      }

      if (values.tags.includes(',')) {
        tags = values.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      } else {
        tags = [values.tags];
      }

      const formData = new FormData()
      const data = {
        name: values.name,
        shortDescription: values.shortDescription,
        category: values.category,
        brand: values.brand,
        price: values.price,
        stock: values.stock,
        tags: tags,
        description: content,
      }
      formData.append("data", JSON.stringify(data));
      fileList.forEach((file) => {
        formData.append("product_image", file.originFileObj);
      });

      await createProduct(formData).unwrap().then((res) => {
        console.log(res)
        if (res.success) {
          toast.success(res.message)
          setProductId(res?.data?.bussiness)
          form.resetFields()
          setContent('')
          setFileList([])
          setOpenSuccessModal(true)
        }
      })
    } catch (error) {
      console.log(error)
      toast.error(error?.message || 'Something went wrong!');
    }
  };

  const handleAddVariant = useCallback((productId) => {
    navigate(`/add-variant/${productId}`)
  }, [navigate])

  return (
    <React.Fragment>
      {
        openSuccessModal &&
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2  rounded border border-gray-200 -translate-y-1/2 z-50 bg-white px-4 py-2">
          <h1>Product added successfully!</h1>
          <p>Are you want to add variant?</p>
          <div className="flex gap-2">
            <button onClick={() => setOpenSuccessModal(false)} type="default">No</button>
            <button onClick={() => handleAddVariant(productId)} type="primary">Yes</button>
          </div>
        </div>
      }
      <div
        className="flex items-center gap-2 mb-12 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-[10px]">Back</h1>
      </div>
      <div className="w-full max-w-screen-lg mx-auto">

        <div className="flex justify-between items-start md:flex-row flex-col md:items-center mb-4">
          <h2 className="text-2xl">Add New Product</h2>
          <div className="flex gap-2">
            <Button type="default" onClick={() => form.submit()}>
              Save as Draft
            </Button>
            <Button loading={createProductLoading} disabled={createProductLoading} type="primary" onClick={() => form.submit()}>
              Publish
            </Button>
          </div>
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
              options={categories?.data?.map((category) => ({
                value: category?._id,
                label: category?.name,
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
              label={<span>Tags <small className="text-[#999Eab]">(please enter tags separated by commas)</small></span>}
              name="tags"
              rules={[{ required: true, message: "Please enter tags!" }]}
              placeholder="Enter tags"
              type="text"
              className="w-full"
            />
          </div>

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

export default AddProduct;
