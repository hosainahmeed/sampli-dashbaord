import { Avatar, Button, Modal, Table, Typography } from 'antd';
import React, { memo } from 'react';
import { useGetReviewerLikersQuery } from '../../../Redux/sampler/reviewApis';
import { IoMdHeart } from 'react-icons/io';

const { Text } = Typography;

function PostLikerModal({ postId, visible, onClose }) {
    const { data: likersData, isLoading: likersLoading } = useGetReviewerLikersQuery(
        { id: postId },
        { skip: !postId }
    );

    const columns = [
        {
            dataIndex: 'user',
            key: 'user',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 border bg-gray-300 border-gray-200 rounded-full flex items-center justify-center">
                        <img src={record?.profile_image} alt={record?.name} />
                        <div className="absolute -bottom-3 -right-3">
                            <IoMdHeart size={20} className="text-red-500" />
                        </div>
                    </div>
                    <Text className="font-medium">{record?.name || 'Unknown User'}</Text>
                </div>
            ),
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     render: (_, record) => (
        //         <Button type="default" className="!p-0">
        //             View Profile
        //         </Button>
        //     ),
        // },
    ];

    return (
        <Modal
            title="People who liked this post"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            className="likers-modal"
        >
            <Table
                columns={columns}
                showHeader={false}
                dataSource={likersData?.data?.result || []}
                rowKey="_id"
                loading={likersLoading}
                pagination={likersData?.data?.meta?.total > 10 ? {
                    pageSize: 10,
                    showSizeChanger: false,
                } : false}
                className="likers-table"
            />
        </Modal>
    );
}

export default memo(PostLikerModal);