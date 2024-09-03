import { Input, Radio, Spin } from 'antd';
import { APP_URLS, FEE_SHIPPING, ORDER_FREESHIP, PAYMENT_METHOD } from 'constants/variable';
import { cartSelector } from 'page/User/CartDetail/CartSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TotalPrice } from 'utils/TotalPrice';
import { checkOutSelector, getOrderIdNewestAsync, notifyCheckOutSuccess, placeOrderCODAsync, placeOrderPayPalAsync, placeOrderVNPayAsync } from '../CheckOutSlice';
import TableProductCheckOut from './TableProductCheckOut';

const Payment = (props) => {

    const { shipping, openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const checkout = useSelector(checkOutSelector)

    const cart = useSelector(cartSelector)

    const subTotal = cart.listCartItemsCheckout?.reduce((total, current) => total + current.totalPrice, 0)

    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.COD)

    const [paymentContent, setPaymentContent] = useState('THANH TOAN HOA DON')

    const onChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        let response;
        const infor = {
            ...shipping, ...{
                fullName: shipping.lastName + ' ' + shipping.firstName,
                paymentMethod: paymentMethod,
                transportFee: subTotal > ORDER_FREESHIP ? 0 : FEE_SHIPPING
            }
        }
        const orderLineRequests = cart.listCartItemsCheckout.map((item) => {
            return {
                productId: item.product.id,
                size: item.size,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            }
        })

        switch (paymentMethod) {
            // COD
            case PAYMENT_METHOD.COD:
                response = await dispatch(placeOrderCODAsync({ ...infor, orderLineRequests: orderLineRequests }))
                if (response.payload.success) {
                    await dispatch(notifyCheckOutSuccess('You have placed your order successfully !!!'))
                    navigate(APP_URLS.URL_ORDERS)
                } else {
                    openNotification(response.payload.message, 'error')
                }
                break;

            // VNPAY
            case PAYMENT_METHOD.VNPAY:
                response = await dispatch(placeOrderCODAsync({ ...infor, orderLineRequests: orderLineRequests }))
                if (response.payload.success) {
                    const totalPrice = cart.listCartItemsCheckout.reduce((total, current) => total + current.totalPrice, 0)

                    const orderNewest = await dispatch(getOrderIdNewestAsync())

                    if (orderNewest.payload.success) {
                        const vnPay = await dispatch(placeOrderVNPayAsync({
                            totalPrice: TotalPrice(totalPrice),
                            orderInfo: paymentContent,
                            orderId: orderNewest.payload.results
                        }))

                        if (vnPay.payload.success) {
                            window.location.href = vnPay.payload.results
                        } else {
                            openNotification(vnPay.payload.message, 'error')
                        }
                    } else {
                        openNotification(orderNewest.payload.message, 'error')
                    }
                } else {
                    openNotification(response.payload.message, 'error')
                }
                break;

            //PAYPAL
            case PAYMENT_METHOD.PAYPAL:
                response = await dispatch(placeOrderCODAsync({ ...infor, orderLineRequests: orderLineRequests }))
                if (response.payload.success) {
                    const total = cart.listCartItemsCheckout.reduce((total, current) => total + current.totalPrice, 0)

                    const order = await dispatch(getOrderIdNewestAsync())

                    if (order.payload.success) {
                        const paypal = await dispatch(placeOrderPayPalAsync({
                            total: TotalPrice(total),
                            orderId: order.payload.results
                        }))

                        if (paypal.payload.success) {
                            window.location.href = paypal.payload.results;
                        } else {
                            openNotification(paypal.payload.message, 'error')
                        }
                    } else {
                        openNotification(order.payload.message, 'error')
                    }
                } else {
                    openNotification(response.payload.message, 'error')
                }
                break;
            default:
                break;
        }

    }

    return <Spin tip="Place order..." spinning={checkout.isLoading} size='large'>
        <div className="px-[50px]">
            <p className='text-red-custom text-[25px] font-bold tracking-[1.2px] mb-3'>Your order</p>
            {
                cart.listCartItemsCheckout.length !== 0 ?
                    <div>

                        <TableProductCheckOut listCartItemsCheckout={cart.listCartItemsCheckout} subTotal={subTotal} />

                        <div className="mt-8">
                            <p className='text-red-custom text-[25px] font-bold tracking-[1.2px] mb-3'>Payment</p>
                            <Radio.Group className='font-bold tracking-[0.75px]' onChange={onChange} value={paymentMethod}>
                                <Radio value={PAYMENT_METHOD.COD}>COD</Radio>
                                <Radio value={PAYMENT_METHOD.VNPAY}>VNPay</Radio>
                                <Radio value={PAYMENT_METHOD.PAYPAL}>PayPal</Radio>
                            </Radio.Group>

                            <div className={`payment-content mt-3 ${paymentMethod === PAYMENT_METHOD.VNPAY && 'show'}`}>
                                <p className='text-eclipse text-[16px] tracking-[0.75px] font-semibold mb-2'>Payment content</p>
                                <Input.TextArea dstyle={{ fontSize: '16px' }} placeholder='Payment content must be no accents' onChange={(e) => { setPaymentContent(e.target.value) }} />
                            </div>
                        </div>

                        <div className='text-center mt-7'>
                            <button onClick={handlePlaceOrder} className='button-custom px-[48px] py-2 text-[18px]'>Place order</button>
                        </div>
                    </div>
                    :
                    <p className='text-center text-eclipse tracking-[0.75px]'>There are no items in your order.</p>
            }
        </div>
    </Spin>
}

export default Payment