import React, { useState } from "react";
import { Card, Radio, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function CreateCampaign() {
  const [selectedOption, setSelectedOption] = useState("existing");
  const router = useNavigate();
  const handleNext = () => {
    if (selectedOption === "existing") {
      return router("/create-campaign/existing-product");
    } else if (selectedOption === "new") {
      return router("/create-campaign/new-product");
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <Card style={{ width: 500, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Select Your Product
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 16 }}
        >
          Choose an existing product or add a new one for your campaign
        </Text>

        <Radio.Group
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ width: "100%" }}
        >
          <Card
            hoverable
            onClick={() => setSelectedOption("existing")}
            style={{
              marginBottom: 12,
              border:
                selectedOption === "existing"
                  ? "1px solid #1890ff"
                  : "1px solid #ddd",
            }}
          >
            <Radio value="existing" style={{ width: "100%" }}>
              <Title level={5} style={{ margin: 0, color: "#1890ff" }}>
                Choose Existing Product
              </Title>
              <Text type="secondary">Select from your product catalog</Text>
            </Radio>
          </Card>

          <Card
            hoverable
            onClick={() => setSelectedOption("new")}
            style={{
              border:
                selectedOption === "new"
                  ? "1px solid #1890ff"
                  : "1px solid #ddd",
            }}
          >
            <Radio value="new" style={{ width: "100%" }}>
              <Title level={5} style={{ margin: 0 }}>
                Add New Product
              </Title>
              <Text type="secondary">Create a new product listing</Text>
            </Radio>
          </Card>
        </Radio.Group>

        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateCampaign;
