import { APP_URLS, ORDER_FREESHIP } from "constants/variable"
import { getDetailProductAsync } from "page/User/ProductDetail/ProductSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Capitelize } from "utils/Capitalize"
import { CheckFeeShipping } from "utils/CheckFeeShipping"
import { TotalPrice } from "utils/TotalPrice"

const TableProductCheckOut = (props) => {
    const { listCartItemsCheckout, subTotal } = props

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handelNavigatePageDetail = async (idProduct) => {
        await dispatch(getDetailProductAsync(idProduct))
        navigate(`${APP_URLS.URL_PRODUCT}/${idProduct}`)
    }

    return <table className="table-product-checkout border-collapse my-[25px] w-full border border-light-gray text-eclipse">
        <thead>
            <tr className="border text-left border-light-gray tetx-eclipse text-[18px] tracking-[1.25px]">
                <th>Product</th>
                <th className='text-right'>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            {
                listCartItemsCheckout.map((item, index) => <tr className="overflow-hidden" key={index}>
                    <td className="flex overflow-hidden items-center">
                        <img
                            onClick={() => handelNavigatePageDetail(item.idProduct)}
                            className="object-center object-cover w-[100px] h-[100px] rounded-[8px] mr-3 border border-light-gray cursor-pointer"
                            src={item.mainImageBase64}
                            alt="" />
                        <div className="w-[calc(100%-140px)]">
                            <div className="flex text-[16.5px] text-eclipse">
                                <p
                                    onClick={() => handelNavigatePageDetail(item.idProduct)}
                                    className='tracking-[0.75px] max-w-[90%] overflow-hidden truncate cursor-pointer'
                                >
                                    {Capitelize(item.nameProduct.split(' ')).toString().replaceAll(',', ' ')}
                                </p>
                                <span className="text-red-custom mx-2">x</span>
                                <p className='font-bold text-red-custom' title='Quantity'>{item.quantity}</p>
                            </div>
                            <p className="text-[14px] text-grey mt-1 tracking-[0.5px]">Size: {item.size}</p>
                        </div>
                    </td>
                    <td className='text-[16.5px] text-right'>{item.totalPrice.toLocaleString()}<sup>đ</sup></td>
                </tr>)
            }
            <tr className='text-[18px] font-semibold'>
                <td className='tracking-[1.25px]'>Subtoal</td>
                <td className='text-red-custom text-right'>{subTotal.toLocaleString()}<sup>đ</sup></td>
            </tr>
            <tr className='text-[18px] font-semibold'>
                <td className='tracking-[1.25px]'>Fee shipping</td>
                <td className='text-red-custom text-right'>{CheckFeeShipping(subTotal).toLocaleString()}<sup>{subTotal <= ORDER_FREESHIP && 'đ'}</sup></td>
            </tr>
            <tr className='text-[18px] font-semibold'>
                <td className='tracking-[1.25px]'>Total</td>
                <td className='text-red-custom text-right'>{TotalPrice(subTotal).toLocaleString()}<sup>đ</sup></td>
            </tr>
        </tbody>
    </table>
}

export default TableProductCheckOut