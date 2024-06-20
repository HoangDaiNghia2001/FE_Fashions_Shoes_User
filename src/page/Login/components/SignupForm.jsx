import * as Yup from 'yup'
import Button from 'components/FormControl/Button';
import InputField from 'components/FormControl/InputField/InputField';
import InputPasswordField from 'components/FormControl/InputField/InputPasswordField';
import SelectField from 'components/FormControl/SelectField';
import { APP_URLS, LIST_GENDER } from 'constants/variable';
import { Form, Formik, useFormikContext } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync, loginSelector, notificationSuccess, registerAsync } from '../LoginSlice';
import { useEffect } from 'react';
import { Spin } from 'antd'
import { useState } from 'react';
import { TabTitle } from 'utils/TabTitle';

const SignupForm = (props) => {

    const navigate = useNavigate()

    const login = useSelector(loginSelector)

    const dispatch = useDispatch()

    const [provices, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [provinceCode, setProvinceCode] = useState('')

    const [districtCode, setDistrictCode] = useState('')

    const handleSignUp = async (values, { resetForm }) => {
        const userRequest = { ...values, ...{ avatarBase64: null } }
        const response = await dispatch(registerAsync(userRequest))
        if (response.payload.success) {
            console.log(response)
            resetForm()
            await dispatch(notificationSuccess({
                success: true,
                title: 'Register'
            }))
            navigate(APP_URLS.URL_LOGIN)
        } else {
            props.openNotification(response.payload.message, 'error')
        }
    }

    const validation = Yup.object({
        firstName: Yup.string().required('Please input your first name !!!'),
        lastName: Yup.string().required('Please input your last name !!!'),
        email: Yup.string().required('Please input your email !!!')
            .email('Invalid email format !!!'),
        mobile: Yup.string().required('Please input your mobile !!!'),
        gender: Yup.string().required('Please choose your gender !!!'),
        password: Yup.string().required('Please input your password !!!')
            .min(8, 'Password is too short - should be 8 chars minimum !!!')
            .matches(/^.*(?=.*\d)((?=.*[A-Z]){1}).*$/, "Password must contain at least one uppercase, one number !!!"),
        repeatPassword: Yup.string().required('Please input your repeat password !!!')
            .oneOf([Yup.ref('password'), null], 'Passwords must match !!!')
    })

    const handleChangeProvince = (e, setFieldValue) => {
        setFieldValue("province", e.target.value)
        setFieldValue("district", "")
        setFieldValue("ward", "")
        setDistricts([])
        setWards([])
    }

    const handleChangeDistrict = (e, setFieldValue) => {
        setFieldValue("district", e.target.value)
        setFieldValue("ward", "")
        setWards([])
    }

    // call api get province
    const getProvince = async () => {
        const response = await dispatch(getProvinceAsync())
        setProvinces(response.payload.map((item) => {
            return {
                value: item.code,
                label: item.name
            }
        }))
    }

    useEffect(() => {
        TabTitle('Sign Up')
        window.scrollTo(0, 0)
        getProvince()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // call api get district by province
    const getDistrictByProvince = async (value) => {
        if (value) {
            const response = await dispatch(getDistrictByProvinceAsync(value))
            setDistricts(response.payload.districts?.map((item) => {
                return {
                    value: item.code,
                    label: item.name
                }
            }))
        }
    }

    useEffect(() => {
        getDistrictByProvince(provinceCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceCode])


    // call api get ward by district
    const getWardByDistrict = async (value) => {
        if (value) {
            const response = await dispatch(getWardByDistrictAsync(value))
            setWards(response.payload.wards?.map((item) => {
                return {
                    value: item.code,
                    label: item.name
                }
            }))
        }
    }
    useEffect(() => {
        getWardByDistrict(districtCode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtCode])

    const GetValues = () => {
        const { values } = useFormikContext()

        useEffect(() => {
            setProvinceCode(values.province)
        }, [values.province])

        useEffect(() => {
            setDistrictCode(values.district)
        }, [values.district])

        return null;
    };

    return <Spin tip="Loading..." spinning={login.isLoading} size='large'>
        <p className='mb-8 text-center text-[55px] text-eclipse font-semibold tracking-[4px]'>Sign Up</p>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                gender: '',
                address: '',
                province: '',
                district: '',
                ward: '',
                password: '',
                repeatPassword: ''
            }}
            validationSchema={validation}
            onSubmit={handleSignUp}
        >{
                (formikProps) => {

                    return <Form>
                        <InputField name='firstName' title='First Name' type='text' autoFocus={true} />

                        <InputField name='lastName' title='Last Name' type='text' />

                        <InputField name='email' title='Email' type='email' />

                        <div className='flex justify-between'>
                            <div className='w-[49%]'>
                                <InputField name='mobile' title='Mobile' type='text' />
                            </div>

                            <div className='w-[49%]'>
                                <SelectField name='gender' title='Gender' options={LIST_GENDER} placeholder='Select your gender' />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[49%]'>
                                <InputField name='address' title='Street address' type='text' />
                            </div>
                            <div className='w-[49%]'>
                                <SelectField
                                    onChange={(e) => handleChangeProvince(e, formikProps.setFieldValue)}
                                    name='province'
                                    title='Province'
                                    options={provices}
                                    placeholder='Select your province' />
                            </div>
                        </div>

                        <div className='flex justify-between'>

                            <div className='w-[49%]'>
                                <SelectField onChange={(e) => handleChangeDistrict(e, formikProps.setFieldValue)}
                                    name='district'
                                    title='District'
                                    options={districts}
                                    placeholder='Select your district' />
                            </div>
                            <div className='w-[49%]'>
                                <SelectField
                                    name='ward'
                                    title='Ward'
                                    options={wards}
                                    placeholder='Select your ward' />
                            </div>
                        </div>

                        <InputPasswordField name='password' title='Password' />

                        <InputPasswordField name='repeatPassword' title='Repeat password' />

                        <div className='mt-8'>
                            <Button name='Sign up' />
                        </div>

                        <div className='text-center text-eclipse tracking-[0.5px] text-[14px] mt-2'>
                            <span>Already have account? <Link to='/login' className='font-semibold hover:text-red-custom ease-in-out duration-150'>Login</Link></span>
                        </div>

                        <GetValues />
                    </Form>
                }
            }
        </Formik>
    </Spin>
}

export default SignupForm