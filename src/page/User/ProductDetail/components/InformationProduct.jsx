import { Link, useNavigate } from "react-router-dom"
import { Form, Radio, Input, Collapse } from 'antd';
import { useForm } from "antd/es/form/Form";
import { Capitelize } from "utils/Capitalize";
import { APP_URLS } from "constants/variable";
import { useDispatch } from "react-redux";
import { filter } from "page/User/ShopNow/ShopNowSlice";
import { createCartItemAsync } from "page/User/CartDetail/CartSlice";
import { useEffect } from "react";
import { useState } from "react";
const InformationProduct = (props) => {
    const { product, openNotification } = props

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [listSizes, setListSizes] = useState([])

    const handleNavigateShopNow = async () => {
        await dispatch(filter({ brandId: product.brandProduct.id }))
    }

    // form
    const [formProductDetail] = useForm();

    const handleAddToCart = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user === null) {
            navigate(APP_URLS.URL_LOGIN)
        } else {
            const response = await dispatch(createCartItemAsync(values))
            if (response.payload.success) {
                formProductDetail.resetFields()
                navigate(APP_URLS.URL_CART)
            } else {
                openNotification(response.payload.message, 'error')
            }
        }
    };

    //collapse
    const getItems = () => [
        {
            key: '1',
            label: 'Free Delivery and Returns',
            children: <div className="text-[17.5px] text-grey tracking-[0.5px]">
                <p className="mb-3">Your order of 5.000.000<sup>đ</sup> or more gets free standard delivery.</p>
                <ul className="list-disc ml-5 mb-3">
                    <li>Standard delivered 4-5 Business Days</li>
                    <li>Express delivered 2-4 Business Days</li>
                </ul>
                <p>Orders are processed and delivered Monday-Staturday (excluding public holidays)</p>
            </div>,
        },
        {
            key: '2',
            label: `Reviews (${props.amountComment > 0 ? props.amountComment : 0})`,
            children: <div className="text-[17.5px] text-grey tracking-[0.5px]">
                <p className="mb-3">Limited to (1) pair per consumer.</p>
                <p>The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by FashionShoes.
                    The product you purchase may appear differently in this respect than the one depicted on FashionShoes.com or FashionShoesApp.</p>
            </div>,
        },
        {
            key: '3',
            label: 'More Info',
            children: <div className="text-[17.5px] text-grey tracking-[0.5px]">
                <p className="mb-3">Limited to (1) pair per consumer.</p>
                <p>The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by FashionShoes.
                    The product you purchase may appear differently in this respect than the one depicted on FashionShoes.com or FashionShoesApp.</p>
            </div>,
        },
    ];

    useEffect(() => {
        setListSizes(product.sizes.slice().sort(function (a, b) { return a.name - b.name; }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="w-[44%]">
        <p className="text-[18.5px] text-eclipse tracking-[0.75px] font-semibold mb-2">Brand: <Link to={APP_URLS.URL_SHOP_NOW} onClick={handleNavigateShopNow} className='text-red-custom uppercase hover:text-[#69b1ff] duration-300 ease-in-out'>{product.brandProduct?.name}</Link></p>
        <p className="text-[33.5px] font-semibold tracking-[2px] text-eclipse mb-2">{Capitelize(product.name.split(' ')).toString().replaceAll(',', ' ')}</p>
        {
            product.discountedPercent > 0 ? <div className="flex items-center justify-start text-[22.5px] mb-2">
                <p className="mr-2 text-red-custom font-semibold tracking-wider">{product.discountedPrice.toLocaleString()}<sup>đ</sup></p>
                <p className="ml-2 text-zinc-500 font-semibold relative tracking-wider">
                    {product.price.toLocaleString()}
                    <sup>đ</sup>
                    <span className="absolute top-[50%] left-[50%] w-[115%] h-[1px] bg-eclipse translate-x-[-50%] translate-y-[-50%]"></span>
                </p>
            </div>
                : <p className="mb-2 text-[22.5px] text-red-custom font-semibold tracking-wider">{product.price.toLocaleString()}<sup>đ</sup></p>
        }
        <div className="product-information">
            <p>Desciption: <span>{product.description}</span></p>
            <p>Category:
                <span> {Capitelize(product.parentCategoryOfProduct?.name.split(' ')).toString().replaceAll(',', ' ')} </span>
                <span>{Capitelize(product.childCategoryOfProduct?.name.split(' ')).toString().replaceAll(',', ' ')}</span>
            </p>
            <p>Colour: <span>{Capitelize(product.color.split(' ')).toString().replaceAll(',', ' ')}</span></p>
        </div>
        <Form
            name='formProductDetail'
            form={formProductDetail}
            onFinish={handleAddToCart}
            initialValues={{
                productId: product.id,
                quantity: 1
            }}
        >
            <Form.Item
                name="productId"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="quantity"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>

            <div className='mb-5'>
                <p className='font-bold text-eclipse text-[18.5px] mb-3 tracking-[0.5px]'>Select size:</p>
                <Form.Item
                    name="size"
                    className='form--size__item product-detail--size'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your size!',
                        },
                    ]}
                    style={{
                        marginBottom: 35
                    }}
                >
                    <Radio.Group>
                        {
                            listSizes.map((item, index) => item.quantity > 0 && <Radio.Button key={index} value={item.name}>{item.name}</Radio.Button>)
                        }
                    </Radio.Group>
                </Form.Item>
            </div>

            <div className='text-center mb-10'>
                <Form.Item>
                    <button className='button-custom text-[16.5px] py-2 px-12' type='submit'>Add to cart</button>
                </Form.Item>
            </div>
        </Form>

        <Collapse
            bordered={false}
            items={getItems()}
            className='collapse-information-product'
        />
    </div>
}

export default InformationProduct