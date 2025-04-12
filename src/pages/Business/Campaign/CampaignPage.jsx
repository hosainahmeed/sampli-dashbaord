import React from 'react';
import StatsOverview from '../../../components/ui/StatsOverview';
import CampaignTable from '../../../components/Tables/CampaignTable';
import { Button } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function CampaignPage() {
  return (
    <div>
      <Helmet>
        <title>Sampli Business Portal || Campaign</title>
      </Helmet>
      <div className=" flex items-start md:items-center justify-between md:flex-row flex-col mb-4">
        <h1 className="text-2xl !font-semibold">Campaign</h1>
        <Link to="/create-campaign">
          <Button className="flex items-center justify-center" type="primary">
            <FiPlus />
            Create New campaign
          </Button>
        </Link>
      </div>
      <StatsOverview />
      <CampaignTable />
    </div>
  );
}

export default CampaignPage;
