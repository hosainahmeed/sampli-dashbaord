import React from "react";
import icon from "../../assets/logo/logo.svg";
function Logo() {
  return (
    <div className="text-blue-500 flex items-center gap-2">
      <img src={icon} alt="logo" /> Sampli
    </div>
  );
}

export default Logo;
