import React from 'react'
import { Tag } from "antd";

export const usePurchaseColumns = (onView) => [
  {
    title: "Item name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="flex gap-2 items-center">
        <img
          src={record.image}
          alt={record.name}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="flex items-center">
          <h3 className="text-sm font-medium">{record.name}</h3>
          {record.length > 1 && (
            <span className="text-xs font-light ml-2">
              ({record.length} more items)
            </span>
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => <Tag color={record.statusColor}>{status}</Tag>,
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <div
        onClick={() => onView(record)}
        className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
      >
        View
      </div>
    ),
  },
];
