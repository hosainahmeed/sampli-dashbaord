import React from 'react';
import { Col, Row } from 'antd';
import CampaignAnalytics from '../../../components/page-Component/CampaignAnalytics';
import SalesAnalytics from '../../../components/page-Component/SalesAnalytics';

function DashboardHome() {
  return (
    <div className="scrollbar">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="mb-4">
            <h2 className="text-3xl">Hello Mike</h2>
            <p className="text-base text-[var(--body-text)]">
              Its{' '}
              {new Date().toLocaleString('default', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </Col>
        <hr />
        <CampaignAnalytics />
        <SalesAnalytics />
      </Row>
    </div>
  );
}

export default DashboardHome;
