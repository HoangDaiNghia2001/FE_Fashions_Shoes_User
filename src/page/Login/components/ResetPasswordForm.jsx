import { Spin } from 'antd'
import Button from 'components/FormControl/Button'
import InputPasswordField from 'components/FormControl/InputField/InputPasswordField'
import { APP_URLS } from 'constants/variable'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TabTitle } from 'utils/TabTitle'
import * as Yup from 'yup'
import { checkEmailForgotPassword, checkValidateOtp, loginSelector, notificationError, notificationSuccess, resetPasswordAsync } from '../LoginSlice'

const ResetPasswordForm = (props) => {

    const navigate = useNavigate()

    const login = useSelector(loginSelector)

    const dispatch = useDispatch()

    const handleResetPassword = async (values, { resetForm }) => {

        if (login.checkValidateOtp && login.checkEmailForgotPassword) {
            const res = await dispatch(resetPasswordAsync(values))

            if (res.payload.success) {

                await dispatch(notificationSuccess({
                    success: true,
                    title: 'Reset password '
                }))

                await dispatch(checkValidateOtp({
                    success: false
                }))

                await dispatch(checkEmailForgotPassword({
                    success: false
                }))

                navigate(APP_URLS.URL_LOGIN)
                resetForm()

            } else {
                props.openNotification(res.payload.message, 'error')
            }
        } else {
            navigate(APP_URLS.URL_VALIFATE_OTP)
            await dispatch(notificationError({
                success: false,
                title: 'Please enter the OTP in your email before reset password !!!'
            }))
        }
    }

    const validation = Yup.object({
        password: Yup.string().required('Please input your new password !!!')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/^.*(?=.*\d)((?=.*[A-Z]){1}).*$/, "Password must contain at least one uppercase, one number !!!"),
        repeatPassword: Yup.string().required('Please input your repeat password !!!')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    useEffect(() => {
        TabTitle('Reset Password')
        window.scrollTo(0, 0)
    }, [])

    return <Spin tip="Loading..." spinning={login.isLoading} size='large'>
        <p className='mb-8 text-center text-[55px] text-eclipse font-semibold tracking-[4px]'>Reset Password</p>

        <Formik
            initialValues={{
                password: '',
                repeatPassword: ''
            }}
            validationSchema={validation}
            onSubmit={handleResetPassword}>
            {
                fromikProps => {
                    return <Form>
                        <InputPasswordField name='password' title='Password' autoFocus={true} />

                        <InputPasswordField name='repeatPassword' title='Repeat Password' />

                        <div className='mt-5'>
                            <Button name='Reset Password' />
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

export default ResetPasswordForm