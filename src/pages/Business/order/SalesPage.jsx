import { Button, Tabs } from 'antd';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SalseState from '../../../components/ui/SalseState';
import OrderTable from '../../../components/Tables/OrderTable';
import { IoArrowDown } from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';

function SalesPage() {
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

  return (
    <div>
      <Helmet>
        <title>Sampli Business Portal || Order</title>
      </Helmet>
      <div className="flex md:items-center md:flex-row flex-col md:justify-between mb-4">
        <h1 className="text-2xl !font-semibold">Order</h1>
        <div className="flex items-center gap-2">
          <Button className="flex items-center justify-center" type="default">
            <IoArrowDown />
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
