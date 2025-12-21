import React, { memo } from 'react';
import { Button, Tooltip } from 'antd';
import {
    CommentOutlined,
    ShareAltOutlined,
    SendOutlined
} from '@ant-design/icons';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

const PostActions = memo(({
    post,
    onLike,
    onComment,
    onShare,
    isLikeLoading
}) => {
    return (
        <div className="flex justify-around border-t border-b border-gray-100 py-2">
            <Tooltip title="Like">
                <Button
                    type="text"
                    size="large"
                    loading={isLikeLoading}
                    onClick={onLike}
                    className={`flex items-center gap-2 ${post?.isLike ? '!text-blue-600' : 'text-gray-600'}`}
                    icon={post?.isLike ? <IoMdHeart /> : <IoIosHeartEmpty />}
                >
                    <span className="font-medium">Like</span>
                </Button>
            </Tooltip>

            <Tooltip title="Comment">
                <Button
                    type="text"
                    size="large"
                    onClick={onComment}
                    className="flex items-center gap-2 text-gray-600"
                    icon={<CommentOutlined />}
                >
                    <span className="font-medium">Comment</span>
                </Button>
            </Tooltip>

            <Tooltip title="Share">
                <Button
                    type="text"
                    size="large"
                    onClick={onShare}
                    className="flex items-center gap-2 text-gray-600"
                    icon={<ShareAltOutlined />}
                >
                    <span className="font-medium">Share</span>
                </Button>
            </Tooltip>
        </div>
    );
});

PostActions.displayName = 'PostActions';

export default PostActions;