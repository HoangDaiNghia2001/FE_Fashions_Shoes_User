import { Dropdown, Modal, Spin } from 'antd';
import { APP_URLS, MALE } from 'constants/variable';
import { Field, Form, Formik } from 'formik';
import { filter, shopNowSelector } from 'page/User/ShopNow/ShopNowSlice';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { loginSelector, logoutAsync } from 'page/Login/LoginSlice';
import Female from 'assets/Image/Female.jpg'
import Male from 'assets/Image/Male.jpg'
import { cartSelector, countCartItemAsync } from 'page/User/CartDetail/CartSlice';
import { checkOutSelector } from 'page/User/CheckOut/CheckOutSlice';

const HeaderRight = (props) => {

    let user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const shopNow = useSelector(shopNowSelector)

    const cart = useSelector(cartSelector)

    const checkout = useSelector(checkOutSelector)

    const formSearch = useRef()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const response = await dispatch(logoutAsync())
        if (response.payload.success) {
            console.log(response.payload.message)
            localStorage.removeItem("user")
            navigate(APP_URLS.URL_HOME)
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSearch = async (value) => {
        await dispatch(filter(value))
        navigate(APP_URLS.URL_SHOP_NOW)
    }

    const countCartItem = async () => {
        await dispatch(countCartItemAsync())
    }

    const items = [
        {
            key: '3',
            label: (
                <Link to={APP_URLS.URL_CHANGE_PASSWORD}>
                    Change password
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={APP_URLS.URL_ACCOUNT}>
                    My profile
                </Link>
            ),
        },
        {
            key: '1',
            label: (
                <Link to={APP_URLS.URL_ORDERS}>
                    My orders
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <button
                    className='bg-transparent w-full text-left border-none'
                    onClick={showModal}>
                    Log out
                </button>
            ),
        },
    ];

    useEffect(() => {
        if (user !== null) {
            countCartItem()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.cartItem, checkout.placeOrder])

    useEffect(() => {
        if (shopNow.filter.name === undefined) {
            formSearch.current?.resetForm()
        }
    }, [shopNow.filter])

    return <>
        <div className='flex justify-between items-center h-10 header--right'>
            <Formik
                initialValues={{
                    name: shopNow.filter.name !== undefined ? shopNow.filter.name : ''
                }}
                onSubmit={onSearch}
                innerRef={formSearch}
            >
                {
                    formikProps => {
                        return <Form className='h-full'>
                            <div className='search-form h-[40px] w-[190px] flex items-center rounded-[18px] border border-light-gray duration-150 ease-linear overflow-hidden hover:border-red-custom'>
                                <Field name='name' type='text' className='h-[40px] w-[84%] outline-none border-r-[1px] border-r-light-gray px-4 text-eclipse duration-150 ease-linear' placeholder='Search...' />
                                <button type='submit' className='h-[40px] px-2 text-eclipse hover:text-red-custom duration-150 ease-linear'><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </Form>
                    }
                }
            </Formik>

            {
                localStorage.getItem("user") !== null ?
                    <div className='ml-5 flex items-end space-between h-full'>
                        <div className="cart" onClick={() => { navigate(APP_URLS.URL_CART) }}>
                            <span className='cart__amount'>{cart.totalCartItem}</span>
                            <i className='fa-solid fa-cart-shopping mr-2 cursor-pointer text-black hover:text-red-custom ease-in-out duration-200 text-[26px]'></i>
                        </div>
                        <div className="user__infor ml-4 cursor-pointer radius w-11 h-11 ">
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                arrow
                            >
                                <img className='object-cover object-center w-full h-full rounded-full border border-light-gray'
                                    src={user?.imageBase64 !== null
                                        ? (user?.imageBase64)
                                        : (user?.gender === MALE ? Male : Female)}
                                    alt="error" />
                            </Dropdown>
                        </div>
                    </div>
                    :
                    <div className='ml-4 h-full'>
                        <button onClick={() => navigate('/login')} className='login-btn h-full'>Log in</button>
                    </div>
            }
        </div>

        {/* modal confirm log out */}

        <Modal title={<p><ExclamationCircleFilled style={{ color: "#c91f28", fontSize: "20px" }} /><span className='ml-[6px]'>Log out</span></p>}
            closeIcon={false}
            open={isModalOpen}
            footer={null}
            className="log-out__confirm"
            width={300}
        >
            <Spin spinning={login.isLoading} size='small'>
                <p className='text-eclipse text-[16px] ml-7 mt-[-6px]'>Log out of your account?</p>
                <div className='text-right mt-3'>
                    <button
                        onClick={handleCancel}
                        className='px-[10px] py-1 text-grey border border-light-gray rounded-[4px] mr-1 duration-150 ease-linear font-bold hover:text-red-custom hover:border-red-custom'
                    >Cancel</button>
                    <button
                        onClick={() => handleOk()}
                        className='px-4 py-1 bg-red-custom border border-red-custom rounded-[4px] ml-1 text-white duration-150 ease-linear font-bold hover:opacity-70'
                    >Ok</button>
                </div>
            </Spin>
        </Modal>
    </>
}

export default HeaderRight