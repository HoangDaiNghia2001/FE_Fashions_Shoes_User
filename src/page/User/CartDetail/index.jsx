import { useEffect } from "react"
import { useState } from "react"
import Bag from "./components/Bag"
import Summary from "./components/Summary"
import { useNavigate } from 'react-router-dom'
import './Style.css'
import { APP_URLS } from "constants/variable"
import { TabTitle } from "utils/TabTitle"
import { useDispatch, useSelector } from "react-redux"
import { cartSelector, deleteCartItemAsync, getCartDetailAsync, saveListCartItemsChoosed, updateCartItemAsync } from "./CartSlice"
import { Modal, Spin } from "antd"
import ProductAlsoLike from "./components/ProductsAlsoLike"
import { ExclamationCircleFilled } from "@ant-design/icons"

const CartDetail = (props) => {
    const { openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const cart = useSelector(cartSelector)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listCartItem, setListCartItem] = useState({
        data: [],
        visible: 5
    })

    const [checkedList, setCheckedList] = useState([]);
    const [listCartItemChoose, setListCartItemChoose] = useState([]);

    const handleCheckout = async () => {
        if (listCartItemChoose.length === 0) {
            openNotification('Please select the product you want to purchase.', 'warning')
        } else {
            let checkout = true;
            listCartItemChoose.forEach((item) => {
                item.sizeProduct.forEach((size) => {
                    if (size.name === item.size && size.quantity < item.quantity) {
                        checkout = false;
                    }
                })
            })
            if (checkout) {
                await dispatch(saveListCartItemsChoosed(listCartItemChoose))
                navigate(APP_URLS.URL_CHECKOUT)
            } else {
                setIsModalOpen(true)
            }
        }
    }

    const handleOk = async () => {
        let response;
        for (const item of listCartItem.data) {
            for (const size of item.sizeProduct) {
                if (size.name === item.size) {
                    if (size.quantity < item.quantity && size.quantity !== 0) {
                        response = await dispatch(updateCartItemAsync({
                            id: item.id,
                            productId: item.idProduct,
                            size: item.size,
                            quantity: size.quantity
                        }));
                        if (!response.payload.success) {
                            openNotification(response.payload.message, 'success');
                            setIsModalOpen(false);
                            break;
                        }
                    } else if (size.quantity === 0) {
                        response = await dispatch(deleteCartItemAsync(item.id));
                        if (!response.payload.success) {
                            openNotification(response.payload.message, 'success');
                            setIsModalOpen(false);
                            break;
                        }
                    }
                }
            }
        }
        setIsModalOpen(false)
        openNotification("Update your cart success.Now you can continue shopping!!!", 'success');
        setListCartItemChoose([])
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };

    const getCartDetail = async () => {
        const response = await (dispatch(getCartDetailAsync()))
        setListCartItem({
            data: response.payload.listCartItems,
            visible: 5
        })
    }

    useEffect(() => {
        TabTitle('Cart')
        window.scrollTo(0, 0)
        getCartDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.cartItem])

    useEffect(() => {
        setListCartItemChoose(listCartItem.data.filter((item) => checkedList.includes(item.id)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedList])

    return <Spin tip="Loading" size="large" spinning={cart.isLoading || cart.isLoadListProducts}>
        <div className="min-h-screen pt-6">
            <div className="flex justify-between px-[180px] mb-12">
                <Bag
                    listCartItem={listCartItem}
                    setListCartItem={setListCartItem}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    openNotification={openNotification}
                />
                <Summary subTotal={listCartItemChoose.length > 0 ? listCartItemChoose.reduce((total, current) => total + current.totalPrice, 0) : 0} handleCheckout={handleCheckout} />
            </div>
            <ProductAlsoLike />
        </div>

        <Modal title={<p><ExclamationCircleFilled style={{ color: "#c91f28", fontSize: "20px" }} /><span className='ml-[6px]'>Notification</span></p>}
            closeIcon={false}
            open={isModalOpen}
            footer={null}
            className="log-out__confirm"
            width={500}
        >
            <div>
                <p className='text-eclipse text-[16px] ml-7 mt-[-6px]'>In your order, some products have incorrect quantities or are out of stock. Please click <span className="font-bold">OK</span> to reload your cart.</p>
                <div className='text-right mt-3'>
                    <button
                        onClick={() => handleCancel()}
                        className='px-[10px] py-1 text-grey border border-light-gray rounded-[4px] mr-1 duration-150 ease-linear font-bold hover:text-red-custom hover:border-red-custom'
                    >Cancel</button>
                    <button
                        onClick={() => handleOk()}
                        className='px-4 py-1 bg-red-custom border border-red-custom rounded-[4px] ml-1 text-white duration-150 ease-linear font-bold hover:opacity-70'
                    >Ok</button>
                </div>
            </div>
        </Modal>
    </Spin>
}

export default CartDetail