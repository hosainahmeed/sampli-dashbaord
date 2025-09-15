import React, { useCallback, useState } from 'react';
import { Table, Input, Button, Select, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import UploadCsv from '../page-Component/UploadCsv';
import { FaAngleLeft, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { useGetProfileQuery } from '../../Redux/businessApis/business _profile/getprofileApi';
import { useGetBusinessProductApisQuery } from '../../Redux/sampler/productApis';
import { productTableColumn } from './ProductTableColumn';
import { useDeletePorductMutation } from '../../Redux/businessApis/business_product/businessCreateProduct';
import toast from 'react-hot-toast';

const { Option } = Select;

const ProductTable = ({ filterStatus }) => {
  const [searchText, setSearchText] = useState('');
  // const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [openCsv, setOpenCsv] = useState(false);
  const [deleteProduct] = useDeletePorductMutation()
  const navigate = useNavigate()

  const { data: profile } = useGetProfileQuery();
  const { data: products, isLoading: productLoading } = useGetBusinessProductApisQuery({
    id: profile?.data?._id,
    ...filterStatus !== '' && { status: filterStatus },
    searchTerm: searchText,
    sort: sortKey,
  }, {
    skip: !profile?.data?._id,
  });

  const statusColors = {
    Active: 'orange',
    Pending: 'purple',
    Completed: 'green',
    Paused: 'gray',
  };

  const handleDelete = useCallback(async (productId) => {
    try {
      await deleteProduct(productId).unwrap().then((res) => {
        if (res.success) {
          toast.success(res.message)
        } else {
          throw new Error(res.message)
        }
      })
    } catch (error) {
      toast.error(error?.message || "Something went wrong")
    }
  }, []);

  const handleView = (productId) => {
    navigate(`/product/${productId}`, { state: { productId } })
  };


  return (
    <div className="pb-12">
      <div className="flex items-start flex-col md:flex-row md:item-center w-full mt-12 justify-between ">
        <div className="flex item-center gap-12">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, marginRight: 16 }}
            className='md:!w-[300px] !w-full'
          />
        </div>
        <div className="flex-center-center gap-2">
          <Select
            placeholder="Sort by"
            onChange={(value) => setSortKey(value)}
            style={{ width: 200, marginBottom: 16 }}
          >
            <Option value="-price">Price (High to Low)</Option>
            <Option value="price">Price (Low to High)</Option>
          </Select>
          {/* <Select
            placeholder="Filter"
            onChange={(value) => setStatusFilter(value)}
            style={{ width: 120, marginBottom: 16 }}
          >
            <Option value="active">Active</Option>
            <Option value="draft">Draft</Option>
            <Option value="archived">Archived</Option>
          </Select> */}
        </div>
      </div>
      <Table
        loading={productLoading}
        columns={productTableColumn({
          statusColors,
          handleDelete,
          handleView
        })}
        dataSource={products?.data?.result}
        rowKey="_id"
        scroll={{ x: 'max-content' }}
        locale={{
          filterConfirm: 'Confirm',
          filterReset: 'Reset',
          emptyText: (
            <div className="flex items-center justify-center flex-col py-28 text-center">
              <p className="text-2xl">No result found</p>
              <p>Try clearing the filters or changing your input</p>
            </div>
          ),
        }}
        pagination={{
          showSizeChanger: false,
          defaultPageSize: 5,
          defaultCurrent: 1,
          position: ['bottomCenter'],
          itemRender: (current, type, originalElement) => {
            if (type === 'prev' && current > 1) {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === 'next') {
              return <h1 className="text-[#2E78E9]">Next Page</h1>;
            }
            if (type === 'page') {
              return current;
            }
            return originalElement;
          },
        }}
      />
      <Modal
        centered
        footer={null}
        open={openCsv}
        onCancel={() => setOpenCsv(false)}
        title="Upload CSV File"
        width={'fit-content'}
      >
        <UploadCsv setOpenCsv={setOpenCsv} />
      </Modal>
    </div>
  );
};

export default ProductTable;
