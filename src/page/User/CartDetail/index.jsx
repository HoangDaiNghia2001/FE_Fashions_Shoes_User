import { useEffect } from "react"
import { useState } from "react"
import Bag from "./components/Bag"
import Summary from "./components/Summary"
import { useNavigate } from 'react-router-dom'
import './Style.css'
import { APP_URLS } from "constants/variable"
import { TabTitle } from "utils/TabTitle"
import { useDispatch, useSelector } from "react-redux"
import { cartSelector, getCartDetailAsync, saveListCartItemsChoosed } from "./CartSlice"
import { Modal, Spin } from "antd"
import ProductAlsoLike from "./components/ProductsAlsoLike"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { getDetailProductAsync, productSelector } from "../ProductDetail/ProductSlice"

const CartDetail = (props) => {
    const { openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const cart = useSelector(cartSelector)

    const product = useSelector(productSelector)

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
            for (const item of listCartItemChoose) {
                const product = await dispatch(getDetailProductAsync(item.product.id))
                if (product.payload.success) {
                    // Check the price again if there is any change
                    if (product.payload.results.discountedPrice !== item.product.discountedPrice) {
                        checkout = false
                        break
                    }
                    // Check if the product is in stock or not
                    const size = product.payload.results.sizes.find(s => s.name === item.size)
                    if (size) {
                        if (size.quantity < item.quantity || size.quantity === 0) {
                            checkout = false
                            break
                        }
                    } else {
                        checkout = false
                        break
                    }
                } else {
                    checkout = false
                    break
                }
            }

            if (checkout) {
                await dispatch(saveListCartItemsChoosed(listCartItemChoose))
                navigate(APP_URLS.URL_CHECKOUT)
            } else {
                setIsModalOpen(true)
            }
        }
    }

    const handleReload = async () => {
        const response = await dispatch(getCartDetailAsync())
        if (response.payload.success) {
            setListCartItem({
                data: response.payload.results.listCartItems,
                visible: 5
            })
            openNotification("Update your cart success. Now you can continue shopping !!!", 'success');
        } else {
            openNotification("Update your cart failed. Please reload your website !!!", 'error');
        }
        setIsModalOpen(false)
        setCheckedList([])
    }

    const getCartDetail = async () => {
        const response = await (dispatch(getCartDetailAsync()))
        if (response.payload.success) {
            setListCartItem({
                data: response.payload.results.listCartItems,
                visible: 5
            })
        }
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

    return <Spin tip="Loading" size="large" spinning={cart.isLoading || cart.isLoadListProducts || product.isLoading}>
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
                <p className='text-eclipse text-[16px] ml-7 mt-[-6px]'>In your order, some products have incorrect quantities or are out of stock. Please click <span className="font-bold">Reload</span> to reload your cart.</p>
                <div className='text-right mt-3'>
                    <button
                        onClick={() => handleReload()}
                        className='px-4 py-1 bg-red-custom border border-red-custom rounded-[4px] ml-1 text-white duration-150 ease-linear font-bold hover:opacity-70'
                    >Reload</button>
                </div>
            </div>
        </Modal>
    </Spin>
}

export default CartDetail