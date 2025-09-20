import React from "react";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccessSampler() {
  const navigate = useNavigate();
  const handleViewOrder = () => {
    navigate(`/sampler/campaign/shipments/my-purchases`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl transition-all duration-700 transform `}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl  border border-gray-200  p-8 md:p-12 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-emerald-400 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600  mb-4">
            Order Confirmed!
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Thank you for your purchase! Your order has been successfully
            processed and you'll receive a confirmation email shortly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewOrder}
              className="group bg-blue-400 text-white cursor-pointer  font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              View Order Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
