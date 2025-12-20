import React from 'react'
import { Button, Progress, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";

export const CampaignTableColumn = ({ statusColors, navigate }) => {
    return [
        {
            title: 'Campaign Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span className="flex gap-2 items-center">
                    {record?.product?.images && (
                        <img
                            className="w-8 xl:w-12 rounded-sm h-6 xl:h-8 object-cover"
                            src={record?.product?.images[0]}
                            alt="Campaign"
                        />
                    )}
                    <div>
                        <h1 className="xl:text-sm text-xs">{text}</h1>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xs text-[#6D7486]">
                                {new Date(record.startDate).toLocaleString('default', {
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                                -{' '}
                                {new Date(record.endDate).toLocaleString('default', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </h1>
                        </div>
                    </div>
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

            render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            width: 250,
            render: (_, record) => (
                <Progress
                    className="xl:text-base text-xs"
                    percent={(record.totalReviews / record.numberOfReviewers) * 100}
                    format={() => record?.progress}
                />
            ),
        },
        {
            title: 'Budget',
            dataIndex: 'totalBugget',
            key: 'totalBugget',

            render: (_, record) => (
                <span className="xl:text-sm text-xs text-[#6D7486]">
                    <span className='text-black'>{(record.totalAmountOfReviews).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>{" "}
                    of{" "}
                    <span>{(record.totalBugget).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',

            render: (_, record) => (
                <Link to={`/campaign/single-campaign/${record?._id}`} state={{ id: record?._id }}>
                    <Button
                        type="default"
                        className="!border-blue-500 !text-blue-500 hover:bg-gray-100"
                    >
                        View
                    </Button>
                </Link>
            ),
        },
    ];
}
