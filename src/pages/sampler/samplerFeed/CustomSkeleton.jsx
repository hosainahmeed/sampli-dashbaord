import React from 'react'
import { Skeleton } from "antd"

export const CustomSkeleton = ({ isHeight = true }) => {
    return (
        <div className={` ${isHeight ? "h-screen" : ""} w-full`}>
            <div className="shadow-md border border-gray-200 rounded-2xl p-5 mb-5 w-full ">
                {/* Header */}
                <div className="flex justify-between mb-2 w-full">
                    <div className="flex items-center gap-2 w-full">
                        <Skeleton.Avatar active size="large" shape="circle" />
                        <div>
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 120 }}
                            />
                            <div className="flex items-center gap-2 mt-1">
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: 60 }}
                                />
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: 40 }}
                                />
                            </div>
                        </div>
                    </div>
                    <Skeleton.Button active size="small" shape="round" />
                </div>

                <Skeleton paragraph={{ rows: 2 }} active />

                <div className="flex justify-between items-center mt-4 w-full">
                    <div className="flex gap-4">
                        {
                            Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton.Button key={i} active size="small" shape="round" />
                            ))
                        }
                    </div>
                    <Skeleton.Button active size="small" shape="round" />
                </div>
            </div>
            {isHeight &&
                <div className="shadow-md border border-gray-200 rounded-2xl p-5 mb-5 w-full ">
                    {/* Header */}
                    <div className="flex justify-between mb-2 w-full">
                        <div className="flex items-center gap-2 w-full">
                            <Skeleton.Avatar active size="large" shape="circle" />
                            <div>
                                <Skeleton.Input
                                    active
                                    size="small"
                                    style={{ width: 120 }}
                                />
                                <div className="flex items-center gap-2 mt-1">
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ width: 60 }}
                                    />
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{ width: 40 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Skeleton.Button active size="small" shape="round" />
                    </div>

                    <Skeleton paragraph={{ rows: 2 }} active />

                    <div className="flex justify-between items-center mt-4 w-full">
                        <div className="flex gap-4">
                            {
                                Array.from({ length: 8 }).map((_, i) => (
                                    <Skeleton.Button key={i} active size="small" shape="round" />
                                ))
                            }
                        </div>
                        <Skeleton.Button active size="small" shape="round" />
                    </div>
                </div>}
        </div>
    )
}