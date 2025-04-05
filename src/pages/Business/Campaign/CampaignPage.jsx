import React from "react";
import StatsOverview from "../../../components/ui/StatsOverview";
import CampaignTable from "../../../components/Tables/CampaignTable";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function CampaignPage() {
  return (
    <div>
      <div className=" flex-center-between mb-4">
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
