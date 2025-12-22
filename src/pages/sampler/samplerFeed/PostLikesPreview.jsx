import React, { memo } from 'react';
import { Avatar, Tooltip, Button, Skeleton } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';

const PostLikesPreview = memo(({ id, likers, totalLikers, onShowAll, likersLoading }) => {
    if (!totalLikers) return null;

    const visibleLikers = likers.slice(0, 5);

    return (
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
            <div className="flex items-center">
                <div className="flex items-center -space-x-2 mr-3">
                    <HeartFilled className="!text-red-500 bg-white rounded-full p-1 text-xs z-10 relative" />
                    {likersLoading ?
                        <div className="flex items-center gap-2">
                            {
                                Array.from({ length: 5 }, (_, index) => (
                                    <Skeleton.Avatar size={24} key={index} />
                                ))
                            }
                        </div>
                        : visibleLikers.map((user, index) => (
                            <Tooltip key={user._id || index} title={user.name}>
                                <Avatar
                                    src={user.profile_image}
                                    size={24}
                                    icon={<UserOutlined />}
                                    className="!border !border-gray-500"
                                    style={{ zIndex: 5 - index }}
                                />
                            </Tooltip>
                        ))}
                </div>

                {likersLoading ? <Skeleton.Input size="small" /> : <span className="hover:underline cursor-pointer" onClick={() => onShowAll(id)}>
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
                </span>}
            </div>

            {totalLikers > 1 && (
                <Button
                    type="link"
                    size="small"
                    onClick={() => onShowAll(id)}
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