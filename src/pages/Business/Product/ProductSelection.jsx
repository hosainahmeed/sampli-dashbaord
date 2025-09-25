import React, { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Card, Empty, Skeleton, Radio, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useGetProfileQuery } from '../../../Redux/businessApis/business _profile/getprofileApi';
import { useGetBusinessProductApisQuery } from '../../../Redux/sampler/productApis';
import { useCategorySectionApisQuery } from '../../../Redux/sampler/categoryApis';

const ProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: profile } = useGetProfileQuery();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: productData, isLoading: productLoading, isFetching } = useGetBusinessProductApisQuery({
    id: profile?.data?._id,
    searchTerm: search,
    ...(selectedCategory !== null && { category: selectedCategory }),
  }, {
    skip: !profile?.data?._id,
  });
  const { data: categoryData, isLoading: categoryLoading } = useCategorySectionApisQuery();
  useEffect(() => {
    const savedId = localStorage.getItem('selectedProductId');
    if (savedId && productData?.data?.result?.length) {
      const savedProduct = productData.data.result.find(p => p._id === savedId);
      if (savedProduct) setSelectedProduct(savedProduct);
    }
  }, [productData]);


  const handleSelect = (product) => {
    if (selectedProduct?._id === product._id) {
      setSelectedProduct(null);
      localStorage.removeItem('selectedProductId');
    } else {
      setSelectedProduct(product);
      localStorage.setItem('selectedProductId', product._id);
      toast.success(`Selected ${product?.name}`);
    }
  };


  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        Choose Existing Product
      </h2>
      <p className="text-gray-500 leading-1 mb-4 text-center">
        Choose products from your catalog to include in this campaign.
      </p>

      <div className="flex items-center w-full flex-col gap-3 mb-4">
        <Input
          loading={productLoading || isFetching}
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-full !rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 items-center justify-between w-full">
          <h1>{productLoading || isFetching ? "0" : productData?.data?.result?.length} items</h1>

          {categoryLoading ? <Skeleton.Input /> : <div className="flex gap-3">
            <Select
              placeholder="Select Category"
              value={selectedCategory}
              loading={categoryLoading}
              onChange={(value) => setSelectedCategory(value)}
              style={{ width: 200 }}
            >
              <Select.Option value={null}>All</Select.Option>
              {categoryData?.data?.map((category) => (
                <Select.Option key={category?._id} value={category?._id}>
                  {category?.name}
                </Select.Option>
              ))}
            </Select>
          </div>}
        </div>
      </div>

      {productLoading || isFetching ? <Skeleton /> : <div className="space-y-3 flex flex-col gap-3">
        {productData?.data?.result?.length > 0 ? (
          productData?.data?.result?.map((product) => (
            <Card key={product?._id} className="p-4">
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images[0]}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-gray-500 leading-1 text-sm">{product?.category?.name}</p>
                    <p className="text-gray-500 leading-1 text-sm">
                      ${product.price}  {/*• {product.units} Units */}
                    </p>
                  </div>
                </div>
                <div>
                  <Radio
                    checked={selectedProduct?._id === product._id}
                    onChange={() => handleSelect(product)}
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Empty description="No products found" />
        )}
      </div>}
    </div>
  );
};

export default ProductSelection;
