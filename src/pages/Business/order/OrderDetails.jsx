import { Button, Card, Typography } from 'antd';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { LuUserRound } from 'react-icons/lu';
import TimeLineCard from '../../../components/business-product-details/TimeLineCard';
import ContactInformationCustomer from '../../../components/business-product-details/ContactInformationCustomer';
import ShippingAddressCustomer from '../../../components/business-product-details/ShippingAddressCustomer';
import BillingAddressCustomer from '../../../components/business-product-details/BillingAddressCustomer';

const { Text, Title } = Typography;

function OrderDetails() {
  const location = useLocation();
  const orderDetails = location.state;
  console.log(orderDetails);
  const { amount, customer, date, orderId, product, status } = orderDetails;
  const order = {
    id: orderId,
    status: status,
    date: date,
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
    name: product,
    variant: 'Medium Black',
    price: amount,
    quantity: 1,
    subtotal: 50.0,
    shipping: 50.0,
    total: 50.0,
    timeline: [
      { status: 'Order processed', date: '23, Oct 2023', completed: true },
      { status: 'Payment Confirmed', date: '23, Oct 2023', completed: true },
      { status: 'Item shipped', date: '23, Oct 2023', completed: false },
      { status: 'Delivered', date: '23, Oct 2023', completed: false },
    ],
    customer: customer,
    email: 'MichaelScott@gmail.com',
    phone: '',
    shippingAddress: {
      name: customer,
      address: 'rampura dhaka bangladesh',
      phone: '+16278847',
    },
  };
  const navigate = useNavigate();
  return (
    <div className=" p-6">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <Text className="text-lg">Back</Text>
      </div>
      <div className="flex justify-between border-b pb-4 border-gray-200 mt-4">
        <div>
          <div className="flex items-center gap-2">
            <Title level={3} className="m-0">
              Order ID: {order.id}
            </Title>
            <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-600 rounded border border-purple-300">
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 mt-2">{order.date}</p>
        </div>
        <div className="flex gap-2">
          <Button>Go to item</Button>
          <Button type="primary">Track Item</Button>
        </div>
      </div>
      <Title className="!mt-4" level={4}>
        Order Item
      </Title>
      <div className="flex !mt-12 justify-between xl:flex-row flex-col items-start gap-4">
        <div className="w-full xl:flex-1">
          <Title level={5} className="mt-6">
            Timeline
          </Title>
          <TimeLineCard status={status.toUpperCase()} order={order} />
        </div>

        <div className="w-full xl:flex-1 flex flex-col gap-4">
          <Card className="shadow p-4">
            <Title level={3} className="mt-6">
              Customer
            </Title>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <LuUserRound />
              <h1 className="!mt-2">{order.customer}</h1>
            </div>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <FiShoppingBag />
              <h1 className="!mt-2">1 order</h1>
            </div>
          </Card>

          <ContactInformationCustomer order={order} />
          <ShippingAddressCustomer order={order} />
          <BillingAddressCustomer order={order} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
