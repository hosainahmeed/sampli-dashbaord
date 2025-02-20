import React from 'react';
import { Button, Card } from 'antd';

function SalseState() {
  const data = [
    {
      title: 'Available balance',
      number: '$12450',
      btn: <Button>See Balance</Button>,
    },
    {
      title: 'Total Orders',
      number: '12,450',
    },
    {
      title: 'Checkout Rate',
      number: '45%',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex xl:items-end flex-col xl:flex-row justify-between">
            <div className="flex items-start justify-between flex-col h-full">
              <h2 className="text-lg font-medium text-[var(--body-text)]">
                {item.title}
              </h2>
              <p className="text-xl font-bold">
                {item.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </div>
            <div>{item.btn && item.btn}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SalseState;
