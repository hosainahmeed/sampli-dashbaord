import React from "react";
import TargetAudienceForm from "../components/ui/TargetAudienceForm";
import planet1 from "../assets/Planet (1).png";
import planet from "../assets/Planet.png";
function ExistingProduct() {
  return (
    <div
      style={{
        backgroundImage: `url(${planet1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <TargetAudienceForm />
    </div>
  );
}

export default ExistingProduct;
