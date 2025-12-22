import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import {
    Modal,
    Avatar,
    Input,
    Button,
    Skeleton,
    Typography,
    Divider,
} from 'antd';
import {
    SendOutlined,
    MessageOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { message } from 'antd';

import {
    useGetReviewerCommentsQuery,
    useCreateCommentMutation,
    usePostCommentLikesMutation,
    useDeleteCommentMutation,
} from '../../../Redux/sampler/reviewApis';
import CommentItem from './CommentItem';
import { FaImage } from 'react-icons/fa';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CommentsModal = ({ visible, onClose, post }) => {
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const commentInputRef = useRef(null);

    // Focus the input when replying to a comment
    const handleSetReplyingTo = (commentId) => {
        setReplyingTo(commentId);
        // Focus the input after state update
        setTimeout(() => {
            if (commentInputRef.current) {
                commentInputRef.current.focus();
            }
        }, 0);
    };

    const [limit, setLimit] = useState(10);

    // Focus the input when the modal opens
    useEffect(() => {
        if (visible && commentInputRef.current) {
            // Small timeout to ensure the modal is fully rendered
            const timer = setTimeout(() => {
                commentInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const {
        data: commentsData,
        isLoading: commentsLoading,
        refetch
    } = useGetReviewerCommentsQuery({
        id: post?._id,
        limit,
    }, {
        skip: !post?._id,
        refetchOnMountOrArgChange: true
    });

    const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
    const [postCommentLike] = usePostCommentLikesMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleSubmitComment = useCallback(async () => {
        if ((!commentText.trim() && !imageFile) || !post?._id) return;

        const formData = new FormData();
        const data = {
            text: commentText,
            review: post._id,
            ...(replyingTo && { parent: replyingTo })
        };

        formData.append('data', JSON.stringify(data));
        
        if (imageFile && imageFile instanceof File) {
            formData.append('comment_image', imageFile);
        }

        try {
            await createComment(formData).unwrap();
            setCommentText('');
            setImageFile(null);
            setReplyingTo(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            refetch();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }, [commentText, imageFile, post?._id, replyingTo, createComment, refetch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCommentLike = useCallback(async (commentId) => {
        try {
            await postCommentLike({ id: commentId }).unwrap();
            refetch();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    }, [postCommentLike, refetch]);

    const handleDeleteComment = useCallback(async (commentId) => {
        try {
            await deleteComment({ id: commentId }).unwrap();
            // Refetch comments after successful deletion
            refetch();
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment. Please try again.');
        }
    }, [deleteComment, refetch]);

    const renderSkeleton = () => (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                    <Skeleton.Avatar active size={40} />
                    <div className="flex-1">
                        <Skeleton.Input active style={{ width: 120, marginBottom: 8 }} />
                        <Skeleton.Input active style={{ width: '80%' }} />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Modal
            title={
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-semibold text-lg">Comments</span>
                        <Text type="secondary" className="ml-2">
                            • {post?.totalComments || 0}
                        </Text>
                    </div>
                    {/* <Button type="text" icon={<MoreOutlined />} /> */}
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={1200}
            className="comments-modal"
            bodyStyle={{ padding: '24px 0' }}
            destroyOnClose
        >
            {/* Comment Input */}
            <div className="sticky top-0 bg-white z-10 px-6 pb-4">
                <div className="flex gap-3">
                    <Avatar src={post?.reviewer?.profile_image} size={40} />
                    <div className="flex-1 flex items-center gap-2">
                        <Input
                            placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onPressEnter={handleSubmitComment}
                            className="rounded-full"
                            ref={commentInputRef}
                            suffix={
                                <Button
                                    type="text"
                                    icon={<SendOutlined />}
                                    onClick={handleSubmitComment}
                                    disabled={!commentText.trim() && !imageFile || isCreating}
                                    loading={isCreating}
                                    className="!text-blue-500"
                                />
                            }
                            autoFocus
                        />
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <label htmlFor="image" className="cursor-pointer">
                                    <Button
                                        type="primary"
                                        shape='circle'
                                        icon={<FaImage />}
                                        loading={isCreating}
                                        className="!text-white"
                                        onClick={(e) => {
                                            // Prevent form submission when clicking the image button
                                            e.preventDefault();
                                            e.stopPropagation();
                                            fileInputRef.current?.click();
                                        }}
                                    />
                                </label>
                                <input 
                                    ref={fileInputRef}
                                    className='hidden' 
                                    type='file' 
                                    id='image' 
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {imageFile && (
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 pr-2">
                                    <div className="w-8 h-8 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <img 
                                            src={URL.createObjectURL(imageFile)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 max-w-[120px] truncate">
                                        {imageFile.name}
                                    </span>
                                    <Button 
                                        type="text" 
                                        size="small" 
                                        icon={<CloseOutlined className="text-gray-500" />} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeImage();
                                        }}
                                        className="!p-0 !w-5 !h-5 flex items-center justify-center hover:!bg-transparent"
                                    />
                                </div>
                            )}
                        </div>
                        {replyingTo && (
                            <div className="mt-2 text-sm text-gray-500">
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => setReplyingTo(null)}
                                    className="!px-0"
                                >
                                    Cancel reply
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Divider className="!my-0" />

            {/* Comments List */}
            <div className="px-6 pt-4">
                {commentsLoading ? (
                    renderSkeleton()
                ) : commentsData?.data?.result?.length > 0 ? (
                    <div className="space-y-1">
                        {commentsData.data.result.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                onLike={handleCommentLike}
                                onReply={handleSubmitComment}
                                onDelete={handleDeleteComment}
                                isReplying={replyingTo === comment._id}
                                onStartReply={handleSetReplyingTo}
                                currentUser={{ id: post?.reviewer?._id }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <MessageOutlined className="text-4xl" />
                        </div>
                        <Text type="secondary">No comments yet. Be the first to comment!</Text>
                    </div>
                )}

                {/* Load More */}
                {commentsData?.data?.meta?.hasMore && (
                    <div className="text-center mt-6">
                        <Button
                            type="link"
                            onClick={() => setLimit(prev => prev + 10)}
                            loading={commentsLoading}
                            className="!text-blue-500 font-medium"
                        >
                            Load more comments
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default memo(CommentsModal);