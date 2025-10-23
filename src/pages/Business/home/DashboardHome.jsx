import React, { useState } from 'react';
import { Col, Row } from 'antd';
import CampaignAnalytics from '../../../components/page-Component/CampaignAnalytics';
import SalesAnalytics from '../../../components/page-Component/SalesAnalytics';
import { Helmet } from 'react-helmet-async';
import { useGetProfileQuery } from '../../../Redux/businessApis/business _profile/getprofileApi';


function DashboardHome() {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

  return (
    <div className="scrollbar px-2">
      <Helmet>
        <title>Sampli Business Portal || Home</title>
      </Helmet>
    
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="mb-4">
            <h2 className="text-3xl">Hello {profileLoading ? "Guest User" : profile?.data?.bussinessName}</h2>
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
        <SalesAnalytics />
        <CampaignAnalytics />
      </Row>
    </div>
  );
}

export default DashboardHome;
