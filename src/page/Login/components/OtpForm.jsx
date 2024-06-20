import { Spin } from "antd"
import Button from "components/FormControl/Button"
import InputField from "components/FormControl/InputField/InputField"
import { APP_URLS } from "constants/variable"
import { Form, Formik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { TabTitle } from "utils/TabTitle"
import * as Yup from 'yup'
import { checkValidateOtp, loginSelector, notificationError, validateOtpAsync } from "../LoginSlice"

const OtpForm = (props) => {

    const navigate = useNavigate()

    const login = useSelector(loginSelector)

    const dispatch = useDispatch()

    const handleSubmit = async (values, { resetForm }) => {
        if (login.checkEmailForgotPassword) {

            const res = await dispatch(validateOtpAsync(values))

            if (res.payload.success) {

                await dispatch(checkValidateOtp({
                    success: true
                }))

                navigate(APP_URLS.URL_RESET_PASSWORD)
                resetForm()
            } else {
                props.openNotification(res.payload.message, 'error')
            }
        } else {
            navigate(APP_URLS.URL_FORGOT_PASSWORD)

            await dispatch(notificationError({
                success: false,
                title: 'Please enter the email before enter the OTP !!!'
            }))
        }
    }

    const validation = Yup.object({
        otp: Yup.string().required('Please input your OTP, we sent in your email !!!')
    })

    useEffect(() => {
        TabTitle('Validate OTP')
        window.scrollTo(0, 0)
        if (!login.notification?.success && login.notification?.title !== '') {
            props.openNotification(login.notification?.title, 'error')
            dispatch(notificationError({
                success: false,
                title: ''
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login.notification])

    return <Spin tip="Loading..." spinning={login.isLoading} size='large'>
        <p className='text-center text-[55px] text-eclipse font-semibold tracking-[4px]'>Enter OTP</p>
        <p className="text-center text-[14px] text-eclipse mb-4 tracking-[1px]">OTP sent to your email success, Enter your OTP !!!</p>
        <Formik
            initialValues={{
                otp: ''
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}>
            {
                formikProps => {
                    return <Form>
                        <InputField name='otp' type='text' title='One-time Password' autoFocus={true} />
                        <div className='mt-5'>
                            <Button name='Submit' />
                        </div>
                    </Form>
                }
            }
        </Formik>
        <div className='text-center text-eclipse tracking-[0.5px] mt-1'>
            <span>Already have account? <Link to={APP_URLS.URL_LOGIN} className='font-semibold hover:text-red-custom ease-in-out duration-150'>Login</Link></span>
        </div>
    </Spin>
}

export default OtpForm