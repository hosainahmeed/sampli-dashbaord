import React, { useCallback, useMemo, useState } from "react";
import { Form, Button, Upload, Card, Divider } from "antd";
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
import { useCreateProductMutation, useSaveDraftProductMutation } from "../../Redux/businessApis/business_product/businessCreateProduct";

function AddProduct() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const { data: categories, isLoading: categoryLoading } = useCategorySectionApisQuery();
  const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation()
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [saveDraftProduct, { isLoading: saveDraftProductLoading }] = useSaveDraftProductMutation()

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      let tags = [];
      if (content === '' && !isDraft) {
        throw new Error('Please enter Description!');
      }
      if (fileList.length === 0 && !isDraft) {
        throw new Error('Please upload images!');
      }

      if (!values?.stock && !isDraft) {
        throw new Error('Please enter stock!');
      }

      if (values?.tags && values?.tags.includes(',')) {
        tags = values?.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      } else {
        tags = [values?.tags];
      }

      const formData = new FormData()
      const data = {
        name: values?.name,
        shortDescription: values?.shortDescription,
        category: values?.category,
        brand: values?.brand,
        price: values?.price,
        stock: values?.stock,
        tags: tags,
        description: content,
        weight: parseFloat(values?.weight),
        length: parseFloat(values?.length),
        width: parseFloat(values?.width),
        height: parseFloat(values?.height),
      }
      formData.append("data", JSON.stringify(data));

      let size = 0;
      fileList.forEach((file) => {
        size += file?.size;
        if (size > 25 * 1024 * 1024) {
          throw new Error('Total image size should be less than 25MB!');
        }
        formData.append("product_image", file.originFileObj);
      });
      if (isDraft) {
        const res = await saveDraftProduct(formData).unwrap()
        if (!res?.success) {
          throw new Error(res?.message || 'Something went wrong!')
        }
        if (res?.success) {
          toast.dismiss()
          toast.success('product saved as draft')
          navigate(-1)
        }
      } else {
        const res = await createProduct(formData).unwrap()
        if (!res?.success) {
          throw new Error(res?.message || 'Something went wrong!')
        }
        if (res?.success) {
          toast.dismiss()
          toast.success(res?.message)
          setProductId(res?.data?._id)
          form.resetFields()
          setContent('')
          setFileList([])
          setOpenSuccessModal(true)
        }
      }

    } catch (error) {
      toast.dismiss()
      toast.error(error?.data?.message || error?.message || 'Something went wrong!');
    }
  };

  const handleAddVariant = useCallback((productId) => {
    navigate(`/add-variant/${productId}`)
  }, [navigate])

  return (
    <React.Fragment>
      {
        openSuccessModal &&
        <Card style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "350px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          border: "none",
          background: "#fff",
        }}>

          <div>
            <h1 className="text-xl font-semibold">Product added successfully!</h1>
            <p className="text-sm">Would you like to add a variant to this product?</p>
          </div>
          <div className="flex justify-end w-full gap-2 mt-4">
            <Button onClick={() => setOpenSuccessModal(false)} type="default">No</Button>
            <Button onClick={() => handleAddVariant(productId)} type="primary">Yes</Button>
          </div>
        </Card>
      }
      <div
        className="flex items-center w-fit gap-2 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-[10px]">Back</h1>
      </div>
      <div className="w-full max-w-screen-lg mx-auto">

        <div className="flex justify-between items-start md:flex-row flex-col md:items-center mb-4">
          <h2 className="text-2xl">Add New Product</h2>
          <div className="flex gap-2">
            <Button type="default" loading={saveDraftProductLoading} disabled={saveDraftProductLoading} onClick={() => {
              setIsDraft(true)
              form.submit()
            }}>
              Save as Draft
            </Button>
            <Button loading={createProductLoading} disabled={createProductLoading || saveDraftProductLoading} type="primary" onClick={() => form.submit()}>
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
              rules={[{ required: isDraft ? false : true, message: "Please enter item name!" }]}
              placeholder="Enter item name"
              type="text"
              className="w-full"
            />
            <SelectField
              loading={categoryLoading}
              label="Category"
              name="category"
              rules={[{ required: isDraft ? false : true, message: "Please select a category!" }]}
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
              rules={[{ required: isDraft ? false : true, message: "Please enter brand name!" }]}
              placeholder="Enter brand name"
              type="text"
              className="w-full"
            />
            <InputField
              label="Stock"
              name="stock"
              rules={[{ required: isDraft ? false : true, message: "Please enter stock!" }]}
              placeholder="Enter stock"
              type="number"
              className="w-full"
            />
          </div>
          <div className="flex items-center col-span-2 gap-2">
            <InputField
              label="Price"
              name="price"
              rules={[{ required: isDraft ? false : true, message: "Please enter price!" }]}
              placeholder="Enter price"
              type="number"
              className="w-full"
            />
            <InputField
              label={<span>Tags <small className="text-[#999Eab]">(please enter tags separated by commas)</small></span>}
              name="tags"
              rules={[{ required: isDraft ? false : true, message: "Please enter tags!" }]}
              placeholder="Enter tags"
              type="text"
              className="w-full"
            />
          </div>
          <Divider className="!col-span-2">
            <h1>For parcel details</h1>
          </Divider>

          <InputField
            label={<span>Weight (in lbs) <small className="text-[#999Eab]">min-0.1 max-150</small></span>}
            name="weight"
            rules={[
              { required: isDraft ? false : true, message: "Please enter weight (in lbs)!" },
              {
                validator: (_, value) => {
                  const numValue = parseFloat(value);
                  if (isNaN(numValue) || numValue < 0.1) {
                    return Promise.reject('Weight must be at least 0.1 lbs');
                  }
                  if (numValue > 150) {
                    return Promise.reject('Weight cannot exceed 150 lbs');
                  }
                  return Promise.resolve();
                },
              }
            ]}
            placeholder="Enter weight"
            type="number"
            min={0.1}
            max={150}
            step="0.1"
            className="w-full"
          />
          <InputField
            label={<span>Length (in inches) <small className="text-[#999Eab]">min-1 max-48</small></span>}
            name="length"
            rules={[
              { required: isDraft ? false : true, message: "Please enter length (in inches)!" },
              {
                validator: (_, value) => {
                  const numValue = parseFloat(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return Promise.reject('Length must be at least 1 inch');
                  }
                  if (numValue > 48) {
                    return Promise.reject('Length cannot exceed 48 inches');
                  }
                  return Promise.resolve();
                },
              }
            ]}
            placeholder="Enter length"
            type="number"
            min={1}
            max={48}
            className="w-full"
          />
          <InputField
            label={<span>Width (in inches) <small className="text-[#999Eab]">min-1 max-36</small></span>}
            name="width"
            rules={[
              { required: isDraft ? false : true, message: "Please enter width (in inches)!" },
              {
                validator: (_, value) => {
                  const numValue = parseFloat(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return Promise.reject('Width must be at least 1 inch');
                  }
                  if (numValue > 36) {
                    return Promise.reject('Width cannot exceed 36 inches');
                  }
                  return Promise.resolve();
                },
              }
            ]}
            placeholder="Enter width"
            type="number"
            min={1}
            max={36}
            className="w-full"
          />
          <InputField
            label={<span>Height (in inches) <small className="text-[#999Eab]">min-1 max-36</small></span>}
            name="height"
            rules={[
              { required: isDraft ? false : true, message: "Please enter height (in inches)!" },
              {
                validator: (_, value) => {
                  const numValue = parseFloat(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return Promise.reject('Height must be at least 1 inch');
                  }
                  if (numValue > 36) {
                    return Promise.reject('Height cannot exceed 36 inches');
                  }
                  return Promise.resolve();
                },
              }
            ]}
            placeholder="Enter height"
            type="number"
            min={1}
            max={36}
            className="w-full"
          />
          <Form.Item
            label="Item short Description"
            name="shortDescription"
            rules={[{ required: isDraft ? false : true, message: "Please enter item description!" }]}
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
              accept=".jpg,.jpeg,.png"
              maxCount={5}
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
