import { Route, Routes, Navigate } from "react-router-dom"
import React from "react"
import { APP_URLS } from "constants/variable";
import Home from "page/User/Home";
import ShopNow from "page/User/ShopNow";
import About from "page/User/About";
import Contact from "page/User/Contact";
import SystemStore from "page/User/SystemStore";
import LoginForm from "page/Login/components/LoginForm";
import Login from "page/Login";
import SignupForm from "page/Login/components/SignupForm";
import EmailForm from "page/Login/components/EmailForm";
import OtpForm from "page/Login/components/OtpForm";
import PrivateRoutes from "./PrivateRoutes";
import CartDetail from "page/User/CartDetail";
import ResetPasswordForm from "page/Login/components/ResetPasswordForm";
import ProductDetail from "page/User/ProductDetail";
import CheckOut from "page/User/CheckOut";
import Error404 from "page/Error404";
import Orders from "page/User/Orders";
import Account from "page/User/Account";
import AnonymousRoutes from "./Anonymous";
import ChangePassword from "page/Login/components/ChangePassword";
import { notification } from "antd";
import Header from "components/header";
import Footer from "components/Footer";
import VNPayResponse from "page/User/VNPayResponse/index.jsx";

const AppRoutes = (props) => {
    // notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (value, type) => {
        api[type]({
            message: 'Notification',
            description: value,
            duration: 3,
        });
    };
    return <>
        <Header />
        <Routes>
            <Route path="/" element={<Navigate to={APP_URLS.URL_HOME}></Navigate>}></Route>
            <Route path={APP_URLS.URL_HOME} element={<Home />}></Route>
            <Route path={APP_URLS.URL_SHOP_NOW} element={<ShopNow />}></Route>
            <Route path={APP_URLS.URL_ABOUT} element={<About />}></Route>
            <Route path={APP_URLS.URL_CONTACT} element={<Contact />}></Route>
            <Route path={APP_URLS.URL_SYSTEM_STORE} element={<SystemStore />}></Route>
            <Route path={`${APP_URLS.URL_PRODUCT}/:id`} element={<ProductDetail openNotification={openNotification} />}></Route>

            <Route element={<AnonymousRoutes />}>
                <Route path={APP_URLS.URL_LOGIN} element={<Login form={<LoginForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_SIGNUP} element={<Login form={<SignupForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_FORGOT_PASSWORD} element={<Login form={<EmailForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_VALIFATE_OTP} element={<Login form={<OtpForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_RESET_PASSWORD} element={<Login form={<ResetPasswordForm openNotification={openNotification} />} />}></Route>
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route path={APP_URLS.URL_CART} element={<CartDetail openNotification={openNotification} />}></Route>
                <Route path={APP_URLS.URL_CHECKOUT} element={<CheckOut openNotification={openNotification} />}></Route>
                <Route path={APP_URLS.URL_ORDERS} element={<Orders openNotification={openNotification} />}></Route>
                <Route path={APP_URLS.URL_ACCOUNT} element={<Account openNotification={openNotification} />}></Route>
                <Route path={`${APP_URLS.URL_VNPAY_RESPONSE}/:orderId`} element={<VNPayResponse openNotification={openNotification} />}></Route>
                <Route path={APP_URLS.URL_CHANGE_PASSWORD} element={<Login form={<ChangePassword openNotification={openNotification} />} />}></Route>
            </Route>

            <Route path="*" element={<Error404 />}></Route>
        </Routes>
        <Footer />
        {contextHolder}
    </>
}

export default AppRoutes