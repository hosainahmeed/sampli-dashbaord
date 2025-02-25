import React from 'react';
import ProductTable from '../../../components/Tables/ProductTable';
import { Tabs } from 'antd';

function ProductPage() {
  const items = [
    {
      label: 'All',
      key: 'all',
      children: <ProductTable filterStatus={null} />,
    },
    {
      label: 'Active',
      key: 'active',
      children: <ProductTable filterStatus="Active" />,
    },
    {
      label: 'Draft',
      key: 'draft',
      children: <ProductTable filterStatus="Draft" />,
    },
    {
      label: 'Archived',
      key: 'archived',
      children: <ProductTable filterStatus="Archived" />,
    },
  ];
  return (
    <div>
      <Tabs className="!mt-4" items={items} />
    </div>
  );
}

export default ProductPage;
