import React, { useMemo } from 'react';
import { Button, Dropdown, Tag, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

export const productTableColumn = ({ statusColors, handleDelete, handleView, filterStatus, handleArchive, handleArchiveActive, softDeleting, statusChanging }) => {
    const getActionItems = useMemo(() => (record) => [
        {
            key: 'view',
            label: (
                <Button
                    disabled={filterStatus === "draft"}
                    type="text"
                    size='small'
                    className="!w-full !text-left !p-0"
                    onClick={() => handleView(record?._id)}
                >
                    View Product
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
                        size='small'
                        type="text"
                        className="w-full text-left p-0 text-red-500 hover:text-red-600"
                    >
                        Delete Product
                    </Button>
                </Popconfirm>
            ),
        },
        {
            key: 'edit',
            label: (
                <Link to={`/edit-product/${record._id}`} state={{ id: record?._id, ...filterStatus === "draft" && { status: "draft" } }} >
                    <Button
                        size='small'
                        type="text"
                        className="w-full text-left p-0 text-blue-500 hover:text-blue-600"
                    >
                        {filterStatus === "draft" ? "Draft to Product" : "Edit Product"}
                    </Button>
                </Link >
            ),
        },
        {
            key: 'add-variant',
            label: (
                <Link to={`/add-variant/${record._id}`} state={{ name: record?.name }}>
                    <Button
                        size='small'
                        type="text"
                        className="w-full text-left p-0 text-blue-500 hover:text-blue-600"
                    >
                        Add Variant
                    </Button>
                </Link>
            ),
        },

        {
            key: 'archive',
            label: (
                <Button
                    size='small'
                    type="text"
                    loading={statusChanging || softDeleting}
                    className="w-full text-left p-0 text-blue-500 hover:text-blue-600"
                    onClick={() => {
                        if (filterStatus === "archived") {
                            handleArchiveActive(record._id)
                        } else {
                            handleArchive(record._id)
                        }
                    }}
                >
                    {filterStatus === "archived" ? "Unarchive" : "Archive"}
                </Button>
            ),
        },

    ], [handleDelete, handleView]);

    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() => [
        {
            // title: <span className="text-xs xl:text-lg">Item Name</span>,
            title:"Item Name",
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            render: (text, record) => (
                <div className="flex gap-2 items-center">
                    {record.images?.[0] && (
                        <img
                            className="w-12 rounded-sm h-12 object-cover"
                            src={record.images[0]}
                            alt={text || "Product"}
                            loading="lazy"
                        />
                    )}
                    <div>
                        <h1 className="text-xs xl:text-sm leading-none font-medium">{text}</h1>
                        <div className="flex items-center text-gray-500 flex-nowrap">
                            {/* <span className="text-xs xl:text-sm">#{record?.category?._id}</span> */}
                            •<span className="text-xs xl:text-sm leading-none line-clamp-1">{record?.category?.name}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Price",
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
            title: "Status",
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
            title: "In Stock",
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => stock || 0,
        },
        {
            title: "Total Sales",
            dataIndex: 'sales',
            key: 'sales',
            render: (sales) => sales || 0,
        },
        {
            title:"Date Created",
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span className="text-xs xl:text-sm">
                    {dateFormatter.format(new Date(createdAt))}
                </span>
            ),
        },
        {
            title: "Action",
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: getActionItems(record),
                    }}
                    placement="bottomRight"
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
