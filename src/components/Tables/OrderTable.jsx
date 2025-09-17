import React from 'react';
import { Table, Button } from 'antd';
import { FaAngleLeft } from 'react-icons/fa';
import { useGetOrderListQuery } from '../../Redux/sampler/orderApis';
import { OrderTableColumn } from './OrderTableColumn';

const OrderTable = () => {
  const { data: orderList, isLoading } = useGetOrderListQuery();
  const dataSource = orderList?.data?.result?.map((order) => {
    const item = order?.items?.[0];
    return {
      key: order?._id,
      orderId: order?._id,
      product: item?.product?.name ?? 'Unknown',
      productImage: item?.product?.images?.[0],
      createdAt: order?.createdAt,
      customer: order?.reviewer?.name ?? 'N/A',
      customerId: order?.reviewer?._id ?? 'N/A',
      amount: Number(order?.totalPrice) || 0,
      deliveryStatus: order?.deliveryStatus,
      paymentMethod: order?.paymentMethod,
    };
  }) ?? [];

  return (
    <div className="pb-12">
      <Table
        loading={isLoading}
        columns={OrderTableColumn()}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: false,
          defaultPageSize: 5,
          defaultCurrent: 1,
          position: ['bottomCenter'],
          itemRender: (current, type, originalElement) => {
            if (type === 'prev' && current > 1) {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === 'next') {
              return <span className="text-[#2E78E9]">Next Page</span>;
            }
            if (type === 'page') {
              return current;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default OrderTable;
