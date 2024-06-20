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
import { Spin } from "antd"
import ProductAlsoLike from "./components/ProductsAlsoLike"

const CartDetail = (props) => {
    const { openNotification } = props

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const cart = useSelector(cartSelector)

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
            await dispatch(saveListCartItemsChoosed(listCartItemChoose))
            navigate(APP_URLS.URL_CHECKOUT)
        }
    }

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
    </Spin>
}

export default CartDetail