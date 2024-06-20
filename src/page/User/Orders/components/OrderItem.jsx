import { Popconfirm } from "antd"
import { useForm } from "antd/es/form/Form"
import { APP_URLS, STATUS_ORDER } from "constants/variable"
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync } from "page/User/Account/AccountSlice"
import { getDetailProductAsync } from "page/User/ProductDetail/ProductSlice"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Capitelize } from "utils/Capitalize"
import { ConvertDateHaveHour } from "utils/ConvertDateHaveHour"
import { cancelOrdersAsync } from "../OrderSlice"
import ModalOrder from "./ModalOrder"

const OrderItem = (props) => {
    const { order, openNotification } = props

    const [formOrder] = useForm()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // const orders = useSelector(orderSelector)

    const [isModalOrderOpen, setIsModalOrderOpen] = useState(false)

    const handelNavigatePageDetail = async (idProduct) => {
        await dispatch(getDetailProductAsync(idProduct))
        navigate(`${APP_URLS.URL_PRODUCT}/${idProduct}`)
    }

    const handleCancelOrder = async (id) => {
        const response = await dispatch(cancelOrdersAsync(id))
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const handleOpenModalOrder = () => {
        formOrder.setFieldsValue({
            ...order,
            province: +order.province,
            district: +order.district,
            ward: +order.ward
        })
        setIsModalOrderOpen(true)
    }

    const handleCancelModalOrder = () => {
        setIsModalOrderOpen(false)
        formOrder.resetFields()
    }


    const [address, setAddress] = useState('')

    const getAddress = async (value) => {
        const responseProvince = await dispatch(getProvinceAsync())
        const province = responseProvince.payload.filter(province => province.code === +value.province)

        const responseDistrict = await dispatch(getDistrictByProvinceAsync(value.province))
        const district = responseDistrict.payload.districts.filter(district => district.code === +value.district)

        const responseWard = await dispatch(getWardByDistrictAsync(value.district))
        const ward = responseWard.payload.wards.filter(ward => ward.code === +value.ward)

        setAddress(order.address + ', ' + ward[0].name + ', ' + district[0].name + ', ' + province[0].name)

    }

    useEffect(() => {
        getAddress(order)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    return <div className='w-[1000px] bg-white px-10 py-5 rounded-[8px] border border-light-gray mb-8'>
        <p className='text-[25px] text-eclipse uppercase font-semibold tracking-[1px] mb-3'>My Order</p>
        <div className='flex justify-between'>
            <div className='w-[68%]'>
                <div className='order--item flex mb-2'>
                    <p>Receiver name: </p>
                    <p>{order.fullName}</p>
                </div>
                <div className='order--item flex mb-2'>
                    <p>Phone number: </p>
                    <p>{order.phoneNumber}</p>
                </div>
                <div className='order--item flex mb-2'>
                    <p>Alternate phone: </p>
                    <p>{order.alternatePhone}</p>
                </div>
                <div className='order--item flex mb-2'>
                    <p>Notes:</p>
                    <p className='truncate' title='a'>{order.notes !== '' ? order.notes : '...'}</p>
                </div>
                <div className='order--item flex mb-2'>
                    <p>Address:</p>
                    <p className='truncate' title={address}>{address}</p>
                </div>
            </div>
            <div className='w-[30%] overflow-hidden'>
                <div className='order--item-custom flex mb-2 justify-between'>
                    <p>Order Date:</p>
                    <p>{order.orderDate !== null ? ConvertDateHaveHour(order.orderDate) : '...'}</p>
                </div>
                <div className='order--item-custom flex mb-2 justify-between'>
                    <p>Delivery Date:</p>
                    <p>{order.deliveryDate !== null ? ConvertDateHaveHour(order.deliveryDate) : '...'}</p>
                </div>
                <div className='order--item-custom flex mb-2 justify-between'>
                    <p>Receiving Date: </p>
                    <p>{order.receivingDate !== null ? ConvertDateHaveHour(order.receivingDate) : '...'}</p>
                </div>
                <div className='order--item-custom flex mb-2 justify-between'>
                    <p>Payment: </p>
                    <p className="font-bold">{order.paymentMethod}</p>
                </div>
                <div className='order--item-custom flex mb-2 justify-between'>
                    <p>Order status:</p>
                    <p className='text-red-custom font-bold'>{order.statusOrder}</p>
                </div>
            </div>
        </div>

        <table className="table-product-checkout border-collapse my-5 w-full border border-light-gray text-eclipse">
            <tbody>
                {
                    order.orderLines.map((item, index) => <tr className="overflow-hidden" key={index}>
                        <td className="flex overflow-hidden items-center">
                            <img
                                onClick={() => handelNavigatePageDetail(item.productId)}
                                className="object-center object-cover w-[100px] h-[100px] rounded-[8px] mr-3 border border-light-gray cursor-pointer"
                                src={item.mainImageBase64}
                                alt="" />
                            <div className="w-[calc(100%-140px)]">
                                <div className="flex text-[16.5px] text-eclipse">
                                    <p
                                        onClick={() => handelNavigatePageDetail(item.productId)}
                                        className='tracking-[0.75px] max-w-[90%] overflow-hidden truncate cursor-pointer'
                                    >
                                        {Capitelize(item.nameProduct.split(' ')).toString().replaceAll(',', ' ')}
                                    </p>
                                    <span className="text-red-custom mx-2">x</span>
                                    <p className='font-bold text-red-custom' title='Quantity'>{item.quantity}</p>
                                </div>
                                <p className="text-[14px] text-grey mt-1 tracking-[0.5px]">
                                    Brand: {Capitelize(item.brand.split(' ')).toString().replaceAll(',', ' ')} - Size: {item.size}
                                </p>
                            </div>
                        </td>
                        <td className='text-[16px] text-right'>{item.totalPrice.toLocaleString()}<sup>đ</sup></td>
                    </tr>)
                }
                <tr className='text-[16px] font-semibold'>
                    <td className='tracking-[1.25px]'>Fee shipping</td>
                    <td className='text-red-custom text-right'>{order.transportFee !== 0 ? (<>{order.transportFee.toLocaleString()}<sup>đ</sup></>) : 'Free'}</td>
                </tr>
                <tr className='text-[16px] font-semibold'>
                    <td className='tracking-[1.25px]'>Subtoal</td>
                    <td className='text-red-custom text-right'>{order.totalPrice.toLocaleString()}<sup>đ</sup></td>
                </tr>
                <tr className='text-[16px] font-semibold'>
                    <td className='tracking-[1.25px]'>Pay</td>
                    <td className='text-red-custom text-right'>{order.pay}</td>
                </tr>
            </tbody>
        </table>
        <div className='text-right'>
            {
                (order.statusOrder === STATUS_ORDER.PENDING && order.pay !== 'PAID') &&
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure cancel this order?"
                    onConfirm={() => handleCancelOrder(order.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className='button-cancel px-5 py-2 text-[12px] mr-2'>Cancel order</button>
                </Popconfirm>
            }

            {
                (order.statusOrder !== STATUS_ORDER.DELIVERED) &&
                <button className='button-custom px-5 py-2 text-[12px] ml-2' onClick={handleOpenModalOrder}>Update order</button>
            }
        </div>

        <ModalOrder
            isModalOrderOpen={isModalOrderOpen}
            setIsModalOrderOpen={setIsModalOrderOpen}
            handleCancelModalOrder={handleCancelModalOrder}
            order={order}
            formOrder={formOrder}
            openNotification={openNotification}
        />
    </div>
}

export default OrderItem