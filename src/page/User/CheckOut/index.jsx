import { useState } from 'react';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import './Style.css'
import { Steps } from 'antd';
import { useEffect } from 'react';
import { TabTitle } from 'utils/TabTitle';
import StepCheckout from 'components/StepCheckout';
import { LIST_CHECKOUT } from 'constants/variable';

const CheckOut = (props) => {

    const { openNotification } = props

    const [step, setStep] = useState(0)

    const [shipping, setShipping] = useState(null)

    const [payment, setPayment] = useState(null)

    const forms = [
        <Shipping shipping={shipping} setShipping={setShipping} setStep={setStep} />,
        <Payment payment={payment} shipping={shipping} setPayment={setPayment} setStep={setStep} openNotification={openNotification} />
    ]

    const isStepDisabled = (stepNumber) => {
        if (stepNumber === 0) {
            return false
        }
        if (stepNumber === 1) {
            return shipping === null
        }
    }

    useEffect(() => {
        TabTitle('Checkout')
        window.scrollTo(0, 0)
    }, [])

    return <div className="checkout min-h-screen py-8 flex justify-center items-center bg-honeydew">
        <div className='bg-white pt-6 py-12 px-12 rounded-[8px]'>
            <p className='text-eclipse font-semibold text-[32px] tracking-[2px] mb-4'>Checkout</p>
            <div className='w-[1000px] min-h-[400px] border border-light-gray rounded-[8px] overflow-hidden'>
                <Steps
                    className='step-checkout'
                    onChange={setStep}
                    current={step}
                >
                    {
                        LIST_CHECKOUT.map((item, index) =>
                            <Steps.Step
                                key={index}
                                icon={index + 1}
                                title={
                                    < StepCheckout step={item.step} name={item.name} subName={item.subName} />
                                }
                                style={{
                                    backgroundColor: `${step === index ? '#fff' : '#f2f4f6'}`,
                                }}
                                disabled={isStepDisabled(index)}
                            />)
                    }
                </Steps>

                <div className='py-10 px-[110px]'>
                    {
                        forms[step]
                    }
                </div>
            </div>
        </div>
    </div>
}

export default CheckOut