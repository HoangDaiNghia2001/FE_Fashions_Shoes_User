import { Empty, Spin } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TabTitle } from 'utils/TabTitle'
import { checkOutSelector, notifiCheckOutSuccess } from '../CheckOut/CheckOutSlice'
import FormSearchOrder from './components/FormSearchOrder'
import OrderItem from './components/OrderItem'
import { getOrdersAsync, orderSelector } from './OrderSlice'
import './Style.css'

const Orders = (props) => {

    const { openNotification } = props
    const dispatch = useDispatch()

    const checkout = useSelector(checkOutSelector)

    const order = useSelector(orderSelector)

    const [valueFilter, setValueFilter] = useState({})

    const [orders, setOrders] = useState({
        data: [],
        visible: 5
    })

    const getAllOrders = async (params) => {
        const response = await (dispatch(getOrdersAsync(params)))
        console.log(response)
        if (response.payload.success) {
            setOrders({
                data: response.payload.results,
                visible: 5
            })
        }
    }

    const handleLoadMore = () => {
        setOrders({
            ...orders, visible: orders.visible + 5
        })
    }

    const handleCollapse = () => {
        setOrders({
            ...orders, visible: 5
        })
        window.scrollTo(0, 0)
    }



    useEffect(() => {
        TabTitle('My orders')
        window.scrollTo(0, 0)
        if (checkout.messageSuccess !== '') {
            openNotification(checkout.messageSuccess, 'success')
            dispatch(notifiCheckOutSuccess(''))
        }
        getAllOrders(valueFilter)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getAllOrders(valueFilter)
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueFilter, order.orderItem])

    return <Spin tip="Loading" size="large" spinning={order.isLoading || order.isloadListOrders}>
        <div className='orders min-h-screen bg-honeydew'>
            <div className='flex justify-between  py-8 px-10 '>

                <FormSearchOrder orders={orders} setValueFilter={setValueFilter} />

                <div className='w-[75%] flex flex-col items-center'>
                    {
                        orders.data.length > 0 ?
                            <>
                                {
                                    orders.data.slice(0, orders.visible).map((item, index) => {
                                        return <OrderItem key={index} order={item} openNotification={openNotification} />
                                    }
                                    )
                                }
                                {
                                    orders.visible < orders.data.length ?
                                        <button onClick={handleLoadMore} className='button-custom px-[70px] py-2 text-[16px]'>Load more</button>
                                        :
                                        (orders.data.length > 5 && <button onClick={handleCollapse} className='button-custom px-[70px] py-2 text-[16px]'>Collapse</button>)
                                }
                            </>
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </div>
            </div>
        </div>
    </Spin>
}

export default Orders