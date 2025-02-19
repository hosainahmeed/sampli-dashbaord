import React, { useState } from 'react';
import { Card, Switch, notification } from 'antd';
import { toast } from 'react-hot-toast';

function Notification() {
  const [isBrowserNotification, setIsBrowserNotification] = useState(false);
  const [isCustomerNotification, setIsCustomerNotification] = useState(false);
  const [isNewOrderNotification, setIsNewOrderNotification] = useState(false);

  const handleBrowserNotification = (checked) => {
    setIsBrowserNotification(checked);
    if (checked) {
      toast.success('Browser notifications enabled');
    } else {
      toast.success('Browser notifications disabled');
    }
  };

  const handleCustomerNotification = (checked) => {
    setIsCustomerNotification(checked);
    if (checked) {
      toast.success('Customer notifications enabled');
    } else {
      toast.success('Customer notifications disabled');
    }
  };

  const handleNewOrderNotification = (checked) => {
    setIsNewOrderNotification(checked);
    if (checked) {
      notification.success({
        message: 'New order notifications enabled',
      });
      toast.success('New order notifications enabled');
    } else {
      notification.success({
        message: 'New order notifications disabled',
      });
      toast.success('New order notifications disabled');
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl">Notifications</h1>
      <Card
        className="shadow-sm"
        title="General"
        headStyle={{ borderBottom: 'none' }}
      >
        <div className="flex-center-between">
          <label htmlFor="browser-notifications">Browser notifications</label>
          <Switch
            className="switch"
            checked={isBrowserNotification}
            onChange={handleBrowserNotification}
          />
        </div>
      </Card>
      <Card
        headStyle={{ borderBottom: 'none' }}
        className="shadow-sm"
        title="Customer notifications"
      >
        <div className="flex-center-between">
          <p>Notify customers about their order events</p>
          <Switch
            className="switch"
            checked={isCustomerNotification}
            onChange={handleCustomerNotification}
          />
        </div>
      </Card>
      <Card
        headStyle={{ borderBottom: 'none' }}
        className="shadow-sm"
        title="Order Notifications"
      >
        <div className="flex-center-between">
          <p>New Order</p>
          <Switch
            className="switch"
            checked={isNewOrderNotification}
            onChange={handleNewOrderNotification}
          />
        </div>
      </Card>
    </div>
  );
}

export default Notification;
