import { Button, Tabs } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import SalseState from "../components/ui/SalseState";
import { FaDownLong } from "react-icons/fa6";
import OrderTable from "../components/Tables/OrderTable";

function SalesPage() {
  const items = [
    {
      label: "All",
      key: "all",
      children: <OrderTable filterStatus={null} />,
    },
    {
      label: "Completed",
      key: "completed",
      children: <OrderTable filterStatus="Delivered" />,
    },
    {
      label: "Processing",
      key: "processing",
      children: <OrderTable filterStatus="Processing" />,
    },
    {
      label: "Cancelled",
      key: "cancelled",
      children: <OrderTable filterStatus="Cancelled" />,
    },
  ];

  return (
    <div>
      <div className="flex-center-between mb-4">
        <h1 className="text-2xl font-bold">Order</h1>
        <div className="flex items-center gap-2">
          <Button className="flex items-center justify-center" type="default">
            <FaDownLong />
            Export CSV
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
