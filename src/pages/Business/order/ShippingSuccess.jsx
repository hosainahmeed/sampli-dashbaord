import React from "react";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function ShippingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10 p-4">
      <div className="w-full max-w-2xl transition-all duration-700">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200 p-8 md:p-12 text-center shadow-2xl">
          {/* Success Icon */}
          <div className="relative mb-10 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute w-24 h-24 rounded-full bg-emerald-400 animate-ping opacity-20" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Order Confirmed! 🎉
          </h1>

          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Thank you for your purchase, Your order is successful and has been
            forwarded to our fulfillment center. We are preparing it for
            shipment and you are now able to track item.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button onClick={() => navigate("/business/purchases")}>
              <Package className="w-5 h-5" />
              Track Your Offer Shipment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingSuccess;
