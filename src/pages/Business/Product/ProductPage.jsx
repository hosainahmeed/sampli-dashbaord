import React, { useState } from 'react';
import ProductTable from '../../../components/Tables/ProductTable';
import { Button, Modal, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import UploadCsv from '../../../components/page-Component/UploadCsv';

function ProductPage() {
  const [openCsv, setOpenCsv] = useState(false);
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
       <div className="flex-center-between">
        <h2 className="my-3 text-2xl">Product</h2>
        <div className="flex-center-center gap-2">
          <Button
            onClick={() => {
              setOpenCsv(true);
            }}
            type="default"
            className="flex items-center justify-center"
          >
            Upload CSV
          </Button>
          <Link to="/product/add-product">
            <Button className="flex items-center justify-center" type="primary">
              <FiPlus />
              Add products
            </Button>
          </Link>
        </div>
      </div>
      <Tabs className="!mt-4" items={items} />
      <Modal
        centered
        footer={null}
        open={openCsv}
        onCancel={() => setOpenCsv(false)}
        title="Upload CSV File"
        width={'fit-content'}
      >
        <UploadCsv setOpenCsv={setOpenCsv} />
      </Modal>
    </div>
  );
}

export default ProductPage;
