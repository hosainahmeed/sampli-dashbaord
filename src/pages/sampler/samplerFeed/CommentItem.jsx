import React, { useState, useCallback, memo } from 'react';
import {
    Modal,
    Avatar,
    Button,
    Skeleton,
    Typography,
    Divider,
    Space,
    Dropdown
} from 'antd';
import {
    HeartOutlined,
    HeartFilled,
    MessageOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

import {
    useGetCommentsRepliesQuery,
} from '../../../Redux/sampler/reviewApis';

const { Text } = Typography;


const CommentItem = memo(({
    comment,
    onLike,
    onReply,
    onDelete,
    isReplying,
    onStartReply,
    currentUser
}) => {
    const [isLiking, setIsLiking] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [commentID, setCommentID] = useState(null)
    const { data: repliesData, isLoading: repliesLoading } = useGetCommentsRepliesQuery({ id: commentID }, { skip: !commentID })

    const fetchReplies = useCallback(() => {
        if (!comment._id || comment.totalReplies === 0) return;
        setCommentID(comment._id);
    }, [comment._id, comment.totalReplies]);

    const handleToggleReplies = useCallback(() => {
        if (!showReplies) {
            fetchReplies();
            setShowReplies(true);
        } else {
            setShowReplies(false);
        }
    }, [fetchReplies, showReplies]);

    const handleLike = useCallback(async () => {
        if (isLiking) return;

        setIsLiking(true);
        try {
            await onLike(comment._id);
        } finally {
            setIsLiking(false);
        }
    }, [comment._id, isLiking, onLike]);

    const handleMenuClick = useCallback(({ key }) => {
        if (key === 'delete') {
            Modal.confirm({
                title: 'Delete Comment',
                content: 'Are you sure you want to delete this comment?',
                okText: 'Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: () => onDelete(comment._id),
                maskClosable: true
            });
        }
    }, [comment._id, onDelete]);

    const menuItems = [
        ...(comment?.isMyComment ? [
            {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                danger: true,
            },
        ] : [
            {
                key: 'report',
                label: 'Report',
                danger: true,
            },
        ])
    ];

    return (
        <div className="comment-item group hover:bg-gray-50/50 transition-colors p-2 rounded-lg">
            <div className="flex gap-3">
                <Avatar
                    src={comment.commentorProfileImage}
                    size={40}
                    className="flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <Text strong className="text-gray-900">
                                {comment.commentorName}
                            </Text>
                            <Text type="secondary" className="text-xs ml-2">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </Text>
                        </div>

                        <Dropdown
                            menu={{ items: menuItems, onClick: handleMenuClick }}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <Button
                                type="text"
                                icon={<MoreOutlined />}
                                size="small"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </Dropdown>
                    </div>

                    <p className="my-2 text-gray-800 whitespace-pre-line">
                        {comment.text}
                    </p>
                    {comment.image && <div className="w-48 h-auto mt-3 aspect-video flex items-center justify-center">
                        <img src={comment.image} alt={comment?.commentorName} />
                    </div>}
                    <Space size="middle" className="text-sm">
                        <Button
                            type="text"
                            size="small"
                            loading={isLiking}
                            onClick={handleLike}
                            className={`flex items-center gap-1 ${comment.isMyLike ? '!text-red-500' : 'text-gray-500'}`}
                        >
                            {comment.isMyLike ? <HeartFilled /> : <HeartOutlined />}
                            <span>{comment.totalLike || 0}</span>
                        </Button>

                        <Button
                            type="text"
                            size="small"
                            onClick={() => {
                                onStartReply(comment._id)
                            }}
                            className={`flex items-center gap-1 ${isReplying ? '!text-blue-500' : 'text-gray-500'}`}
                        >
                            <MessageOutlined />
                            <span>Reply</span>
                        </Button>
                    </Space>

                    {comment.totalReplies > 0 && (
                        <div className="mt-3">
                            <Divider className="!my-2" />

                            <div className="flex items-center">
                                <div className="w-8 border-l-2 border-b-2 rounded-bl-2xl border-gray-200 h-8 ml-5 -mt-2" />
                                <Button
                                    type="text"
                                    size="small"
                                    onClick={handleToggleReplies}
                                    loading={repliesLoading}
                                    className="!text-blue-500 !px-2 -ml-2 hover:bg-blue-50 rounded-full flex items-center"
                                    icon={showReplies ? <UpOutlined /> : <DownOutlined />}
                                >
                                    {!repliesLoading && (
                                        <span className="ml-1">
                                            {showReplies
                                                ? 'Hide replies'
                                                : `View ${comment.totalReplies} ${comment.totalReplies === 1 ? 'reply' : 'replies'}`}
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {showReplies && (
                                <div className="mt-1 space-y-3 ml-8 pl-2 border-l-2 border-gray-100">
                                    {repliesLoading ? (
                                        <div className="space-y-2 pl-2">
                                            {[...Array(Math.min(3, comment.totalReplies))].map((_, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <Skeleton.Avatar size="small" active />
                                                    <div className="flex-1">
                                                        <Skeleton.Input
                                                            active
                                                            size="small"
                                                            style={{ width: `${80 - (i * 10)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : repliesData?.data?.result?.length > 0 ? (
                                        repliesData.data.result.map((reply) => (
                                            <div
                                                key={reply._id}
                                                className="group relative hover:bg-gray-50 rounded-lg p-2 -ml-2"
                                            >
                                                <CommentItem
                                                    comment={reply}
                                                    onLike={onLike}
                                                    onReply={onReply}
                                                    onDelete={onDelete}
                                                    currentUser={currentUser}
                                                    onStartReply={onStartReply}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-400 text-sm py-2 px-2 italic">
                                            No replies found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default CommentItem