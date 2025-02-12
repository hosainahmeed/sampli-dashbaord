import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

const Some = () => {
  return (
    <div style={{ padding: '24px' }}>
      

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Campaign Analytics This Week">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Total Spent" value="$00.00" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Avg Cost/Review" value="$00.00" />
              </Col>
              <Col span={12}>
                <Statistic title="Total Review" value="0" />
              </Col>
              <Col span={12}>
                <Statistic title="Total Campaign" value="00.00" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Active Campaigns" value="0" />
              </Col>
              <Col span={12}>
                <Statistic title="Pending Campaigns" value="0" />
              </Col>
              <Col span={12}>
                <Statistic title="Total Users" value="00" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Active Users" value="0" />
              </Col>
              <Col span={12}>
                <Statistic title="Retention Rate" value="0%" />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Sales Analytics This Week">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Total Revenue" value="$00.00" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Orders" value="0" />
              </Col>
              <Col span={12}>
                <Statistic title="Avg Order Value" value="$0.00" />
              </Col>
              <Col span={12}>
                <Statistic title="Total View" value="334" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Conversion Rate" value="←%" />
              </Col>
              <Col span={12}>
                <Statistic title="Avg Time on Site" value="0:00" />
              </Col>
              <Col span={12}>
                <Statistic title="Orders" value="34" suffix="→%" />
              </Col>
              <Col span={12}>
                <Statistic title="Checkout Rate" value="←%" />
              </Col>
              <Col span={12}>
                <Statistic title="Cart Abandonment" value="0" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Some;