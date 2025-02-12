import React from "react";
import { Card } from "antd";

function SalseState() {
  const data = [
    {
      title: "Available balance",
      number: "12450",
    },
    {
      title: "Total Orders",
      number: "12,450",
    },
    {
      title: "Checkout Rate",
      number: "45%",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <Card key={index} className="p-4">
          <h2 className="text-lg font-medium text-[var(--body-text)]">
            {item.title}
          </h2>
          <p className="text-xl font-bold">
            {item.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default SalseState;
