import { Spin } from 'antd';
import Button from 'components/FormControl/Button';
import InputField from 'components/FormControl/InputField/InputField';
import { APP_URLS } from 'constants/variable';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TabTitle } from 'utils/TabTitle';
import * as Yup from 'yup'
import { checkEmailForgotPassword, loginSelector, notificationError, sendOtpAsync } from '../LoginSlice';
const EmailForm = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const handleSubmit = async (values, { resetForm }) => {

        const res = await dispatch(sendOtpAsync(values))

        if (res.payload.success) {

            await dispatch(checkEmailForgotPassword({
                success: true
            }))

            resetForm()
            navigate(APP_URLS.URL_VALIFATE_OTP)
        } else {
            props.openNotification(res.payload.message, 'error')
        }
    }

    const validation = Yup.object({
        email: Yup.string().required('Please input your email !!!')
            .email('Invalid email format !!!')
    })

    useEffect(() => {
        TabTitle('Forgot password')
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
        <p className='tracking-[1px] text-grey font-[15.5px] mb-3'>
            Lost your password? Please enter your email.
            You will receive a OTP code to create a new password via email.
        </p>
        <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}>
            {
                formikProps => {
                    return <Form>
                        <InputField name='email' type='email' title='Email' autoFocus={true} />
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

export default EmailForm