import React from 'react'

export const TransectionTableColumnOfBusiness = () => [
    {
        title: "Date",
        dataIndex: "createdAt",
        key: "date",
        render: (date) => (
            <span className="text-[#999Eab]">
                {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </span>
        ),
    },
    {
        title: "Item",
        dataIndex: "description",
        render: (item) => <span className="text-[#111]">{item}</span>,
        key: "description",
    },
    {
        title: "Transaction Reason",
        dataIndex: "transactionReason",
        key: "transactionReason",
    },
    {
        title: "Transaction ID",
        dataIndex: "transactionId",
        key: "transactionId",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => <p className="text-[#6D7486]">{` $${amount}`}</p>,
    }
];