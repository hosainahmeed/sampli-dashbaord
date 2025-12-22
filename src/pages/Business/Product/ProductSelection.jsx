import React, { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Card, Empty, Skeleton, Radio, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useGetProfileQuery } from '../../../Redux/businessApis/business _profile/getprofileApi';
import { useGetBusinessProductApisQuery } from '../../../Redux/sampler/productApis';
import { useCategorySectionApisQuery } from '../../../Redux/sampler/categoryApis';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignData } from '../../../Redux/slices/CampaingSlice';

const ProductSelection = () => {
  const { data: profile } = useGetProfileQuery();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch()
  const campaignData = useSelector((state) => state.campaign);

  const { data: productData, isLoading: productLoading, isFetching } = useGetBusinessProductApisQuery({
    id: profile?.data?._id,
    status: 'active',
    searchTerm: search,
    ...(selectedCategory !== null && { category: selectedCategory }),
  }, {
    skip: !profile?.data?._id,
  });

  const { data: categoryData, isLoading: categoryLoading } = useCategorySectionApisQuery();

  const handleSelect = (product) => {
    dispatch(setCampaignData({
      product: product._id,
    }))
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg">
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
            <Card
              onClick={() => handleSelect(product)}
              key={product?._id} className={`p-4 ${campaignData?.product === product._id ? "!border-[#1677FF]" : ""}`}>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
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
                    checked={campaignData?.product === product._id}
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