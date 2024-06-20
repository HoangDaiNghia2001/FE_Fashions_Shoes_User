import { Spin } from "antd"
import { APP_URLS } from "constants/variable"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ConvertDateHaveHour } from "utils/ConvertDateHaveHour"
import { getVNPayResponseAsync, orderSelector } from "../Orders/OrderSlice"

const VNPayResponse = (props) => {

    const { orderId } = useParams()

    const { openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const order = useSelector(orderSelector)

    const [vnPay, setVnPay] = useState({})

    const orderInfor = (str) => {
        if (str !== undefined) {
            const orderInfor = str.split("-")

            return orderInfor.slice(0, orderInfor.length - 1)
        }
    }

    const getVNPayResponse = async () => {
        const response = await dispatch(getVNPayResponseAsync(orderId))
        if (response.payload.success) {
            setVnPay(response.payload.results)
        } else {
            openNotification(response.payload.message, 'success')
        }
    }

    useEffect(() => {
        getVNPayResponse()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Spin tip="Loading" size="large" spinning={order.isLoading}>
        <div className="vnpay-response min-h-[calc(100vh-80px)] flex bg-white">
            <div className='border-[1px] border-light-gray p-10 rounded-[8px] m-auto mt-[100px]'>
                <p className='text-eclipse text-[32px] font-semibold tracking-[2px] mb-3 text-center'>VNPAY</p>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Payment date: </p>
                    <span>{ConvertDateHaveHour(vnPay?.vnp_PayDate)}</span>
                </div>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Transaction Id: </p>
                    <span>{vnPay?.vnp_TransactionNo}</span>
                </div>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Bank Code: </p>
                    <span>{vnPay?.vnp_BankCode}</span>
                </div>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Total price: </p>
                    <span>{vnPay?.vnp_Amount?.toLocaleString()}<sup>vnđ</sup></span>
                </div>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Payment content: </p>
                    <span>{orderInfor(vnPay?.vnp_OrderInfo)}</span>
                </div>
                <div className="text-eclipse mb-1 flex text-[18px]">
                    <p className="min-w-[160px] font-semibold">Message: </p>
                    <span>The transaction was successful. Thank you for using the service</span>
                </div>
                <div className="text-center mt-6">
                    <button onClick={() => { navigate(APP_URLS.URL_ORDERS) }} className="button-custom py-[6px] px-10">My orders</button>
                </div>
            </div>
        </div>
    </Spin>
}

export default VNPayResponse