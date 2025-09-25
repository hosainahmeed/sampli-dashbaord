import { Button, Card } from "antd";
import React from "react";

function AccountAuthorization() {
  const status = "Connected";
  const applestatus = "not";
  return (
    <div>
      <Card style={{ opacity: 0.5 }} title="Account authorization (under development)">
        <div className="flex-center-between">
          <div>
            <h1>Google</h1>
            <p>Connected. You can choose to log in with Google.</p>
          </div>
          <div>
            {status !== "not" ? (
              <div className="py-3 px-6 rounded-full border-[1px] border-[#387ced]">
                under development
              </div>
            ) : (
              <Button>Connect</Button>
            )}
          </div>
        </div>
        <div className="flex-center-between">
          <div>
            <h1>Apple</h1>
            <p>Not connected. You can choose to log in with Apple.</p>
          </div>
          <div>
            {applestatus === "not" ? (
              <div className="py-3 px-6 rounded-full border-[1px] border-[#387ced]">
                under development
              </div>
            ) : (
              <Button>Connect</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AccountAuthorization;
