import { Alert, Button, Card, Modal } from 'antd'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoIosAlert } from 'react-icons/io'
import stripeImage from '../../../assets/stripe.svg';
import { useGetProfileQuery } from '../../../Redux/businessApis/business _profile/getprofileApi';
import { useCreateOnboardingMutation } from '../../../Redux/businessApis/stripesConnected/stripecreateOnboardingApis';
import toast from 'react-hot-toast';
function StripeConnectModal({ paymentModal, showPaymentModal }) {
    const { data: profileData, isLoading } = useGetProfileQuery(undefined, {
        skip: !paymentModal
    });
    const [createOnboarding, { isLoading: createOnboardingLoading }] = useCreateOnboardingMutation();

    const handleCreateOnboarding = async () => {
        try {
            await createOnboarding(undefined).unwrap().then((res) => {
                if (res?.success) {
                    toast.success(res?.message);
                    window.location.href = res?.data;
                }
            })
        } catch (error) {
            toast.error(error?.data?.message || error.message || 'Failed to create onboarding');
        }
    }
    return (
        <Modal
            loading={isLoading}
            title="Add withdrawal method"
            open={paymentModal}
            onCancel={() => showPaymentModal(!paymentModal)}
            footer={null}
            width={500}
            centered
        >
            <Alert
                message={
                    <div className="flex items-start justify-start ">
                        <div>
                            <IoIosAlert className="text-xl text-orange-500 " />
                        </div>
                        <span className="ml-3">
                            The name on your withdrawal method and the name on your Sampli
                            account need to match exactly to avoid payment failures or
                            delays.
                        </span>
                    </div>
                }
                type="warning"
                style={{ marginBottom: '16px' }}
            />

            {/* <Card>
      <div className="flex justify-between items-center  ">
        <section>
          <div className="flex items-center">
            <img src={paypalImage} alt="paypal" className="w-6" />
            <span className="ml-3">Paypal account</span>
          </div>
          <div>
            <ul className="list-disc ml-13 text-gray-500">
              <li>Up to 1 business day</li>
              <li>Fees may apply</li>
            </ul>
          </div>
        </section>
        <div className="flex gap-4">
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Remove
          </Button>
        </div>
      </div>
    </Card> */}

            <Card className="!mt-5">
                <div className="flex justify-between items-center ">
                    <section>
                        <div className="flex items-center">
                            <img src={stripeImage} alt="stripe" className="w-6" />

                            <span className="ml-3">Stripe account</span>
                        </div>
                        <div>
                            <ul className="list-disc ml-13 text-gray-500">
                                <li>Up to 1 business day</li>
                                <li>Fees may apply</li>
                            </ul>
                        </div>
                    </section>
                    <div>
                        {!profileData?.data?.isStripeAccountConnected ?
                            <div className="flex gap-4">
                                <Button type="link" size="small">
                                    Edit
                                </Button>
                                <Button type="link" size="small" danger>
                                    Remove
                                </Button>
                            </div>
                            :
                            <Button
                                type="primary"
                                loading={createOnboardingLoading}
                                onClick={handleCreateOnboarding}
                                className="!flex !items-center !justify-center gap-2"
                            >
                                Setup
                                <FaExternalLinkAlt />
                            </Button>
                        }
                    </div>
                </div>
            </Card>
        </Modal>
    )
}

export default StripeConnectModal