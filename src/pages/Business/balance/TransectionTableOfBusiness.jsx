import React, { useState, useCallback } from "react";
import {
    Button,
    Select,
    Table,
    Spin,
    message,
    Card,
    Space,
    Typography,
    Progress,
    Alert
} from "antd";
import {
    DownloadOutlined,
    FilterOutlined,
    ReloadOutlined
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useGetTransactionForBusinessQuery } from "../../../Redux/businessApis/transaction/transactionApis";
import { TransectionTableColumnOfBusiness } from "./TransectionTableColumnOfBusiness";
import { url } from "../../../Redux/main/server";
import toast from "react-hot-toast";

const { Title, Text } = Typography;
const { Option } = Select;

function TransectionTableOfBusiness() {
    const [paymentType, setPaymentType] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [csvLoading, setCsvLoading] = useState(false);



    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useGetTransactionForBusinessQuery({
        ...(paymentType && { paymentType }),
    });


    const handleDownloadCSV = useCallback(async () => {
        setCsvLoading(true);
        try {
            toast.dismiss()
            toast.loading("Starting data retrieval for CSV export...");

            const response = await fetch(
                `${url}/transaction/get-my-transaction?limit=99999`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            toast.dismiss()
            toast.loading("Processing transaction data...");

            const result = await response.json();

            if (result.success) {
                toast.dismiss()
                toast.loading("Formatting data for download...");

                const formattedData = result.data.result.map((item, index) => ({
                    Key: index + 1,
                    TransactionID: item.transactionId,
                    Type: item.type,
                    Amount: item.amount,
                    Reason: item.transactionReason,
                    Description: item.description,
                    PaymentMethod: item.paymentMethod,
                    CreatedAt: new Date(item.createdAt).toLocaleString(),
                }));

                setCsvData(formattedData);

                setTimeout(() => {
                    toast.dismiss()
                    toast.success("CSV data ready for download!");

                    document.querySelector(".csv-download-link").click();
                }, 800);
            } else {
                throw new Error(result.message || "Failed to fetch CSV data");
            }
        } catch (err) {
            toast.dismiss()
            toast.error(
                err.message === "Failed to fetch"
                    ? "Network error: Please check your connection and try again."
                    : `Failed to export data: ${err.message}`
            );
        } finally {
            setCsvLoading(false);
        }
    }, []);

    const csvHeaders = [
        { label: "#", key: "Key" },
        { label: "Transaction ID", key: "TransactionID" },
        { label: "Type", key: "Type" },
        { label: "Amount", key: "Amount" },
        { label: "Reason", key: "Reason" },
        { label: "Description", key: "Description" },
        { label: "Payment Method", key: "PaymentMethod" },
        { label: "Created At", key: "CreatedAt" },
    ];

    return (
        <Card
            className="transaction-table-container"
            title={
                <Space>
                    <Title level={4} style={{ margin: 0 }}>Transaction History</Title>
                    {isFetching && <Spin size="small" />}
                </Space>
            }
            extra={
                <Button
                    icon={<ReloadOutlined />}
                    onClick={refetch}
                    loading={isFetching}
                >
                    Refresh
                </Button>
            }
            style={{ borderRadius: "8px", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)" }}
        >
            {/* Filter & Actions */}
            <div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
                <Space>
                    <Text strong>Filter by:</Text>
                    <Select
                        className="min-w-48"
                        placeholder="Payment type"
                        allowClear
                        suffixIcon={<FilterOutlined />}
                        onChange={(value) => setPaymentType(value)}
                        value={paymentType || undefined}
                    >
                        <Option value="Campaign_Payment">Campaign Payment</Option>
                        <Option value="Referral_Bonus">Referral Bonus</Option>
                        <Option value="Withdrawal">Withdrawal</Option>
                        <Option value="Order_Payment">Order Payment</Option>
                    </Select>
                </Space>

                <Space direction="vertical" size="small">
                    <CSVLink
                        data={csvData}
                        headers={csvHeaders}
                        filename={`transactions_${new Date().toISOString().split('T')[0]}.csv`}
                        className="csv-download-link"
                        style={{ display: "none" }}
                    />

                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        loading={csvLoading}
                        onClick={handleDownloadCSV}
                        disabled={csvLoading}
                    >
                        {csvLoading ? "Preparing Download..." : "Export to CSV"}
                    </Button>
                </Space>
            </div>

            {/* Info Alert */}
            {data?.data?.result?.length === 0 && !isLoading && (
                <Alert
                    message="No transactions found"
                    description="Try adjusting your filters or check back later for new transactions."
                    type="info"
                    showIcon
                    className="mb-4"
                />
            )}

            {/* Table */}
            {data?.data?.result?.length !== 0 && <Table
                columns={TransectionTableColumnOfBusiness()}
                dataSource={data?.data?.result || []}
                rowKey={(record) => record._id}
                loading={isLoading}
                pagination={{
                    pageSize: 10,
                    total: data?.data?.meta?.total || 0,
                    position: ["bottomCenter"],
                    showSizeChanger: false,
                    showQuickJumper: false,
                }}
                scroll={{ x: 'max-content' }}
                size="large"
            />}
        </Card>
    );
}

export default TransectionTableOfBusiness;