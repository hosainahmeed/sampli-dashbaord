import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

function SalseState() {
  const data = [
    {
      title: 'Available balance',
      number: '12450',
      btn: (
        <Link to={'/business/transaction-balance'}>
          <Button>See Balance</Button>
        </Link>
      ),
    },
    {
      title: 'Total Orders',
      number: 12450,
    },
    {
      title: 'Checkout Rate',
      number: '45%',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex xl:items-end flex-col xl:flex-row justify-between">
            <div className="flex items-start justify-between flex-col h-full">
              <h2 className="text-lg font-medium uppercase text-[var(--body-text)]">
                {item.title}
              </h2>
              <p className="text-xl font-bold">
                {item.title === 'Available balance' ? (
                  <h1 className='text-3xl flex items-center'>
                    <span className="text-[#6D7486] text-xl">$</span>
                    {new Intl.NumberFormat().format(parseInt(item.number))}
                  </h1>
                ) : item.title === 'Checkout Rate' ? (
                  <h1 className="text-3xl">{item.number}</h1>
                ) : (
                  <h1 className="text-3xl">
                    {new Intl.NumberFormat().format(parseInt(item.number))}
                  </h1>
                )}
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
