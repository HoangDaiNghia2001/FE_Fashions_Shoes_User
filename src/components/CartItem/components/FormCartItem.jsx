import { Form, Input, Select } from "antd"
import { useForm } from "antd/es/form/Form"
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
        setListSizes(cart.sizeProduct.slice().sort((a, b) => { return a.name - b.name }))
        formCartUpdate.setFieldsValue({
            ...cart,
            productId: cart.idProduct,
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
                    return {
                        value: item.name,
                        label: item.name
                    }
                })}
                className='cart--item--size'
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
                options={[
                    {
                        value: 1,
                        label: '1',
                    },
                    {
                        value: 2,
                        label: '2',
                    },
                    {
                        value: 3,
                        label: '3',
                    },
                    {
                        value: 4,
                        label: '4',
                    }, {
                        value: 5,
                        label: '5',
                    }, {
                        value: 6,
                        label: '6',
                    }, {
                        value: 7,
                        label: '7',
                    }, {
                        value: 8,
                        label: '8',
                    }, {
                        value: 9,
                        label: '9',
                    }, {
                        value: 10,
                        label: '10',
                    },
                ]}
            />
        </Form.Item>
    </Form>
}

export default FormCartItem