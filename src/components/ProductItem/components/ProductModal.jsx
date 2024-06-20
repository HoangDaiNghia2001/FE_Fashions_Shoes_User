import { Modal, notification } from "antd"
import InputField from "components/FormControl/InputField/InputField"
import RadioButtonField from "components/FormControl/RadioButtonField"
import { APP_URLS } from "constants/variable"
import { Formik, Form } from "formik"
import { createCartItemAsync } from "page/User/CartDetail/CartSlice"
import { filter } from "page/User/ShopNow/ShopNowSlice"
import { useEffect } from "react"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Capitelize } from "utils/Capitalize"
import * as Yup from 'yup'

const ProductModal = (props) => {

    const { isModalOpen, setIsModalOpen, product } = props

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = async (value, type) => {
        await api[type]({
            message: 'Notification',
            description: value,
            duration: 3,
        });
    };

    // create form 
    const formProduct = useRef()

    //size
    const [listSizes, setListSizes] = useState([])
    const [checked, setChecked] = useState()

    const handleCancel = () => {
        setIsModalOpen(false);

        setChecked()

        formProduct.current?.resetForm()
    };

    // form
    const validation = Yup.object({
        size: Yup.string().required('Please choose your size!!!')
    })

    const handleAddToCart = async (values, { resetForm }) => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user === null) {
            navigate(APP_URLS.URL_LOGIN)
        } else {
            const response = await dispatch(createCartItemAsync(values))

            if (response.payload.success) {
                navigate(APP_URLS.URL_CART)
            } else {
                openNotification(response.payload.message, 'error')
            }
            setChecked()

            setIsModalOpen(false)

            resetForm()
        }
    }

    const handleNavigateShopNow = async () => {
        await dispatch(filter({ brandId: product.brandProduct.id }))
        setIsModalOpen(false)
        navigate(APP_URLS.URL_SHOP_NOW)

    }

    useEffect(() => {
        setListSizes(product.sizes.slice().sort((a, b) => { return a.name - b.name }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className='modal-product__detail'
        width={1000}
        height={500}>
        <div className='flex pt-3 pb-1 justify-between items-center'>
            <div className='w-[49%] h-[460px] rounded-[8px] overflow-hidden'>
                <img src={product.mainImageBase64} alt="" className='w-full h-full object-center object-cover' />
            </div>
            <div className='w-[49%]'>
                <p className='font-semibold text-[16px] mb-3 text-eclipse tracking-[0.75px]'>Brand: <span onClick={handleNavigateShopNow} className='text-red-custom uppercase cursor-pointer duration-100 ease-linear hover:text-blue-700'>{product.brandProduct.name}</span></p>
                <p
                    className='whitespace-nowrap truncate text-[28.5px] font-bold text-eclipse tracking-[0.75px]'
                    title={Capitelize(product.name.trim().split(' ')).toString().replaceAll(',', ' ')}
                >
                    {Capitelize(product.name.split(' ')).toString().replaceAll(',', ' ')}
                </p>
                <p className='text-[16.5px] font-bold text-eclipse tracking-[0.75px] mt-[-2px] mb-3'>{Capitelize(product.title.split(' ')).toString().replaceAll(',', ' ')}</p>
                {
                    product.discountedPercent > 0 ? <div className="flex items-center justify-start text-[21.5px] mb-2">
                        <p className="mr-2 text-red-custom font-semibold tracking-wider">{product.discountedPrice.toLocaleString()}<sup>đ</sup></p>
                        <p className="ml-2 text-zinc-500 font-semibold relative tracking-wider">
                            {product.price.toLocaleString()}
                            <sup>đ</sup>
                            <span className="absolute top-[50%] left-[50%] w-[115%] h-[1px] bg-eclipse translate-x-[-50%] translate-y-[-50%]"></span>
                        </p>
                    </div>
                        : <p className="mb-2 text-[21.5px] text-red-custom font-semibold tracking-wider">{product.price.toLocaleString()}<sup>đ</sup></p>
                }
                <p className='text-zinc-500 text-[15.5px] tracking-[1px] leading-normal mb-4'>{product.description}</p>

                <Formik
                    initialValues={{
                        productId: product.id,
                        quantity: 1,
                        size: ''
                    }}
                    innerRef={formProduct}
                    validationSchema={validation}
                    onSubmit={handleAddToCart}>
                    {
                        formikProps => {
                            return <Form>
                                <InputField name='productId' display={true} />
                                <InputField name='quantity' display={true} />
                                <p className='font-bold text-eclipse text-[16px] mb-4 tracking-[0.75px]'>Select size:</p>
                                <RadioButtonField name='size' options={listSizes.map((item) => {
                                    return {
                                        id: item.id,
                                        value: item.name,
                                        label: item.name
                                    }
                                })} checked={checked} setChecked={setChecked} hidden='hidden' />
                                <div className='text-center mt-6'>
                                    <button className='button-custom py-[6px] px-8' type='submit'>Add to cart</button>
                                </div>
                            </Form>
                        }
                    }
                </Formik>
            </div>
        </div>
        {contextHolder}
    </Modal >
}

export default ProductModal