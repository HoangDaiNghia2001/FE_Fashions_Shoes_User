import { Spin } from "antd"
import Button from "components/FormControl/Button"
import InputPasswordField from "components/FormControl/InputField/InputPasswordField"
import { APP_URLS } from "constants/variable"
import { Form, Formik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TabTitle } from "utils/TabTitle"
import * as Yup from 'yup'
import { changePasswordAsync, loginSelector, logoutAsync, notificationSuccess } from "../LoginSlice"

const ChangePassword = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const handelSubmit = async (values, { resetForm }) => {
        const res = await (dispatch(changePasswordAsync(values)))
        if (res.payload.success) {
            resetForm()

            const response = await dispatch(logoutAsync())

            if (response.payload.success) {
                localStorage.removeItem("user")
                await dispatch(notificationSuccess({
                    success: true,
                    title: 'Change password'
                }))
                navigate(APP_URLS.URL_LOGIN)
            } else {
                props.openNotification(res.payload.message, 'error')
            }
        } else {
            props.openNotification(res.payload.message, 'error')
        }
    }

    const validation = Yup.object({
        oldPassword: Yup.string().required('Please input your old password !!!'),
        newPassword: Yup.string().required('Please input your password !!!')
            .min(8, 'Password is too short - should be 8 chars minimum !!!')
            .matches(/^.*(?=.*\d)((?=.*[A-Z]){1}).*$/, "Password must contain at least one uppercase, one number !!!")
            .notOneOf([Yup.ref('oldPassword'), null], 'New password must be difference the old password !!!'),
        repeatNewPassword: Yup.string().required('Please input your repeat password !!!')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match !!!')

    })

    useEffect(() => {
        TabTitle('Change password')
        window.scrollTo(0, 0)
    }, [])

    return <Spin tip="Loading..." spinning={login.isLoading} size='large'>
        <p className='mb-8 text-center text-[55px] text-eclipse font-semibold tracking-[4px]'>Reset password</p>
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            }}
            onSubmit={handelSubmit}
            validationSchema={validation}>
            {
                fromikProps => {
                    return <Form>
                        <InputPasswordField title='Old password' name='oldPassword' autoFocus={true} />
                        <InputPasswordField title='New password' name='newPassword' />
                        <InputPasswordField title='Repeat password' name='repeatNewPassword' />
                        <div className="mt-6">
                            <Button name='Submit' />
                        </div>
                    </Form>
                }
            }
        </Formik>
    </Spin>
}

export default ChangePassword