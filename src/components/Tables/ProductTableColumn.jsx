import React, { useMemo } from 'react';
import { Button, Dropdown, Tag, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

export const productTableColumn = ({ statusColors, handleDelete, handleEdit, handleView }) => {
    const getActionItems = useMemo(() => (record) => [
        {
            key: 'view',
            label: (
                <Button
                    type="text"
                    className="w-full text-left p-0"
                    onClick={() => handleView(record._id)}
                >
                    <FaEye className="inline mr-2" /> View Product
                </Button>
            ),
        },
        {
            key: 'delete',
            label: (
                <Popconfirm
                    title="Are you sure you want to delete this product?"
                    onConfirm={() => handleDelete(record._id)}>
                    <Button
                        type="text"
                        className="w-full text-left p-0 text-red-500 hover:text-red-600"
                    >
                        <FaTrash className="inline mr-2" /> Delete Product
                    </Button>
                </Popconfirm>
            ),
        },
        {
            key: 'edit',
            label: (
                <Link to={`/edit-product/${record._id}`}>
                    <Button
                        type="text"
                        className="w-full text-left p-0 text-blue-500 hover:text-blue-600"
                        onClick={() => handleEdit(record._id)}
                    >
                        <FaEdit className="inline mr-2" /> Edit Product
                    </Button>
                </Link>
            ),
        },
        {
            key: 'add-variant',
            label: (
                <Link to={`/add-variant/${record._id}`}>
                    <Button
                        type="text"
                        className="w-full text-left p-0 text-blue-500 hover:text-blue-600"
                    >
                        <FaPlus className="inline mr-2" /> Add Variant
                    </Button>
                </Link>
            ),
        },
    ], [handleDelete, handleEdit, handleView]);

    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() => [
        {
            title: <span className="text-xs xl:text-lg">Item Name</span>,
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            render: (text, record) => (
                <div className="flex gap-2 items-center">
                    {record.images?.[0] && (
                        <img
                            className="w-12 rounded-sm h-8 object-cover"
                            src={record.images[0]}
                            alt={text || "Product"}
                            loading="lazy"
                        />
                    )}
                    <div>
                        <h1 className="text-xs xl:text-sm font-medium">{text}</h1>
                        <div className="flex items-center text-gray-500 gap-1 flex-wrap">
                            <span className="text-xs xl:text-sm">#{record.item_id}</span>
                            <span className="hidden xs:inline">•</span>
                            <span className="text-xs xl:text-sm">{record.category}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: <span className="text-xs xl:text-lg">Price</span>,
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            render: (price) => (
                <span className="text-xs text-gray-500 xl:text-sm">
                    ${Number(price).toFixed(2)}
                </span>
            ),
        },
        {
            title: <span className="text-xs xl:text-lg">Status</span>,
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status) => (
                <Tag color={statusColors[status]} className="capitalize">
                    {status?.toLowerCase()}
                </Tag>
            ),
        },
        {
            title: <span className="text-xs xl:text-lg">In Stock</span>,
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => stock || 0,
        },
        {
            title: <span className="text-xs xl:text-lg">Total Sales</span>,
            dataIndex: 'sales',
            key: 'sales',
            render: (sales) => sales || 0,
        },
        {
            title: <span className="text-xs xl:text-lg">Date Created</span>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span className="text-xs xl:text-sm">
                    {dateFormatter.format(new Date(createdAt))}
                </span>
            ),
        },
        {
            title: <span className="text-xs xl:text-lg">Action</span>,
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu items={getActionItems(record)} />
                    }
                    placement="bottomLeft"
                    trigger={['click']}
                    arrow
                >
                    <Button
                        type="text"
                        icon={<BsThreeDots />}
                        className="flex items-center justify-center"
                    />
                </Dropdown>
            ),
        },
    ], [statusColors, getActionItems]);

    return columns;
};

// Usage example in a parent component:
/*
const MyComponent = () => {
  const statusColors = {
    active: 'green',
    inactive: 'red',
    draft: 'orange',
  };

  const handleDelete = (productId) => {
    console.log('Delete product:', productId);
    // Your delete logic here
  };

  const handleEdit = (productId) => {
    console.log('Edit product:', productId);
    // Your edit logic here
  };

  const handleView = (productId) => {
    console.log('View product:', productId);
    // Your view logic here
  };

  const columns = useProductTableColumn({
    statusColors,
    handleDelete,
    handleEdit,
    handleView
  });

  return (
    <Table
      columns={columns}
      dataSource={productsData}
      // other table props
    />
  );
};
*/