import { Button, Tabs } from 'antd';
import React, { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SalseState from '../../../components/ui/SalseState';
import OrderTable from '../../../components/Tables/OrderTable';
import { IoArrowDown } from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';
import { url } from '../../../Redux/main/server';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

function SalesPage() {
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);

  const handleDownloadCSV = useCallback(async () => {
    setCsvLoading(true);
    try {
      toast.dismiss();
      toast.loading("Starting data retrieval for CSV export...");
      const response = await fetch(
        `${url}/order/get-my-orders?limit=99999`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      toast.dismiss();
      toast.loading("Processing order data...");
      const result = await response.json();
      if (result.success) {
        toast.dismiss();
        toast.loading("Formatting data for download...");

        const formattedData = result.data.result.map((item, index) => ({
          Key: index + 1,
          OrderID: item._id,
          Reviewer: item.reviewer?.name || "N/A",
          ProductName: item.items?.[0]?.product?.name || "N/A",
          Quantity: item.totalQuantity,
          SubTotal: item.subTotal,
          DeliveryFee: item.deliveryFee,
          TotalPrice: item.totalPrice,
          PaymentMethod: item.paymentMethod,
          DeliveryStatus: item.deliveryStatus,
          CreatedAt: new Date(item.createdAt).toLocaleString(),
        }));

        setCsvData(formattedData);

        setTimeout(() => {
          toast.dismiss();
          toast.success("CSV data ready for download!");
          document.querySelector(".csv-download-link").click();
        }, 800);
      } else {
        throw new Error(result.message || "Failed to fetch CSV data");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.message === "Failed to fetch"
          ? "Network error: Please check your connection and try again."
          : `Failed to export data: ${err.message}`
      );
    } finally {
      setCsvLoading(false);
    }
  }, []);



  const items = [
    {
      label: 'All',
      key: 'all',
      children: <OrderTable filterStatus={null} />,
    },
    {
      label: 'Completed',
      key: 'completed',
      children: <OrderTable filterStatus="Delivered" />,
    },
    {
      label: 'Processing',
      key: 'processing',
      children: <OrderTable filterStatus="Processing" />,
    },
    {
      label: 'Cancelled',
      key: 'cancelled',
      children: <OrderTable filterStatus="Cancelled" />,
    },
  ];

  const csvHeaders = [
    { label: "#", key: "Key" },
    { label: "Order ID", key: "OrderID" },
    { label: "Reviewer", key: "Reviewer" },
    { label: "Product Name", key: "ProductName" },
    { label: "Quantity", key: "Quantity" },
    { label: "Sub Total", key: "SubTotal" },
    { label: "Delivery Fee", key: "DeliveryFee" },
    { label: "Total Price", key: "TotalPrice" },
    { label: "Payment Method", key: "PaymentMethod" },
    { label: "Delivery Status", key: "DeliveryStatus" },
    { label: "Created At", key: "CreatedAt" },
  ];

  return (
    <div>
      <Helmet>
        <title>Sampli Business Portal || Order</title>
      </Helmet>
      <div className="flex md:items-center md:flex-row flex-col md:justify-between mb-4">
        <h1 className="text-2xl !font-semibold">Order</h1>
        <div className="flex items-center gap-2">
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`transactions_${new Date().toISOString().split('T')[0]}.csv`}
            className="csv-download-link"
            style={{ display: "none" }}
          />
          <Button
            type="default"
            icon={<IoArrowDown />}
            loading={csvLoading}
            onClick={handleDownloadCSV}
            disabled={csvLoading}
          >
            {csvLoading ? "Preparing Download..." : "Export to CSV"}
          </Button>
          <Link to="/product/add-product">
            <Button className="flex items-center justify-center" type="primary">
              <FiPlus />
              Add Products
            </Button>
          </Link>
        </div>
      </div>
      <SalseState />
      <Tabs className="!mt-4" items={items} />
    </div>
  );
}

export default SalesPage;
