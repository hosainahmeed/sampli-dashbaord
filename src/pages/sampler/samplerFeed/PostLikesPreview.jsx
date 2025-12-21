import React, { memo } from 'react';
import { Avatar, Tooltip, Button } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';

const PostLikesPreview = memo(({ likers, totalLikers, onShowAll }) => {
    if (!totalLikers) return null;

    const visibleLikers = likers.slice(0, 5);

    return (
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
            <div className="flex items-center">
                <div className="flex items-center -space-x-2 mr-3">
                    <HeartFilled className="text-red-500 bg-white rounded-full p-1 text-xs z-10 relative" />
                    {visibleLikers.map((user, index) => (
                        <Tooltip key={user._id || index} title={user.name}>
                            <Avatar
                                src={user.profile_image}
                                size={24}
                                icon={<UserOutlined />}
                                className="border-2 border-white"
                                style={{ zIndex: 5 - index }}
                            />
                        </Tooltip>
                    ))}
                </div>

                <span className="hover:underline cursor-pointer" onClick={onShowAll}>
                    Liked by{' '}
                    {visibleLikers.length > 0 && (
                        <span className="font-semibold">{visibleLikers[0]?.name}</span>
                    )}
                    {totalLikers > 1 && (
                        <>
                            {' '}and{' '}
                            <span className="font-semibold">
                                {totalLikers - 1} other{totalLikers - 1 > 1 ? 's' : ''}
                            </span>
                        </>
                    )}
                </span>
            </div>

            {totalLikers > 5 && (
                <Button
                    type="link"
                    size="small"
                    onClick={onShowAll}
                    className="!text-gray-500 !text-xs"
                >
                    View all
                </Button>
            )}
        </div>
    );
});

PostLikesPreview.displayName = 'PostLikesPreview';

export default PostLikesPreview;