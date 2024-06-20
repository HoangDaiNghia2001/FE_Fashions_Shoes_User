import { Popconfirm } from 'antd';
import { APP_URLS } from 'constants/variable';
import { deleteCartItemAsync } from 'page/User/CartDetail/CartSlice';
import { getDetailProductAsync } from 'page/User/ProductDetail/ProductSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Capitelize } from 'utils/Capitalize';
import FormCartItem from './components/FormCartItem';
import './Style.css'
const CartItem = (props) => {

    const { cart, checkDeleteMulti, setCheckedList, openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleDeleteCartItem = async () => {
        const response = await dispatch(deleteCartItemAsync(cart.id))

        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
            setCheckedList([])
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const handleNavigatePageDetail = async () => {

        await dispatch(getDetailProductAsync(cart.idProduct))

        navigate(`${APP_URLS.URL_PRODUCT}/${cart.idProduct}`)
    }

    return <div className="cart--item w-full flex justify-between py-5 border-b border-light-gray ml-4 overflow-hidden">
        <div onClick={handleNavigatePageDetail} className='w-[140px] h-[140px] overflow-hidden rounded-[8px] cursor-pointer border border-gray98'>
            <img className='object-center object-cover w-full h-full' src={cart.mainImageBase64} alt="" />
        </div>
        <div className='w-[calc(100%-170px)]'>
            <div className='flex justify-between items-center mb-[4px] text-[16.5px] tracking-[2px] text-eclipse font-semibold'>
                <p
                    onClick={handleNavigatePageDetail}
                    className='cursor-pointer w-[74%] truncate'
                    title={Capitelize(cart.nameProduct.split(' ')).toString().replaceAll(',', ' ')}>
                    {Capitelize(cart.nameProduct.split(' ')).toString().replaceAll(',', ' ')}
                </p>
                <p>{cart.totalPrice.toLocaleString()}<sup>đ</sup></p>
            </div>

            <div className='text-[14.5px] text-grey font-medium tracking-[0.75px]'>
                <p className='truncate'>{Capitelize(cart.titleProduct.split(' ')).toString().replaceAll(',', ' ')}</p>
                <p>{Capitelize(cart.color.split(' ')).toString().replaceAll(',', ' ')}</p>
            </div>

            <div className='flex justify-between items-center mt-2'>

                <FormCartItem
                    cart={cart}
                    openNotification={openNotification}
                />

                <div className='flex items-center'>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this product?"
                        onConfirm={handleDeleteCartItem}
                        okText="Yes"
                        cancelText="No"
                        disabled={checkDeleteMulti}
                    >
                        <i className={`${!checkDeleteMulti ? 'cursor-pointer text-zinc-600 hover:text-red-custom' : 'cursor-no-drop text-zinc-400'} fa-solid fa-trash-can text-[22px]  duration-300 ease-in-out`}></i>
                    </Popconfirm>
                </div>
            </div>
        </div>
    </div>
}

export default CartItem