import { Form, Input, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { QUANTITY_OPTIONS } from "constants/variable"
import { updateCartItemAsync } from "page/User/CartDetail/CartSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const FormCartItem = (props) => {

    const { openNotification, cart } = props

    const dispatch = useDispatch()

    const [formCartUpdate] = useForm()

    const [listSizes, setListSizes] = useState([])

    const handleUpdateCartItem = async () => {
        const response = await dispatch(updateCartItemAsync(formCartUpdate.getFieldsValue()))
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    useEffect(() => {
        setListSizes(cart.product.sizes.slice().sort((a, b) => { return a.name - b.name }))
        formCartUpdate.setFieldsValue({
            ...cart,
            productId: cart.product.id,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    return <Form
        form={formCartUpdate}
        layout='inline'
    >
        <Form.Item
            name="id"
            style={{
                display: 'none'
            }}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="productId"
            style={{
                display: 'none'
            }}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="size"
            label={<p className='text-grey text-[16.5px] tracking-[0.75px]'>Size</p>}
        >
            <Select
                style={{
                    width: 60,
                }}
                onChange={handleUpdateCartItem}
                options={listSizes.map((item) => {
                    let size = {};
                    if (item.quantity === 0) {
                        size.disabled = true
                    }
                    size = {
                        ...size,
                        value: item.name,
                        label: item.name
                    }
                    return size;
                })}
                className='cart--item--size'
                disabled={cart.outOffStock}
            />
        </Form.Item>

        <Form.Item
            name="quantity"
            label={<p className='text-grey text-[16.5px] tracking-[0.75px]'>Quantity</p>}
        >
            <Select
                style={{
                    width: 60,
                }}
                onChange={handleUpdateCartItem}
                options={QUANTITY_OPTIONS.map(quantity => {
                    const sizeSelected = cart.product.sizes.find(size => size.name === cart.size)
                    const newQuantity = { ...quantity }
                    if (sizeSelected && sizeSelected.quantity < quantity.value) {
                        newQuantity.disabled = true;
                    }
                    return newQuantity
                })}
                disabled={cart.outOffStock}
            />
        </Form.Item>
    </Form>
}

export default FormCartItem