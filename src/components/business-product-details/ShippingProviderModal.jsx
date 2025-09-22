import { Button, Modal, Spin, Alert, List, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import { EnvironmentOutlined, } from '@ant-design/icons';
import toast from 'react-hot-toast';
import paypalIcon from '../../assets/payment-icon/PayPal.png'
import stripeIcon from '../../assets/payment-icon/Stripe.png'
import { useLocation } from 'react-router-dom';
import { useConfirmShippingMutation } from '../../Redux/businessApis/campaign/campaignProceedDeliveryApis';

const { Title, Paragraph } = Typography;

function ShippingProviderModal({ isModalOpenProvider, handleModalCancel, providerList, getShippingRatesForOfferShipmentLoading }) {
    const { id } = useLocation().state;
    const [confirmShipping, { isLoading: confirmShippingLoading }] = useConfirmShippingMutation();
    const [selectedRateId, setSelectedRateId] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("Stripe"); // Paypal ** Stripe


    const handleConfirmShipping = async () => {
        try {
            if (!id) {
                throw new Error("Campaign offer id is missing");
            }
            if (!selectedRateId) {
                throw new Error("Please select a shipping option");
            }
            if (!paymentMethod) {
                throw new Error("Please select a payment method");
            }
            const payload = {
                paymentMethod: paymentMethod,
                shipmentId: selectedProvider?.shipment,
                selectedRateId: selectedProvider?.objectId,
                campaignOfferId: id
            };
            await confirmShipping(payload).unwrap().then((res) => {
                if (res?.success) {
                    toast.success(res?.message);
                    // navigate(res?.data?.url, { replace: false });
                    window.open(res?.data?.url, '_blank');
                    handleModalCancel();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || error?.message || "Something went wrong");
        }
    };
    return (
        <Modal
            title="Select Shipping Provider"
            open={isModalOpenProvider}
            onCancel={handleModalCancel}
            closeIcon={false}
            footer={[
                <Button key="cancel" onClick={handleModalCancel}>
                    Cancel
                </Button>,
                <Button
                    loading={confirmShippingLoading}
                    key="confirm"
                    type="primary"
                    onClick={handleConfirmShipping}
                    disabled={!selectedRateId || !paymentMethod || confirmShippingLoading}
                >
                    Confirm Shipping
                </Button>
            ]}
            width={700}
            centered
        >
            <Spin spinning={getShippingRatesForOfferShipmentLoading}>
                {providerList?.length > 0 ? (
                    <>
                        <Alert
                            message="Select a shipping provider and payment method"
                            type="info"
                            showIcon
                            style={{ marginBottom: 16 }}
                        />

                        <Title level={5} style={{ marginBottom: 16 }}>Shipping Options</Title>

                        <List
                            itemLayout="horizontal"
                            dataSource={providerList}
                            renderItem={provider => (
                                <List.Item
                                    onClick={() => {
                                        setSelectedRateId(provider?.objectId);
                                        setSelectedProvider(provider);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        padding: "12px 16px",
                                        borderRadius: 8,
                                        border: selectedRateId === provider?.objectId ?
                                            "2px solid #1890ff" : "1px solid #d9d9d9",
                                        marginBottom: 8,
                                        backgroundColor: selectedRateId === provider?.objectId ?
                                            "#f0f8ff" : "white"
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <img
                                                src={provider?.providerImage200}
                                                alt={provider?.provider}
                                                style={{ width: 40, height: 40, objectFit: "contain" }}
                                            />
                                        }
                                        title={provider?.servicelevel?.name}
                                        description={
                                            <div>
                                                <div>{provider?.durationTerms}</div>
                                                {provider?.attributes?.length > 0 && (
                                                    <div style={{ marginTop: 4 }}>
                                                        <Tag color="blue" style={{ fontSize: 12 }}>
                                                            {provider?.attributes.join(", ")}
                                                        </Tag>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                    <div className='flex items-start gap-2 flex-col'>
                                        <div style={{ fontWeight: 600 }}>
                                            {provider?.currency} {provider?.amount}
                                        </div>
                                        <div style={{ fontSize: 12, color: "#666" }}>
                                            Estimated Days:  {provider?.estimatedDays} days
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />

                        {selectedRateId && (
                            <div style={{ marginTop: 24 }}>
                                <Title level={3}>Payment Method</Title>
                                <small className='!mb-3'>Please select a payment method (selected: {paymentMethod})</small>
                                <div className="w-full !mt-2 flex items-center h-16 gap-2">
                                    <div
                                        onClick={() => setPaymentMethod("Paypal")}
                                        className={`flex-1 border border-gray-200 shadow rounded p-2 h-full ${paymentMethod === "Paypal" ? "bg-blue-200 !border-2 !border-[#1890FF]" : ""}`}>
                                        <img src={paypalIcon} alt="Paypal"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod("Stripe")}
                                        className={`flex-1 border border-gray-200 shadow rounded p-2 h-full ${paymentMethod === "Stripe" ? "bg-blue-200 !border-2 !border-[#1890FF]" : ""}`}>
                                        <img src={stripeIcon} alt={stripe}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <EnvironmentOutlined style={{ fontSize: 48, color: "#ccc", marginBottom: 16 }} />
                        <Title level={4}>No Shipping Options Available</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                            No provider is available for this address. Please try again or change the address.
                        </Paragraph>
                    </div>
                )}
            </Spin>
        </Modal>
    )
}

export default ShippingProviderModal